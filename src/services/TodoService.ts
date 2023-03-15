import axios from "axios";
import { ITodoService } from "../contracts/ITodoService";
import { Todo } from "../models/Todo";
export  class TodoService implements ITodoService {
    public apiUrl = 'https://jsonplaceholder.typicode.com/todos?_limit=10';
    public  async getTodos(): Promise<Todo[]> {
        let todos: Todo[] = []
        await axios.get(this.apiUrl)
            .then(function (response) {
                todos = response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
        return todos
    }
        
    }
   
