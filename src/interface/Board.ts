import { Column } from "./Column";
import { Task } from "./Task";

export interface Board {
   id: number;
   title: string;
   columns: Column[];
   tasks: Task[];
}