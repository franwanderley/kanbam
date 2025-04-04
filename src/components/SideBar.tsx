'use client'
import { usePathname } from 'next/navigation';
import { Hide } from '../../public/img/Hide';
import { Eye } from '../../public/img/Eye';
import kanbam from '../../public/img/kanbam.png';
import { ViewFinder } from '../../public/img/ViewFinder';
import { Board } from '@/interface/Board';
import Link from 'next/link';
import { useState } from 'react';
import { FormBoard } from './FormBoard';
import Image from 'next/image';

interface SideBarProps {
   boards: Board[] | undefined;
   setBoardSelected?: (board: Board) => {};
}

export const SideBar = ({ boards }: SideBarProps) => {
   const boardName = usePathname();
   const [openModal, setOpenModal] = useState<boolean>();
   const [openSideBar, setOpenSideBar] = useState(!boardName.substring(1));
   const forString = () => boardName && boardName.substring(1).split('%20').join(' ');

   if(!openSideBar) {
      return (
         <div className="cursor-pointer md:fixed absolute flex flex-row bottom-3 ml-4 border-none align-middle text-gray-400">
            <Eye width="20px" height="15px" />
            <span onClick={() => setOpenSideBar(old => !old)} className="text-sm">Open SideBar</span>
         </div>
      );
   }

   return (
      <div className="min-h-screen md:w-1/5 w-full flex flex-col p-4 bg-bg-secondary">
         {openModal && <FormBoard onClose={() => setOpenModal(false)} />}
         <div className="flex flex-row mb-6">
            <Image className="w-6 mr-2" src={kanbam} alt="logo do kanbam"/>
            <h1 className="text-2xl">Kanbam</h1>
         </div>
         <div>
            <p className="text-xs text-gray-400 mb-4">ALL BOARDS ({boards?.length})</p>
               {boards?.map(board => (
                  <div key={board?.id} className="flex flex-row items-center mb-4">
                     <ViewFinder width="20px" height="15px" />
                     <Link 
                        href={`/${board?.title}`} 
                        className={`text-xs font-${board?.title === forString() ? 'bold' : 'normal'} ml-1`}
                     >
                        {board?.title}
                     </Link>
                  </div>
               ))}
            <div className="flex flex-row items-center text-button">
               <ViewFinder width="20px" height="15px" />
               <p className="text-xs font-normal ml-1 text-button cursor-pointer" onClick={() => setOpenModal(true)}>
                  + Create new Board
               </p>
            </div>
         </div>
         <div className="cursor-pointer flex flex-row md:fixed absolute bottom-3 align-middle text-gray-400">
            <Hide width="20px" height="15px" />
            <span onClick={() => setOpenSideBar(old => !old)} className="text-sm">Hide SideBar</span>
         </div>
      </div>
   );
}