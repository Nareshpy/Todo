import { Component, ReactNode } from "react";
import { Todo } from "../../models/Todo";
import { TodoService } from "../../services/TodoService";
import './TodoList.css';
import InputFeild from "../InputField/InputField";
import SingleTodo from "../SingleTodo/SingleTodo";
interface ITodoListProps {
}
interface ITodoListState {
  todos: Todo[];
  title: string;
}
let services = new TodoService()
export default class Todos extends Component<ITodoListProps, ITodoListState>{
  constructor(props: ITodoListProps) {
    super(props);
    this.state = {
      todos: [],
      title: ""
    }
  }
  componentDidMount(): void {
    services.getTodos().then((Todos) => {
      this.setState(prevState => ({
        todos: [...Todos]
      }));
    }
    );
  }
  handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const { title } = this.state;
    if (title) {
      this.setState(prevState => ({
        todos: [...prevState.todos, { id: Date.now(), title, completed: false }]
      }));
      this.setState({ title: "" });
    }
  };

  handleDelete = (id: number) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id)
    });

  };
  editsTodo=(id: number,newTitle:string)=>{
        this.setState({
          todos:this.state.todos.map((todo) => (todo.id === id ? { ...todo, title: newTitle } : todo))
        })
  }
  completedTodo=(id:number)=>{
    this.setState({
      todos:this.state.todos.map((todo)=>todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    })
  }
  render(): ReactNode {
    return (
      <>
        <div className="App">
          <span className="heading">ToDos</span>
          <InputFeild title={this.state.title} setTodo={(value: string) => this.setState({ title: value })} handleAdd={this.handleAdd} />
          <div className="todos">
            {this.state.todos?.map((todo) => (
              <SingleTodo
                todos={this.state.todos}
                todo={todo}
                key={todo.id}
                deleteTodo={this.handleDelete}
                editsTodo={this.editsTodo}
                handleDone={this.completedTodo}
              />
            ))}
          </div>
        </div>
      </>
    )
  }



}