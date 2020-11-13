import * as types from "../types";

const initState = {
  posts: [],
  loading: false,
  error: null,
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    // DECIDING WHICH OPERATION TO PERFORM BASED ON THE TYPE OF ACTION
    case types.LOADING_POSTS:
      return {
        ...state,
        loading: true, // SET LOADING STATE TO TRUE
        error: null, // SET ERROR TO FALSE [ IN CASE OF LOAD AFTER ERROR ]
      };

    case types.SET_POSTS:
      return {
        ...state,
        posts: action.posts, // SET THE POSTS
        loading: false, // SET THE LOADING AS FALSE AS LOAD OPERATION HAS SUCCEEDED
      };

    case types.POST_ERROR:
      return {
        ...state,
        error: action.error, // SET THE TYPE AND DESCRIPTION OF THE ERROR TO BE DISPLAYED
        loading: false, // SET THE LOADING AS FALSE AS LOAD OPERATION HAS FAILED
      };

    case types.ADD_POST:
      let oldPostsBeforeAdding = JSON.parse(JSON.stringify(state.posts)); // CREATE A NEW REFERENCE BY DEEP CLONE OF THE STATE WE WANT TO CHANGE
      const newPosts = [action.post]; // ADDING THE NEW POST TO THE TOP I.E. AS THE MOST RECENT POST
      oldPostsBeforeAdding.forEach((oldPost) => newPosts.push(oldPost)); // ADDING OLD POSTS;
      return {
        ...state,
        posts: newPosts, // SETTING POSTS AFTER ADDING NEW POST
      };

    case types.DELETE_POST:
      let oldPostsBeforeDeleting = JSON.parse(JSON.stringify(state.posts)); // CREATE A NEW REFERENCE BY DEEP CLONE OF THE STATE WE WANT TO CHANGE
      const remainingPosts = oldPostsBeforeDeleting.filter(
        (post) => post.id !== action.id
      ); // FILTERING OUT THE DELETED POST OF THE OLD POSTS
      return {
        ...state,
        posts: remainingPosts, //  SETTING POSTS AS THE REMAINING POSTS
      };

    default:
      return state;
  }
};

export default postReducer;
