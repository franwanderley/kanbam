import { SubTask } from "./SubTask";

export interface Task {
   id: number;
   title: string;
   description: string;
   subtasks: SubTask[];
   columnId: number;

}