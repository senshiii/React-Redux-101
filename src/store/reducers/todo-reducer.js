import * as types from "../types";

const initState = {
  todos: [],
  loading: false,
  error: null,
};

const todoReducer = (state = initState, action) => {
  switch (action.type) {
    // DECIDING WHICH OPERATION TO PERFORM BASED ON THE TYPE OF ACTION
    case types.LOADING_TODOS:
      return {
        ...state,
        loading: true, // SET LOADING STATE TO TRUE
        error: null, // SET ERROR TO FALSE [ IN CASE OF LOAD AFTER ERROR ]
      };

    case types.SET_TODOS:
      return {
        ...state,
        todos: action.todos, // SET THE TODOS
        loading: false, // SET THE LOADING AS FALSE AS LOAD OPERATION HAS SUCCEEDED
      };

    case types.LOAD_TODOS_ERROR:
      return {
        ...state,
        error: action.error, // SET THE TYPE AND DESCRIPTION OF THE ERROR TO BE DISPLAYED
        loading: false, // SET THE LOADING AS FALSE AS LOAD OPERATION HAS FAILED
      };

    case types.ADD_TODO:
      let oldTodosBeforeAdding = JSON.parse(JSON.stringify(state.todos)); // CREATE A NEW REFERENCE BY DEEP CLONE OF THE STATE WE WANT TO CHANGE
      const newTodos = [action.todo]; // ADDING THE NEW POST TO THE TOP I.E. AS THE FIRST POST
      oldTodosBeforeAdding.forEach((oldTodo) => newTodos.push(oldTodo)); // ADDING OLD TODOS;
      return {
        ...state,
        todos: newTodos, // SETTING TODOS AFTER ADDING NEW POST
      };

    case types.DELETE_TODO:
      let oldTodosBeforeDeleting = JSON.parse(JSON.stringify(state.todos)); // CREATE A NEW REFERENCE BY DEEP CLONE OF THE STATE WE WANT TO CHANGE
      const remainingTodos = oldTodosBeforeDeleting.map(
        (todo) => todo.id !== action.todo.id
      ); // FILTERING OUT THE DELETED POST OF THE OLD TODOS
      return {
        ...state,
        todos: remainingTodos, //  SETTING TODOS AS THE REMAINING TODOS
      };

    default:
      return state;
  }
};

export default todoReducer;
