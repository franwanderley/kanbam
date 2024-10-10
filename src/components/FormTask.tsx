

export const FormTask = ({ onClose }: {onClose: () => void}) => {

   return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
         <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
         <div className="bg-bg-secondary rounded-lg overflow-hidden shadow-lg z-10 m-4 max-h-md max-w-md p-4">
            <h1 className="text-lg mb-4 text-center">Add New Task</h1>
            <form action="">
               <label htmlFor="title">Title</label>
               <input className="p-2 w-full bg-transparent text-gray-400 border border-border mt-2 mb-2" type="text" name="" id="title" placeholder="Take coffree break" />
               <label htmlFor="description">Description</label>
               <textarea className="p-2 w-full bg-transparent text-gray-400 border border-border mt-2 mb-2" name="" id="description"></textarea>
               <label>Subtasks</label>
               <input className="p-2 w-full bg-transparent text-gray-400 border border-border mt-2 mb-2" type="text" name="" id="" placeholder="Make COfree" />
               <button type="button" className="bg-white w-full cursor-pointer p-2 mt-3 mb-3 rounded-lg text-button">
                  + add new subtask
               </button>
               <label htmlFor="status">Status</label>
               <select className="p-2 w-full bg-transparent text-gray-400 border border-border mt-2 mb-2" name="" id="status">
                  <option value="0">To Do</option>
                  <option value="1">In Progress</option>
                  <option value="2">Done</option>
               </select>
               <button className="bg-button w-full cursor-pointer p-2 mt-3 rounded-lg" type="submit">
                  Create Task
               </button>
            </form>
         </div>
      </div>
   );
}