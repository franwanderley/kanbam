"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/Card";
import { FormTask } from "@/components/FormTask";
import { ViewCard } from "@/components/ViewCard";
import { FormColumn } from "@/components/FormColumn";
import { Task } from "@/interface/Task";
import { Board } from "@/interface/Board";
import { SubTask } from "@/interface/SubTask";
import { Column } from "@/interface/Column";
import { useRouter } from "next/navigation";
import {
  DragDropContext,
  Droppable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { getBoardByTitle, patchBoard, saveBoard } from "@/service/api";

export default function BoardPage({ params }: { params: { board: string } }) {
  const router = useRouter();
  const [witchModalIsOpen, setWitchModalIsOpen] = useState<"FormTask" | "ViewCard" | "FormColumn">();
  const [cardDetail, setCardDetail] = useState<Task>();
  const [board, setBoard] = useState<Board>();

  useEffect(() => {
    const getBoard = async () => {
      const data = await getBoardByTitle(params.board);
      if (!data || data?.length === 0) {
        router.push("/not-found");
      }
      const sortedColumns = data?.[0]?.columns?.sort((a, b) => a.order - b.order);
      setBoard({ ...data?.[0], columns: sortedColumns });
    };

    getBoard();
  }, [params, router]);

  const saveTask = async (data?: Task) => {
    if (data && board) {
      const body = {
        ...board,
        tasks: board?.tasks ? [...board.tasks, data] : [data],
      };
      await saveBoard(body);
      router.refresh();
    }
  };

  const saveColumn = async (data?: Column) => {
    if (!data || !board) return;

    const newWithOldsColumns = board?.columns?.length
        ? [data, ...board?.columns]
        : [data];
      const body = {
        ...board,
        columns: reOrderColumn(newWithOldsColumns),
      };
      await saveBoard(body);
      router.refresh();
  };

  const deleteTask = async (taskId: string | undefined) => {
    if (!board && taskId) return;

    const tasks = board?.tasks?.filter((task) => task.id !== taskId);
    const body = {
      ...board,
      tasks,
    };
    await saveBoard(body);
    handleFormClose();
    router.refresh();
  };

  const reOrderColumn = (columns: Column[]): Column[] => {
    if (!columns || columns.length === 0) {
      return [];
    }
    const sortedColumns = columns.sort((a, b) => a.order - b.order);

    return sortedColumns.reduce((acc: Column[], currentColumn) => {
      if (acc.length === 0) {
        return [currentColumn];
      }
      const lastColumn = acc.at(-1);
      if (lastColumn && currentColumn.order <= lastColumn.order) {
        acc.push({ ...currentColumn, order: lastColumn.order + 1 });
      } else {
        acc.push(currentColumn);
      }
      return acc;
    }, []);
  };

  const handleFormClose = () => {
    setWitchModalIsOpen(undefined);
    setCardDetail(undefined);
  };

  const handleViewCardClose = async (
    subtasks?: SubTask[],
    columnId?: string
  ) => {
    if (subtasks && columnId) {
      const tasks = board?.tasks?.map((task) =>
        task.title === cardDetail?.title
          ? { ...task, subtasks, columnId }
          : task
      );
      const body = {
        ...board,
        tasks,
      };
      await saveBoard(body);
      router.refresh();
    }
    handleFormClose();
  };

  const handleCardDetail = (card: Task) => {
    setCardDetail(card);
    setWitchModalIsOpen("ViewCard");
  };

  const handleNewTask = () => setWitchModalIsOpen("FormTask");

  const handleNewColumn = () => setWitchModalIsOpen("FormColumn");

  const onDropCard = async ({ destination, draggableId }: DropResult, _: ResponderProvided) => {
    if (!destination || !draggableId) return;

    const tasks = board?.tasks?.map((task) =>
      task.id === draggableId
        ? { ...task, columnId: destination.droppableId }
        : task
    );
    setBoard(old => old?.id && tasks ? ({...old, tasks}): undefined);
    await patchBoard(tasks, board?.id);
    router.refresh();
  };

  return (
    <div className="flex md:min-h-screen w-full flex-row bg-bg-primary">
      {witchModalIsOpen === "FormTask" && (
        <FormTask
          columns={board?.columns}
          saveTask={saveTask}
          onClose={handleFormClose}
        />
      )}
      {witchModalIsOpen === "ViewCard" && (
        <ViewCard
          columns={board?.columns}
          task={cardDetail}
          onClose={handleViewCardClose}
          onDelete={deleteTask}
        />
      )}
      {witchModalIsOpen === "FormColumn" && (
        <FormColumn
          columns={board?.columns}
          saveColumn={saveColumn}
          onClose={handleFormClose}
        />
      )}

      <main className="w-full flex flex-col">
        <header className="flex flex-row justify-between p-4 w-full bg-bg-secondary">
          <h2 className="text-2xl">{board?.title}</h2>
          <button
            onClick={handleNewTask}           
            className="cursor-pointer text-xs bg-button p-2 rounded-2xl"
          >
            + Add New Task
          </button>
        </header>
        <div className="p-4 flex flex-row">
          <DragDropContext onDragEnd={onDropCard}>
            {board?.columns?.map((column) => (
              <Droppable key={column?.id} droppableId={column?.id} type="COLUMN">
                {(provided) => (
                  <div
                    key={column?.id}
                    className="flex flex-col justify-start mr-6"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="flex flex-row">
                      <div
                        style={{ backgroundColor: column?.color }}
                        className={`mb-4 p-2 rounded-full mr-2`}
                      />
                      <span className="text-gray-400 text-xs">
                        {column?.title} ({board.tasks?.filter(task => task.columnId === column?.id).length || 0})
                      </span>
                    </div>
                    {board.tasks?.filter(task => task.columnId === column?.id)?.map((task) => (
                      <Card
                        key={task?.id}
                        task={task}
                        onOpen={() => handleCardDetail(task)}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
          <div
            onClick={handleNewColumn}
            className="flex flex-col justify-center items-center mr-6 p-4 bg-bg-secondary rounded-md cursor-pointer"
          >
            <span className="text-center">+ New Column</span>
          </div>
        </div>
      </main>
    </div>
  );
}
