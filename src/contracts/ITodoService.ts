import { Todo } from "../models/Todo";

export interface ITodoService{
    getTodos():Promise<Todo[]>
}