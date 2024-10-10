import { Ellipse } from "../../public/img/Ellipse";

export const ViewCard = () => {
   return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
         <div className="fixed inset-0 bg-black opacity-50" onClick={() => {}}></div>
         <div className="bg-bg-secondary rounded-lg overflow-hidden shadow-lg z-10 m-4 max-h-md max-w-md p-4">
            <div>
               <h3>Build UI for onboarding flow</h3>
               <Ellipse />
            </div>
            <p>
               We know what we´re planning to build for version one. Now we need to finalise the fist pricing
               model we´lll. Keep interating the subtasks untill we have a coherent proposition.
            </p>
            <span>Subtasks (2 of 3)</span>
            <div>
               <input id="subtask-1" type="checkbox" />
               <label htmlFor="subtask-1">Reseach competitor pricing and business models</label>
            </div>
            <div>
               <input id="subtask-1" type="checkbox" />
               <label htmlFor="subtask-1">Reseach competitor pricing and business models</label>
            </div>
            <div>
               <input id="subtask-1" type="checkbox" />
               <label htmlFor="subtask-1">Reseach competitor pricing and business models</label>
            </div>
            <label htmlFor="status">Status</label>
            <select className="p-2 w-full bg-transparent text-gray-400 border border-border mt-2 mb-2" name="" id="status">
               <option value="0">To Do</option>
               <option value="1">In Progress</option>
               <option value="2">Done</option>
            </select>
         </div>
      </div>
   );

};
