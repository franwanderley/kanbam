'use server'
import React from 'react';

export default async function Home() {

  return (
    <div className="flex h-screen w-screen flex-row bg-bg-primary">

      <main className="w-full flex flex-col">
        <header className="flex flex-row justify-between p-4 w-full bg-bg-secondary">
          <h2 className="text-2xl">Platform Launch</h2>
          <button disabled className="cursor-pointer text-xs bg-gray-500 p-2 rounded-2xl">
            + Add New Task
          </button>
        </header>
        <h1 className="flex justify-center mt-6 self-center">Choose your board</h1>
      </main>
    </div>
  );
}
