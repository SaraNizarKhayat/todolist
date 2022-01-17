/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";



const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  function toggleComplete(id){
    const updateTodo = [... todos].map((todo) => {
      if(todo.id === id){
        todo.isComplete = !todo.isComplete
      }
      return todo;
    })
    setEdit(updateTodo); 
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className="icons">
        <label className="custom-checkbox">
        <input 
        type="checkbox" 
        onChange={() => toggleComplete(todo.id)}
        checked={todo.isComplete}
        />
        <span className="checkmark"></span>
        </label>
        <BiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className="edit-icon"
        />
        <AiOutlineCloseSquare
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />
      </div>
    </div>
    
    
  ));
};

export default Todo;
