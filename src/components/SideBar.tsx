import kanbam from '../../public/img/kanbam.png';
import { ViewFinder } from '../../public/img/ViewFinder';

export const SideBar = () => {
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
               <p className="text-xs font-normal ml-1 text-button">+ Create new Board</p>
            </div>
         </div>
      </div>
   );
}