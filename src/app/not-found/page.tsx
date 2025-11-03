'use client'

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Lonely404  from '@/../public/img/Lonely404.json';
import Link from "next/link";

export default function NotFound () {
    return (
      <div className="flex flex-col items-center w-full">
        <header className="flex flex-row justify-between p-4 w-full bg-bg-secondary">
          <h2 className="text-2xl">Not Found</h2>
          <button disabled className="cursor-pointer text-xs bg-gray-500 p-2 rounded-2xl">
            + Add New Task
          </button>
        </header>
        <div className="p-2 mt-4 items-center flex flex-col">
          <DotLottieReact
           data={Lonely404}
           className="w-auto h-96"
           loop
           autoplay
        />
        <h1>
          Page Not Found! 
          <Link href="/" className="cursor-pointer text-center font-bold ml-1 text-button">
            Voltar ao Inicio
          </Link>
        </h1>
        </div>
      </div>
    );
}