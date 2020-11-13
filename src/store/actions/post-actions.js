import axios from "../../axios";
import * as types from "../types";

// ERROR ACTION

const setError = (err) => ({
  type: types.POST_ERROR,
  error: err,
});

// --------------------- LOAD POSTS -------------------------

const loadPostsStart = () => ({
  type: types.LOADING_POSTS,
});

const setPosts = (posts) => ({
  type: types.SET_POSTS,
  posts,
});

export const loadPosts = () => (dispatch) => {
  dispatch(loadPostsStart());
  axios
    .get("/posts")
    .then((res) => {
      dispatch(setPosts(res.data.splice(0, 10)));
    })
    .catch((err) => {
      console.log("Error Loading Posts: ", err);
      dispatch(setError("Failed to Load Posts..."));
    });
};

// ---------------------------------- ADD POST SECTION --------------------------------------------

const addPostSuccess = (post) => ({
  type: types.ADD_POST,
  post,
});

export const addPost = (title, body) => (dispatch) => {
  const newTodo = { title: title, body: body };
  axios
    .post("/posts", newTodo)
    .then((res) => {
      // console.log(res.data);
      dispatch(addPostSuccess(res.data));
    })
    .catch((err) => {
      console.log("Error Adding Post: ", err);
      dispatch(setError("Failed to Add Post...."));
    });
};

// ------------------------ DELETE POST SECTION ---------------------------------------

const delPostSuccess = (id) => ({
  type: types.DELETE_POST,
  id,
});

export const delPost = (postId) => (dispatch) => {
  axios
    .delete(`/posts/${postId}`)
    .then((res) => {
      dispatch(delPostSuccess(postId));
    })
    .catch((err) => {
      console.log("Error deleting Post: ", err);
      dispatch(setError("Failed to Delete Post...."));
    });
};
