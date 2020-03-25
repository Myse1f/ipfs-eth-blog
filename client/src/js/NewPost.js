import React, { Component } from "react";
import PostEditor from "./PostEditor";
import Header from "./Header";
import { addNewPost } from "./blogUtils";


class NewPost extends Component {
  auth = false;

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    if (process.env.NODE_ENV === "development") {
      this.auth = this.props.account === process.env.REACT_APP_DEV_PUBKEY;
    } else {
      this.auth = this.props.account === process.env.REACT_APP_PROD_PUBKEY;
    }
  }

  componentDidMount() {
    this.node.scrollIntoView();
  }

  handleSubmit = async (post) => {
    const { contract, account, ipfs, oldBlog } = this.props;

    const posts = await addNewPost(contract, account, ipfs, post, oldBlog);

    // update App data
    await this.props.handleUpdate(posts);

    // return redirect path to post 
    return `/posts`;
  }

  render() {
    return (
      <div ref={node => this.node = node}>
        { this.auth ? 
          <div className="full-background"><PostEditor handleSubmit={this.handleSubmit} /></div> :
          <Header title="Unauthoried" subtitle="Only blog owner can write a new post"/>
        }
      </div>
    );
  }
}

export default NewPost;

