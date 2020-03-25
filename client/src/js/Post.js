import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Header from "./Header";
import { Modal } from 'antd';

import PostImg from "../img/post.jpg"

import "../scss/post.scss";
import { getPost, deletePost } from "./blogUtils";

class Post extends Component {
  auth = false;

  constructor(props) {
    super(props);
    
    this.state = {
      confirmLoading: false,
      visible: false,
      post: {meta:{}}
    }

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    if (process.env.NODE_ENV === "development") {
      this.auth = this.props.account === process.env.REACT_APP_DEV_PUBKEY;
    } else {
      this.auth = this.props.account === process.env.REACT_APP_PROD_PUBKEY;
    }
  }

  async componentDidMount() {
    this.node.scrollIntoView();

    const hash = this.props.match.params.hash;
    const post = await getPost(this.props.ipfs, hash);

    this.setState({ post });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleEdit = () => {
    const { history } = this.props;
    const { hash }  = this.props.match.params;

    this.props.editPost(this.state.post);

    history.push(`/edit/${hash}`);
  }

  handleDelete = async () => {
    const { history, contract, account, ipfs, oldBlog } = this.props;
    const { hash } =  this.props.match.params;
    this.setState({
      confirmLoading: true
    });
    const posts = await deletePost(contract, account, ipfs, hash, oldBlog);
    this.props.handleUpdate(posts);
    this.setState({
      confirmLoading: false
    },
    () =>history.push("/posts"));
  }

  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  render() {
    const { visible, confirmLoading, post } = this.state;
    const { meta } = post;
    let dateStr = null;
    if (meta.pubtime) {
      const date = new Date(meta.pubtime);
      dateStr = `Posted on ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    }
    return (
      <div ref={node => this.node = node}>
        <Header backgroundImg={this.props.backgroundImgUrl || PostImg} title={meta.title||"Loading"} subtitle={meta.subtitle} meta={dateStr} />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div dangerouslySetInnerHTML={{ __html: post.content }}>
              </div>
              <div className="btn-group clearfix">
                <button type="button" onClick={e => this.handleEdit()} className="btn btn-primary mr-1 float-left" disabled={!this.auth}>编辑</button>
                <button type="button" onClick={e => this.showModal()} className="btn btn-danger mr-1 float-left" disabled={!this.auth}>删除</button>
              </div>
              <Modal
                title="提示"
                visible={visible}
                okText="确认"
                okType="danger"
                cancelText="取消"
                onOk={this.handleDelete}
                onCancel={this.handleCancel}
                confirmLoading={confirmLoading}
              >
                <p>确认删除这篇文章？</p>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Post);

export class PostPreview extends Component {

  render() {
    const post = this.props.post;
    const date = new Date(post.pubtime);
    return (
      <div className="post-preview" key={post.id}>
        <Link to={`/post/${post.hash}`}>
          <h2 className="post-title">
            {post.title}
          </h2>
          <h3 className="post-subtitle">
            {post.subtitle}
          </h3>
        </Link>
        <p className="post-meta">Posted on {date.getDate()}/{date.getMonth()}/{date.getFullYear()} </p>
        <hr />
      </div>
    );
  }
}
