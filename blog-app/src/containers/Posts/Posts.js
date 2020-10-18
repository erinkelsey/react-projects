import React, { Component } from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";

import Post from "../../components/Post/Post";
import FullPost from "../FullPost/FullPost";

import "./Posts.css";

class Posts extends Component {
  state = {
    posts: []
  };

  componentWillMount = async () => {
    const response = await axios.get("/posts");
    const posts = response.data.slice(0, 4);
    const updatedPosts = posts.map(post => {
      return {
        ...post,
        author: "Homer Simpson"
      };
    });
    this.setState({ posts: updatedPosts });
  };

  // navigate programmatically, instead of Link
  postSelectedHandler = id => {
    this.props.history.push({ pathname: "/posts/" + id });
    // or
    this.props.history.push("/posts/" + id);
  };

  buildPosts() {
    return this.state.posts.map(post => {
      return (
        <Link to={"/posts/" + post.id} key={post.id}>
          <Post
            title={post.title}
            author={post.author}
            // clicked={() => this.postSelectedHandler(post.id)}
          />
        </Link>
      );
    });
  }

  render() {
    return (
      <div>
        <section className='Posts'>{this.buildPosts()}</section>
        <Route
          path={this.props.match.url + "/:id"}
          exact
          component={FullPost}
        />
      </div>
    );
  }
}

export default Posts;
