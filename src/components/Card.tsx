import { Task } from "@/interface/Task";

export const Card = ({ onOpen, setCardDetail }: {onOpen: () => void, setCardDetail: (Card: Task) => void}) => {
   return (
      <div className="bg-bg-secondary p-2 rounded-md cursor-pointer mb-4" onClick={onOpen}>
         <p className="text-sm mb-2">Build UI for onboarding flow</p>
         <span className="text-xs text-gray-400">0 of 3 substasks</span>
      </div>
   );
}