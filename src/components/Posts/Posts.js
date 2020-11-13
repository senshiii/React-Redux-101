import React, { Component } from "react";

import classes from "./Posts.module.css";

import Post from "../Post/Post";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
    };
  }

  componentDidMount() {
    this.props.loadPosts();
  }

  render() {
    let postsView = null;
    if (this.props.loading) {
      postsView = <p>Loading.....</p>;
    } else {
      postsView =
        this.props.posts.length > 0 ? (
          this.props.posts.map((post) => (
            <Post
              delete={() => this.props.deletePost(post.id)}
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
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
          />
          <textarea
            placeholder="Enter Post Body"
            value={this.state.body}
            onChange={(e) => this.setState({ body: e.target.value })}
          />
          <button
            onClick={() => {
              this.props.addPost(this.state.title, this.state.body);
              this.setState({ title: "", body: "" });
            }}
          >
            Add Post
          </button>
        </div>
        {this.props.error && (
          <p className={classes.Error}>{this.props.error}</p>
        )}
        {postsView}
      </div>
    );
  }
}
