import { Task } from "./Task";

export interface Column {
   id: number;
   title: string;
   color: string;
   order: number;
   tasks?: Task[];
}