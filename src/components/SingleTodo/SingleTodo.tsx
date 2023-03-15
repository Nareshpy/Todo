import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "../../models/Todo";
import './SingleTodo.css';
const SingleTodo: React.FC<{
    todo: Todo;
    todos: Todo[];
    deleteTodo: Function;
    editsTodo: Function;
    handleDone: Function;
}> = ({ todo, deleteTodo, editsTodo, handleDone }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.title);

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        editsTodo(id, editTodo)
        setEdit(false);
    };
    return (
        <form className="todos__single" onSubmit={(e) => {
            handleEdit(e, todo.id)
        }}>
            {edit ? (
                <input
                    value={editTodo}
                    onChange={(e) => setEditTodo(e.target.value)}
                    className="todos__single--text"
                    ref={inputRef}
                />
            ) : todo.completed ? (
                <s className="todos__single--text">{todo.title}</s>
            ) : (

                <span className="todos__single--text">{todo.title}</span>
            )}
            <div>
                <span
                    className="icon"
                    onClick={() => {
                        if (!edit && !todo.completed) {
                            setEdit(!edit);
                        }
                    }}
                >
                    <AiFillEdit />
                </span>
                <span className="icon" onClick={() => deleteTodo(todo.id)}>
                    <AiFillDelete />
                </span>
                <span className="icon" onClick={() => handleDone(todo.id)}>
                    <MdDone />
                </span>
            </div>
        </form>
    );
};

export default SingleTodo;