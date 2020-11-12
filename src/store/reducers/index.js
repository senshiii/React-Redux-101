import { combineReducers } from "redux";

/*
  A Store can accept only one Reducer.
  However, we have two separate, independent reducers. One for Posts, the other for Todos.
  Generally speaking, one project might have numerous "pieces" of state. 
  In this application we have two pieces of state -> Posts and Todos.
  In order for things to work, we need to supply only one Reducer. We doing this by combining the Reducers into one "root" reducer.
  We achieve this using the combineReducers function.
*/

import postReducer from "./post-reducer";
import todoReducer from "./todo-reducer";

const rootReducer = combineReducers({
  // In this function, a peiece of a state is mapped to their 
  // corresponding Reducer. This mapping will be used in our React components to access information
  // from a particular piece of state 
  posts: postReducer, 
  todos: todoReducer,
});

export default rootReducer;
