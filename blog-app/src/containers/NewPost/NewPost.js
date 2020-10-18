import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import axios from "axios";

import "./NewPost.css";

class NewPost extends Component {
  state = {
    title: "",
    content: "",
    author: "Homer"
    // submitted: false
  };

  postDataHandler = async () => {
    const post = {
      title: this.state.title,
      body: this.state.content,
      author: this.state.author
    };
    await axios.post("https://jsonplaceholder.typicode.com/posts/", post);
    this.props.history.replace("/posts");
    // this.setState({ submitted: true });
    // console.log(response);
  };

  // buildRedirect = () => {
  //   if (!this.state.submitted) return null;
  //   return <Redirect to='/posts/' />;
  // };

  render() {
    return (
      <div className='NewPost'>
        {/* {this.buildRedirect()} */}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type='text'
          value={this.state.title}
          onChange={event => this.setState({ title: event.target.value })}
        />
        <label>Content</label>
        <textarea
          rows='4'
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={event => this.setState({ author: event.target.value })}
        >
          <option value='Homer'>Homer Simpson</option>
          <option value='Marge'>Marge Simpson</option>
        </select>
        <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;
