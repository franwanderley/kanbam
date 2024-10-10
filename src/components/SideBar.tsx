import { useState } from 'react';
import { Hide } from '../../public/img/Hide';
import kanbam from '../../public/img/kanbam.png';
import { ViewFinder } from '../../public/img/ViewFinder';

export const SideBar = () => {
   const [isOpenSideBar, setIsOpenSideBar] = useState<0 | 1>(1);
   if (!isOpenSideBar) {
      return '';
   }
   return (
      <div className="min-h-screen w-1/4 flex flex-col p-4 bg-bg-secondary">
         <div className="flex flex-row mb-6">
            <img className="w-6 mr-2" src={kanbam.src} alt="logo do kanbam" />
            <h1 className="text-2xl">Kanbam</h1>
         </div>
         <div>
            <p className="text-xs text-gray-400 mb-4">ALL BOARDS (8)</p>
            <div className="flex flex-row items-center mb-4">
               <ViewFinder width="20px" height="15px" />
               <p className="text-xs font-normal ml-1">Platform Launcher</p>
            </div>
            <div className="flex flex-row items-center text-button">
               <ViewFinder width="20px" height="15px" />
               <p className="text-xs font-normal ml-1 text-button cursor-pointer">+ Create new Board</p>
            </div>
         </div>
         <div onClick={_ => setIsOpenSideBar(0)} className="cursor-pointer flex flex-row fixed bottom-3 align-middle text-gray-400">
            <Hide width="20px" height="15px" />
            <span className="text-sm">Hide SideBar</span>
         </div>
      </div>
   );
}