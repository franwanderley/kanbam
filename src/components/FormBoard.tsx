import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const FormBoard =  ({ onClose }: { onClose: () => void }) => {
   const route = useRouter();
   const onSubmit = async (data: { title: string }) => {
      await fetch(`http://localhost:3333/boards`, { method: 'POST', body: JSON.stringify(data) });
      onClose();
      route.push(`/${data.title}`);
   };
   const { handleSubmit, register } = useForm<{ title: string }>();

   return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
         <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
         <div className="bg-bg-secondary rounded-lg overflow-hidden shadow-lg z-10 m-4 max-h-md max-w-md p-4">
            <h1 className="text-lg mb-4 text-center">Add New Board</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
               <label htmlFor="name">Name</label>
               <input 
                  type="text"
                  id="name"
                  {...register('title', { required: true })} 
                  className="p-2 w-full bg-transparent text-gray-400 border border-border mt-2 mb-2"
                  placeholder="ex: Platform business"
               />
               <button className="bg-button w-full cursor-pointer p-2 mt-3 rounded-lg" type="submit">
                  Create Board
               </button>
            </form>
         </div>
      </div>
         
   );
}