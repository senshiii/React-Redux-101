import React from "react";
import classes from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={classes.Post}>
      <h3>{props.title}</h3>
      <p>{props.body}</p>
      <button onClick={props.delete} >Delete Post</button>
    </div>
  );
};

export default Post;
