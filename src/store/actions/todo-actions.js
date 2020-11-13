import * as types from "../types";
import axios from "../../axios";

// GENERAL ERROR SETTING

const setError = (error) => ({
  type: types.TODO_ERROR,
  error,
});

// ------------------------- LOADING TODO SECTION ------------------------------

const loadingTodoStart = () => ({
  type: types.LOADING_TODO,
});

const setTodos = (todos) => ({
  type: types.SET_TODOS,
  todos,
});

export const loadTodos = () => (dispatch) => {
  dispatch(loadingTodoStart());
  axios
    .get("/todos")
    .then((res) => {
      dispatch(setTodos(res.data.slice(0, 10)));
    })
    .catch((err) => {
      dispatch(setError("Failed To Load todos"));
    });
};

// ---------------------------------- ADD TODO SECTION --------------------------------------------

const addTodoSuccess = (todo) => ({
  type: types.ADD_TODO,
  todo,
});

export const addTodo = (todo) => (dispatch) => {
  const newTodo = { title: todo, completed: false };

  axios
    .post("/todos", newTodo)
    .then((res) => {
      // console.log("Added Todo: ", newTodo);
      dispatch(addTodoSuccess(res.data));
    })
    .catch((err) => {
      console.log("Error Adding Todo: ", err);
      dispatch(setError("Failed to Add Todo...."));
    });
};

// ------------------- DELETE TODO SECTION -------------------------------------

const delTodoSuccess = (id) => ({
  type: types.DELETE_TODO,
  id,
});

export const delTodo = (todoId) => (dispatch) => {
  axios
    .delete(`/todos/${todoId}`)
    .then((res) => {
      dispatch(delTodoSuccess(todoId));
    })
    .catch((err) => {
      console.log("Error Deleting Todo", err);
      dispatch(setError("Failed to Delete Todo..."));
    });
};
