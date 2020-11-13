import React from "react";
import classes from "./Todo.module.css";

const Todo = (props) => {
  return (
    <div className={classes.Todo}>
      <input type="checkbox" />
      <p>{props.todo}</p>
      <button onClick={() => props.delete()} >Delete</button>
    </div>
  );
};

export default Todo;
