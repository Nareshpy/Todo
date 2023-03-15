import React, { useRef } from "react";
import "./Input.css";

interface props {
  title: string;
  setTodo: Function;
  handleAdd: Function;
}

const InputFeild: React.FC<props> = ({ title, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        placeholder="Enter a Todo"
        value={title}
        ref={inputRef}
        onChange={(e) => {
          setTodo( e.target.value);
      }
      }
        className="input__box"
      />
      <button type="submit" className="input_submit">
        ADD
      </button>
    </form>
  );
};

export default InputFeild;