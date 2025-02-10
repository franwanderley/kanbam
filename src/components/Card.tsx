import { Task } from "@/interface/Task";
import { useDraggable } from "@dnd-kit/core";

export const Card = ({ task, onOpen }: {onOpen: () => void, task: Task | undefined}) => {
   const {attributes, listeners, setNodeRef, transform} = useDraggable({
      id: task?.id || 0,
    });
    const style = transform ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;
   const howSubTaskIsFinish = () => task?.subtasks?.filter(sub => sub?.isFinish)?.length;
   
   return (
      <div className="bg-bg-secondary p-2 rounded-md cursor-pointer mb-4" onClick={onOpen} style={style} ref={setNodeRef} {...listeners} {...attributes}>
         <p className="text-sm mb-2">{task?.title}</p>
         <span className="text-xs text-gray-400">{`${howSubTaskIsFinish()} of ${task?.subtasks?.length} substasks`}</span>
      </div>
   );
}