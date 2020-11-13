import React, { useEffect, useState } from "react";

import classes from "./Posts.module.css";

import Post from "../Post/Post";

const Posts = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { loadPosts } = props;
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  let postsView = null;
  if (props.loading) {
    postsView = <p>Loading.....</p>;
  } else {
    postsView =
      props.posts.length > 0 ? (
        props.posts.map((post) => (
          <Post
            delete={() => props.deletePost(post.id)}
            key={post.id}
            title={post.title}
            body={post.body}
          />
        ))
      ) : (
        <p>No Posts Found..</p>
      );
  }

  return (
    <div className={classes.Posts}>
      <h1>Posts</h1>
      <hr />
      <div className={classes.NewPost}>
        <input
          type="text"
          placeholder="Enter New Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter Post Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button
          onClick={() => {
            props.addPost(title, body);
            setTitle("");
            setBody("");
          }}
        >
          Add Post
        </button>
      </div>
      {props.error && <p className={classes.Error}>{props.error}</p>}
      {postsView}
    </div>
  );
};

export default Posts;
