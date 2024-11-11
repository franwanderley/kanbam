import { Column } from "@/interface/Column";
import { SubTask } from "@/interface/SubTask";
import { Task } from "@/interface/Task";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormTaskProp {
   columns: Column[] | undefined;
   onClose: () => void;
   saveTask: (data: Task | undefined) => void;
}

export const FormTask = ({ columns, onClose, saveTask }: FormTaskProp) => {
   const { register, handleSubmit } = useForm<Task>();
   const [subtasks, setSubtasks] = useState(['']);
   const onSubmit = (data : Task) => {
      const filtedSubtasks = subtasks?.filter(sub => sub !== '');
      saveTask({...data, subtasks: filtedSubtasks?.map(sub => ({title: sub, isFinish: false}))});
      onClose();
   };

   return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
         <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
         <div className="bg-bg-secondary rounded-lg overflow-hidden shadow-lg z-10 m-4 max-h-md max-w-md p-4">
            <h1 className="text-lg mb-4 text-center">Add New Task</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
               <label htmlFor="title">Title</label>
               <input 
                  className="p-2 w-full bg-transparent text-gray-400 border border-border mt-2 mb-2" 
                  type="text" 
                  {...register("title", {required: true})}
                  id="title" 
                  placeholder="Take coffree break" 
               />
               <label htmlFor="description">Description</label>
               <textarea 
                  className="p-2 w-full bg-transparent text-gray-400 border border-border mt-2 mb-2"
                  {...register("description", {required: true})} 
                  id="description"
               ></textarea>
               <label>Subtasks</label>
               {subtasks?.map((_, index) => (
                  <input 
                     key={index} 
                     className="p-2 w-full bg-transparent text-gray-400 border border-border mt-2 mb-2" 
                     type="text"
                     onChange={({ target }) => setSubtasks(old => old?.map((value, ind) => ind === index ? target.value : value))}
                     placeholder="Make COfree" 
                  />
               ))}
               <button 
                  type="button" 
                  className="bg-white w-full cursor-pointer p-2 mt-3 mb-3 rounded-lg text-button" 
                  onClick={() => setSubtasks(old => [...old, ''])}
               >
                  + add new subtask
               </button>
               <label htmlFor="status">Status</label>
               <select {...register("columnId", {required: true})} className="p-2 w-full bg-transparent text-gray-400 border border-border mb-2" id="status">
                  {columns?.map(col => (
                     <option key={col?.id} value={col?.id}>{col?.title}</option>
                  ))}
               </select>
               <button className="bg-button w-full cursor-pointer p-2 mt-3 rounded-lg" type="submit">
                  Create Task
               </button>
            </form>
         </div>
      </div>
   );
}