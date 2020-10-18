import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData = async () => {
    if (this.props.match.params.id) {
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost && // eslint-disable-next-line
          this.state.loadedPost.id != this.props.match.params.id)
      ) {
        const response = await axios.get(
          "/posts/" + this.props.match.params.id
        );
        this.setState({ loadedPost: response.data });
      }
    }
  };

  deletePostHandler = async () => {
    const response = await axios.delete("/posts/" + this.props.match.params.id);
    console.log(response);
  };

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.match.params.id)
      post = <p style={{ textAlign: "center" }}>Loading...!</p>;
    if (this.state.loadedPost) {
      post = (
        <div className='FullPost'>
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className='Edit'>
            <button className='Delete' onClick={this.deletePostHandler}>
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
