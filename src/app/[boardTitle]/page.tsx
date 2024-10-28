'use client'

import React, { useState, useEffect } from 'react';
import { SideBar } from "@/components/SideBar";
import { Card } from "@/components/Card";
import { FormTask } from "@/components/FormTask";
import { ViewCard } from "@/components/ViewCard";
import { FormColumn } from "@/components/FormColumn";
import { Task } from "@/interface/Task";
import { Board } from "@/interface/Board";

export default function BoardPage({ param}: { param: {boardTitle: string}}) {
  const [whatFormIs, setWhatFormIs] = useState<'FormTask' | 'ViewCard' | 'FormColumn'>();
  const [cardDetail, setCardDetail] = useState<Task>();
  const [board, setBoard] = useState<Board>();

  useEffect(() => {
   const getBoardByTitle = async () => {
      console.log(param);
      const result = await fetch(`localhost:3333/boards?title=${param?.boardTitle}`);
      setBoard(await result.json());
   };

   getBoardByTitle();
  });


  const handleFormClose = () => {
    setWhatFormIs(undefined);
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
    <div className="flex min-h-screen flex-row bg-bg-primary divide-x">
      {whatFormIs === 'FormTask' && <FormTask onClose={handleFormClose} />}
      {whatFormIs === 'ViewCard' && <ViewCard task={cardDetail} onClose={handleFormClose} />}
      {whatFormIs === 'FormColumn' && <FormColumn onClose={handleFormClose} />}

      <main className="w-full flex flex-col">
        <header className="flex flex-row justify-between p-4 w-full bg-bg-secondary">
          <h2 className="text-2xl">{board?.title}</h2>
          <button onClick={handleNewTask} className="cursor-pointer text-xs bg-button p-2 rounded-2xl">
            + Add New Task
          </button>
        </header>
        <div className="p-4 flex flex-row">
          {['TODO', 'DOING', 'DONE'].map((status, index) => (
            <div key={index} className="flex flex-col justify-center mr-6">
              <div className={`flex flex-row mb-4 bg-${status === 'TODO' ? 'blue' : status === 'DOING' ? 'indigo' : 'green'}-400 rounded-full mr-2`}/>
              <span className="text-gray-400 text-xs">{status} ({index + 1})</span>
              <Card setCardDetail={handleCardDetail} onOpen={() => setWhatFormIs('ViewCard')} />
              <Card setCardDetail={handleCardDetail} onOpen={() => setWhatFormIs('ViewCard')} />
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
