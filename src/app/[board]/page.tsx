'use client'

import React, { useState, useEffect } from 'react';
import { Card } from "@/components/Card";
import { FormTask } from "@/components/FormTask";
import { ViewCard } from "@/components/ViewCard";
import { FormColumn } from "@/components/FormColumn";
import { Task } from "@/interface/Task";
import { Board } from "@/interface/Board";
import { SubTask } from '@/interface/SubTask';
import { Column } from '@/interface/Column';

export default function BoardPage({ params }: { params: { board: string }}) {
  const [whatFormIs, setWhatFormIs] = useState<'FormTask' | 'ViewCard' | 'FormColumn'>();
  const [cardDetail, setCardDetail] = useState<Task>();
  const [board, setBoard] = useState<Board>();

  useEffect(() => {
   const getBoardByTitle = async () => {
     const result = await fetch(`http://localhost:3333/boards?title=${params?.board}`);
     const data: Board[] = await result.json();
     const columns = data?.[0]?.columns
      .sort((a, b) => a.order - b.order)
      .map(col => ({...col, tasks: data?.[0].tasks?.filter(task => task.columnId === col?.id)}));
      setBoard({ ...data?.[0], columns });
   };

   getBoardByTitle();
  },[params]);

  const saveTask = async (data?: Task) => {
    if (data && board) {
      const body = {...board, tasks: [...board.tasks, data]};
      await fetch(`http://localhost:3333/boards/${board?.id}`, { method: 'PUT', body: JSON.stringify(body) });
    }
  };

  const saveColumn = async (data?: Column) => {
    if (data && board) {
      const body = {...board, columns: [...board.columns, data]};
      await fetch(`http://localhost:3333/boards/${board?.id}`, { method: 'PUT', body: JSON.stringify(body) });
    }
  };

  const handleFormClose = () => {
    setWhatFormIs(undefined);
    setCardDetail(undefined);
  };

  const handleViewCardClose = async (subtasks?: SubTask[], columnId?: string) => {
    if (subtasks && columnId) {
      const tasks = board?.tasks?.map(task => task.id === cardDetail?.id ? {...task, subtasks, columnId} : task); 
      const data = {...board, tasks};
      await fetch(`http://localhost:3333/boards/${board?.id}`, { method: 'PUT', body: JSON.stringify(data) });
    }
    handleFormClose();
  };

  const handleCardDetail = (card: Task) => {
    setCardDetail(card);
    setWhatFormIs('ViewCard');
  };

  const handleNewTask = () => {
    setWhatFormIs('FormTask');
  };

  const handleNewColumn = () => {
    setWhatFormIs('FormColumn');
  };

  return (
    <div className="flex min-h-screen w-full flex-row bg-bg-primary">
      {whatFormIs === 'FormTask' && <FormTask columns={board?.columns} saveTask={saveTask} onClose={handleFormClose} />}
      {whatFormIs === 'ViewCard' && <ViewCard columns={board?.columns} task={cardDetail} onClose={handleViewCardClose} />}
      {whatFormIs === 'FormColumn' && <FormColumn columns={board?.columns} saveColumn={saveColumn} onClose={handleFormClose} />}

      <main className="w-full flex flex-col">
        <header className="flex flex-row justify-between p-4 w-full bg-bg-secondary">
          <h2 className="text-2xl">{board?.title}</h2>
          <button onClick={handleNewTask} className="cursor-pointer text-xs bg-button p-2 rounded-2xl">
            + Add New Task
          </button>
        </header>
        <div className="p-4 flex flex-row">
          {board?.columns?.map(column => (
            <div key={column?.id} className="flex flex-col justify-start mr-6">
              <div className="flex flex-row">
                <div style={{backgroundColor: column?.color}} className={`mb-4 p-2 rounded-full mr-2`}/>
                <span className="text-gray-400 text-xs">{column?.title} ({column?.tasks?.length})</span>
              </div>
              {column?.tasks?.map(task => (
                <Card key={task?.id} task={task} onOpen={() => handleCardDetail(task)} />
              ))}
            </div>
          ))}
          <div onClick={handleNewColumn} className="flex flex-col justify-center items-center mr-6 p-4 bg-bg-secondary rounded-md cursor-pointer">
            <span className="text-center">+ New Column</span>
          </div>
        </div>
      </main>
    </div>
  );
}
