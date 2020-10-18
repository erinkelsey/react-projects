import React, { Component } from "react";
import axios from "axios";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null
  };

  componentWillMount = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const posts = response.data.slice(0, 4);
    const updatedPosts = posts.map(post => {
      return {
        ...post,
        author: "Erin"
      };
    });
    this.setState({ posts: updatedPosts });
  };

  postSelectedHandler = id => {
    this.setState({ selectedPostId: id });
  };

  buildPosts() {
    return this.state.posts.map(post => {
      return (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <section className='Posts'>{this.buildPosts()}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
