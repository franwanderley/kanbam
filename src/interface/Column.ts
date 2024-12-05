import { Task } from "./Task";

export interface Column {
   id: string;
   title: string;
   color: string;
   order: number;
   tasks?: Task[];
}