import { Column } from "@/interface/Column";

export const FormColumn = ({ columns, onClose }: {columns?: Column[], onClose: () => void}) => {
   const lastOrder = columns?.[columns?.length - 1]?.order || 0;
   return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
         <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
         <div className="bg-bg-secondary rounded-lg overflow-hidden shadow-lg z-10 m-4 max-h-md max-w-md p-4">
            <h1 className="text-lg mb-4 text-center">Add New Column</h1>
            <form action="">
               <label htmlFor="title">Title</label>
               <input className="p-2 w-full bg-transparent text-gray-400 border border-border mt-2 mb-2" type="text" name="" id="title" placeholder="Take coffree break" />
               <label htmlFor="status">Order</label>
               <select className="p-2 w-full bg-transparent text-gray-400 border border-border mt-2 mb-2" name="" id="status">
                  {columns?.map(col => (
                     <option key={col.id} value={col.order}>{`before ${col.title}`}</option>
                  ))}
                  <option value={lastOrder + 1}>Last</option>
               </select>
               <button className="bg-button w-full cursor-pointer p-2 mt-3 rounded-lg" type="submit">
                  Create Column
               </button>
            </form>
         </div>
      </div>
   );
};
