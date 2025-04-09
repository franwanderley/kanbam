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
  const [whatFormIs, setWhatFormIs] = useState<
    "FormTask" | "ViewCard" | "FormColumn"
  >();
  const [cardDetail, setCardDetail] = useState<Task>();
  const [board, setBoard] = useState<Board>();

  useEffect(() => {
    const getBoard = async () => {
      try {
        const data = await getBoardByTitle(params.board);
        const columns = data?.[0]?.columns
          ?.sort((a, b) => a.order - b.order)
          ?.map((col) => ({
            ...col,
            tasks: data?.[0].tasks?.filter((task) => task.columnId === col?.id),
          }));
        setBoard({ ...data?.[0], columns });
      } catch (e) {
        router.push("/error");
      }
    };

    getBoard();
  }, [params, router]);

  const saveTask = async (data?: Task) => {
    if (data && board) {
      const body = {
        ...board,
        columns: board?.columns?.map((col) => ({ ...col, tasks: undefined })),
        tasks: board?.tasks ? [...board.tasks, data] : [data],
      };
      await saveBoard(body);
      router.refresh();
    }
  };

  const saveColumn = async (data?: Column) => {
    if (!data || !board) return;

    const columns = board?.columns?.length
        ? [...board?.columns, data].sort((a, b) => a.order - b.order)
        : [data];
      const body = {
        ...board,
        columns: reOrderColumn(
          columns?.map((col) => ({ ...col, tasks: undefined }))
        ),
      };
      await saveBoard(body);
      router.refresh();
  };

  const reOrderColumn = (columns: Column[]) => {
    const orderColumns: Column[] = [];
    const recursColumn = (order: number) => {
      const columnSameOrder = columns?.filter((col) => col?.order === order);
      if (!columnSameOrder?.length) return;
      if (columnSameOrder.length > 1) {
        orderColumns.push(columnSameOrder?.[columnSameOrder?.length - 1]);
        orderColumns.push({ ...columnSameOrder?.[0], order: order + 1 });
      } else {
        orderColumns.push(columnSameOrder?.[columnSameOrder?.length - 1]);
      }
      recursColumn(order + 1);
    };
    recursColumn(columns?.[0]?.order);
    return orderColumns;
  };

  const handleFormClose = () => {
    setWhatFormIs(undefined);
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
        columns: board?.columns?.map((col) => ({ ...col, tasks: undefined })),
        tasks,
      };
      await saveBoard(body);
      router.refresh();
    }
    handleFormClose();
  };

  const handleCardDetail = (card: Task) => {
    setCardDetail(card);
    setWhatFormIs("ViewCard");
  };

  const handleNewTask = () => {
    setWhatFormIs("FormTask");
  };

  const handleNewColumn = () => {
    setWhatFormIs("FormColumn");
  };

  const onDropCard = async ({ destination, draggableId }: DropResult, _: ResponderProvided) => {
    if (!destination || !draggableId) return;

    const tasks = board?.tasks?.map((task) =>
      task.id === draggableId
        ? { ...task, columnId: destination.droppableId }
        : task
    );
    await patchBoard(tasks, board?.id);
    router.refresh();
  };

  return (
    <div className="flex md:min-h-screen w-full flex-row bg-bg-primary">
      {whatFormIs === "FormTask" && (
        <FormTask
          columns={board?.columns}
          saveTask={saveTask}
          onClose={handleFormClose}
        />
      )}
      {whatFormIs === "ViewCard" && (
        <ViewCard
          columns={board?.columns}
          task={cardDetail}
          onClose={handleViewCardClose}
        />
      )}
      {whatFormIs === "FormColumn" && (
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
              <Droppable key={column?.id} droppableId={column?.id}>
                {(provided, _) => (
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
                        {column?.title} ({column?.tasks?.length || 0})
                      </span>
                    </div>
                    {column?.tasks?.map((task) => (
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
