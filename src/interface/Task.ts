import { SubTask } from "./SubTask";

export interface Task {
   id: string;
   title: string;
   description: string;
   subtasks: SubTask[];
   columnId: string;

}