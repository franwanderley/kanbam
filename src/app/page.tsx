'use client'

import { SideBar } from "@/components/SideBar";
import { Card } from "@/components/Card";
import { FormTask } from "@/components/FormTask";
import { useState } from "react";
import { ViewCard } from "@/components/ViewCard";
import { FormColumn } from "@/components/FormColumn";

export default function Home() {
  const [whatFormIs, setWhatFormIs] = useState<'FormTask' | 'ViewCard' | 'FormColumn' | null>();
  return (
    <div className="flex min-h-screen flex-row bg-bg-primary divide-x">
      {whatFormIs === 'FormTask' ? <FormTask onClose={() => setWhatFormIs(null)} /> : ''}
      {whatFormIs === 'ViewCard' ? <ViewCard onClose={() => setWhatFormIs(null)} /> : ''}
      {whatFormIs === 'FormColumn' ? <FormColumn onClose={() => setWhatFormIs(null)} /> : ''}

      <SideBar />
      <main className="w-full flex flex-col">
        <header className="flex flex-row justify-between p-4 w-full bg-bg-secondary">
          <h2 className="text-2xl">Platform Launch</h2>
          <button onClick={() => setWhatFormIs('FormTask')} className="cursor-pointer text-xs bg-button p-2 rounded-2xl">
            + Add New Task
          </button>
        </header>
        <div className="p-4 flex flex-row">
          <div className="flex flex-col justify-center mr-6">
            <div className="flex flex-row mb-4">
              <div className="w-4 bg-blue-400 rounded-full mr-2"/>
              <span className="text-gray-400 text-xs">TODO (4)</span>
            </div>
            <Card onOpen={() => setWhatFormIs('ViewCard')} />
            <Card onOpen={() => setWhatFormIs('ViewCard')} />
          </div>
          <div className="flex flex-col justify-center mr-6">
            <div className="flex flex-row mb-4">
              <div className="w-4 bg-indigo-600 rounded-full mr-2"/>
              <span className="text-gray-400 text-xs">DOING (4)</span>
            </div>
            <Card onOpen={() => setWhatFormIs('ViewCard')} />
            <Card onOpen={() => setWhatFormIs('ViewCard')} />
          </div>
          <div className="flex flex-col justify-center mr-6">
            <div className="flex flex-row mb-4">
              <div className="w-4 bg-green-400 rounded-full mr-2"/>
              <span className="text-gray-400 text-xs">DONE (2)</span>
            </div>
            <Card onOpen={() => setWhatFormIs('ViewCard')} />
            <Card onOpen={() => setWhatFormIs('ViewCard')} />
          </div>
          <div
            onClick={() => setWhatFormIs('FormColumn')} 
            className="flex flex-col justify-center items-center mr-6 p-4 bg-bg-secondary rounded-md cursor-pointer"
          >
            <span className="text-center">+ New Column</span>
          </div>
        </div>
      </main>
    </div>
  );
}
