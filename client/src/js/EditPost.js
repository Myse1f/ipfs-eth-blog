import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import Header from "./Header";
import { editPost } from "./blogUtils";
import PostEditor from "./PostEditor";

class EditPost extends Component {

  auth = false;

  constructor(props) {
    super(props);

    this.state = {
      post: null
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
    const { hash } = this.props.match.params;

    const posts = await editPost(contract, account, ipfs, post, hash, oldBlog);

    // update App data
    await this.props.handleUpdate(posts);

    // return redirect path to posts 
    return `/posts`;
  }

  render() {
    return (
      <div ref={node => this.node = node}>
        { this.auth ? 
          <div className="full-background"><PostEditor handleSubmit={this.handleSubmit} post={this.props.post}/></div> :
          <Header title="Unauthoried" subtitle="Only blog owner can edit a post"/>
        }
      </div>
    );
  }
}

export default withRouter(EditPost);