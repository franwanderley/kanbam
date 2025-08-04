'use client'
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Lonely404  from '@/../public/img/Lonely404.json';

export default function GlobalError ({ reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
    return (
      <div className="flex flex-col p-1 justify-center items-center w-full">
        <header className="flex flex-row justify-between p-4 w-full bg-bg-secondary">
          <h2 className="text-2xl">Platform Launch</h2>
          <button disabled className="cursor-pointer text-xs bg-gray-500 p-2 rounded-2xl">
            + Add New Task
          </button>
        </header>
        <DotLottieReact
           data={Lonely404}
           className="w-auto h-96"
           loop
           autoplay
        />
        <h1>
          Pagina não encontrado! 
          <a onClick={() => reset()} className={`text-xs font-bold ml-1`}>Voltar ao Inicio</a>
        </h1>
      </div>
    );
}