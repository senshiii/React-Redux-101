import React, { useState } from "react";
import { connect } from "react-redux";

import actions from "../../store/actions";

import classes from "./Main.module.css";

import Todos from "../../components/Todos/Todos";
import Posts from "../../components/Posts/Posts";

const Main = (props) => {
  const [tab, setTab] = useState("POSTS");
  return (
    <div className={classes.Main}>
      <h1 className={classes.Heading}>My Redux App</h1>
      <div className={classes.Buttons}>
        <button onClick={() => setTab("POSTS")} className={classes.Button}>
          Show Posts
        </button>
        <button onClick={() => setTab("TODOS")} className={classes.Button}>
          Show Todos
        </button>
      </div>
      {tab === "POSTS" ? (
        <Posts
          posts={props.posts}
          loading={props.loadingPosts}
          error={props.postError}
          loadPosts={props.loadPosts}
          addPost={props.addPost}
          deletePost={props.deletePost}
        />
      ) : (
        <Todos
          todos={props.todos}
          loading={props.loadingTodos}
          error={props.todoError}
          addTodo={props.addTodo}
          loadTodos={props.loadTodos}
          deleteTodo={props.deleteTodo}
        />
      )}
    </div>
  );
};

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
