import React, { Component } from "react";

import classes from "./Todos.module.css";

import Todo from "../Todo/Todo";

export default class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: "",
    };
  }

  componentDidMount() {
    this.props.loadTodos();
  }

  render() {
    let todosView = null;
    if (this.props.loading) {
      todosView = <p>Loading...</p>;
    } else {
      todosView =
        this.props.todos.length > 0 ? (
          this.props.todos.map((todo) => (
            <Todo
              delete={() => this.props.deleteTodo(todo.id)}
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
            value={this.state.newTodo}
            onChange={(e) => this.setState({ newTodo: e.target.value })}
          />
          <button
            onClick={() => {
              this.props.addTodo(this.state.newTodo);
              this.setState({ newTodo: "" });
            }}
          >
            Add Todo
          </button>
        </div>
        {this.props.error && (
          <p className={classes.Error}>{this.props.error}</p>
        )}
        {todosView}
      </div>
    );
  }
}
