import { Task } from "@/interface/Task";
import { Ellipse } from "../../public/img/Ellipse";
import { Column } from "@/interface/Column";
import { useState } from "react";
import { SubTask } from "@/interface/SubTask";

interface ViewCardProps {
   onClose: (subtasks?: SubTask[], columnId?: string) => void;
   task: Task | undefined;
   columns: Column[] | undefined;
}

export const ViewCard = ({ onClose, task, columns } : ViewCardProps) => {
   const howSubTaskIsFinish = () => task?.subtasks?.filter(sub => sub?.isFinish)?.length;
   const [subtasks, setSubtasks] = useState(task?.subtasks);
   const [columnId, setColumnId] = useState(task?.columnId);

   return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
         <div className="fixed inset-0 bg-black opacity-50" onClick={() => onClose(subtasks, columnId)}></div>
         <div className="bg-bg-secondary rounded-lg overflow-hidden shadow-lg z-10 m-4 max-h-md max-w-md p-4">
            <div className="flex flex-row justify-between mb-4 h-6">
               <h3 className="font-bold">{task?.title}</h3>
               <Ellipse />
            </div>
            <p className="text-sm text-gray-400 mb-3 text-justify">{task?.description}</p>
            <span>{`Subtasks (${howSubTaskIsFinish()} of ${task?.subtasks?.length})`}</span>
            {subtasks?.map(sub => (
               <div key={sub?.id} className="bg-bg-primary p-2 w-full rounded-md mt-3">
                  <input 
                     id={`subtask-${sub?.title}`} 
                     type="checkbox" 
                     className="mr-2"
                     defaultChecked={sub?.isFinish} 
                     onChange={() => setSubtasks(old => old?.map(value => value?.title === sub?.title ? {...value, isFinish: !value?.isFinish} : value))} 
                  />
                  <label htmlFor={`subtask-${sub?.title}`}>{sub?.title}</label>
               </div>
            ))}
            <label htmlFor="status" className="mt-3">Status</label>
            <select 
               value={columnId} 
               className="p-2 w-full bg-transparent text-gray-400 border border-border mt-2 mb-2" 
               id="status"
               onChange={({target}) => setColumnId(target?.value)}
            >
               {columns?.map(col => (
                  <option key={col?.id} value={col?.id}>{col?.title}</option>
               ))}
            </select>
         </div>
      </div>
   );

};
