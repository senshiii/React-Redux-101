import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../../store/actions";

import classes from "./Main.module.css";

import Todos from "../../components/Todos/Todos";
import Posts from "../../components/Posts/Posts";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "POSTS",
    };
  }

  render() {
    return (
      <div className={classes.Main}>
        <h1 className={classes.Heading}>My Redux App</h1>
        <div className={classes.Buttons}>
          <button
            onClick={() => this.setState({ tab: "POSTS" })}
            className={classes.Button}
          >
            Show Posts
          </button>
          <button
            onClick={() => this.setState({ tab: "TODOS" })}
            className={classes.Button}
          >
            Show Todos
          </button>
        </div>
        {this.state.tab === "POSTS" ? (
          <Posts
            posts={this.props.posts}
            loading={this.props.loadingPosts}
            error={this.props.postError}
            loadPosts={this.props.loadPosts}
            addPost={this.props.addPost}
            deletePost={this.props.deletePost}
          />
        ) : (
          <Todos
            todos={this.props.todos}
            loading={this.props.loadingTodos}
            error={this.props.todoError}
            addTodo={this.props.addTodo}
            loadTodos={this.props.loadTodos}
            deleteTodo={this.props.deleteTodo}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  todos: state.todos.todos,
  loadingTodos: state.todos.loading,
  loadingPosts: state.posts.loading,
  todoError: state.todos.error,
  postError: state.posts.error,
});

const mapDispatchToProps = (dispatch) => ({
  loadPosts: () => dispatch(actions.loadPosts()),
  addPost: (title, body) => dispatch(actions.addPost(title, body)),
  deletePost: (postId) => dispatch(actions.delPost(postId)),
  loadTodos: () => dispatch(actions.loadTodos()),
  addTodo: (todo) => dispatch(actions.addTodo(todo)),
  deleteTodo: (todoId) => dispatch(actions.delTodo(todoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
