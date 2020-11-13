import React, { useEffect, useState } from "react";

import classes from "./Todos.module.css";

import Todo from "../Todo/Todo";

const Todos = (props) => {
  const [newTodo, setNewTodo] = useState("");

  const { loadTodos } = props;
  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  let todosView = null;
  if (props.loading) {
    todosView = <p>Loading...</p>;
  } else {
    todosView =
      props.todos.length > 0 ? (
        props.todos.map((todo) => (
          <Todo
            delete={() => props.deleteTodo(todo.id)}
            key={todo.id}
            todo={todo.title}
          />
        ))
      ) : (
        <p>No Todos Found..</p>
      );
  }
  return (
    <div className={classes.Todos}>
      <h1>Todos</h1>
      <hr />
      <div className={classes.NewTodo}>
        <input
          type="text"
          placeholder="Enter New Todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          onClick={() => {
            props.addTodo(newTodo);
            setNewTodo("");
          }}
        >
          Add Todo
        </button>
      </div>
      {props.error && <p className={classes.Error}>{props.error}</p>}
      {todosView}
    </div>
  );
};

export default Todos;
