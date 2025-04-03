import { Task } from "@/interface/Task";
import { Draggable } from "react-beautiful-dnd";

export const Card = ({ task, onOpen }: {onOpen: () => void, task: Task | undefined}) => {
   const howSubTaskIsFinish = () => task?.subtasks?.filter(sub => sub?.isFinish)?.length;
   
   return (
      <Draggable draggableId={task?.id || '1'} index={0}>
         {(provided, _) => (
            <div 
               className="bg-bg-secondary p-2 rounded-md cursor-pointer mb-4" 
               onClick={onOpen}
               ref={provided.innerRef}
               {...provided.draggableProps}
               {...provided.dragHandleProps}
            >
            <p className="text-sm mb-2">{task?.title}</p>
            <span className="text-xs text-gray-400">{`${howSubTaskIsFinish()} of ${task?.subtasks?.length} substasks`}</span>
         </div>
         )}
      </Draggable>
   );
}