import { ViewCard } from "./ViewCard";

export const Card = ({ onOpen }: {onOpen: () => void}) => {
   return (
      <div className="bg-bg-secondary p-2 rounded-md cursor-pointer mb-4" onClick={onOpen}>
         <p className="text-sm mb-2">Build UI for onboarding flow</p>
         <span className="text-xs text-gray-400">0 of 3 substasks</span>
      </div>
   );
}