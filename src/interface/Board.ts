import { Column } from "./Column";
import { Task } from "./Task";

export interface Board {
   id: string;
   title: string;
   columns: Column[];
   tasks: Task[];
}