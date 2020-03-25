import React, {Component} from "react";
import Header from "./Header";
import {PostPreview} from "./Post";

import postsImg from "../img/blog-post.png";
import { getAllPosts } from "./blogUtils";

class PostPage extends Component {
  pageNum = 5; // post number in a page
  pageShow = 5; // page numbers in pagination

  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      curPage: 1,
      totalPages: 1,
      postsShow: []
    }

    this.gotoPage = this.gotoPage.bind(this);
    this.search = this.search.bind(this);
  }

  async componentDidMount() {
    const posts = await getAllPosts(this.props.ipfs, this.props.posts);
    this.setState({ 
      allPosts: posts,
      posts,
      totalPages: parseInt((posts.length-1) / this.pageNum) + 1,
      postsShow: posts.slice(0, this.pageNum),
    });
    this.props.cancelLoading();
  }

  gotoPage(page) {
    const { posts } = this.state;
    const postsShow = posts.slice((page-1)*this.pageNum, page*this.pageNum);
    this.setState({
      curPage: page,
      postsShow: postsShow,
      totalPages: parseInt((posts.length-1) / this.pageNum) + 1,
    });
  }

  search(keyword) {
    const { allPosts } = this.state;
    let posts = allPosts;

    if (keyword) {
      // ignore case
      const re = new RegExp(`${keyword}`, 'i');
      console.log(re)
      posts = posts.filter(post => 
        (post.title.match(re) || (post.subtitle && post.subtitle.match(re)))
      );
      console.log(posts)
    }
    
    this.setState({
      posts: posts
    }, () => this.gotoPage(1));

  }

  render() {
    // make current page in the middle of pagination
    var begin, end;
    var half = parseInt(this.pageShow/2);
    if (this.state.curPage - half <= 0) {
      begin = 1;
      end = this.pageShow < this.state.totalPages ? this.pageShow : this.state.totalPages;
    } else {
      if (this.state.curPage + half > this.state.totalPages) {
        begin = this.state.totalPages - this.pageShow + 1 > 0 ? this.state.totalPages - this.pageShow + 1 : 1;
        end = this.state.totalPages;
      } else {
        begin = this.state.curPage - half;
        end = this.state.curPage + half;
      }
    }
    var pages = [];
    for (var i=begin; i<=end; i++) {
      pages.push(i);
    }

    return (
      <div className="container" id="posts">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            {this.state.postsShow.map(
              (post) => (
                <PostPreview post={post} key={post.id}/>
              )
            )}
            <div className="clearfix">
              {/* search */}
              <input className="input" onChange={e => this.search(e.target.value)} placeholder="search keyword" />
              {/* pagination */}
              <ul className="pagination float-right">
                <li className={`page-item ${this.state.curPage === 1 ? 'disabled': ''}`} key="first">
                  <a className="page-link" href="#posts" onClick={() => this.gotoPage(1)}>&laquo;</a>
                </li>
                <li className={`page-item ${this.state.curPage === 1 ? 'disabled': ''}`} key="prev">
                  <a className="page-link" href="#posts" onClick={() => this.gotoPage(this.state.curPage-1)}>prev</a>
                </li>
                {
                  pages.map(page => (
                    <li className={`page-item ${this.state.curPage === page ? 'active': ''}`} key={page}>
                      <a className="page-link" href="#posts" onClick={() => this.gotoPage(page)}>{page}</a>
                    </li>
                  ))
                }
                <li className={`page-item ${this.state.curPage === this.state.totalPages ? 'disabled': ''}`} key="next">
                  <a className="page-link" href="#posts" onClick={() => this.gotoPage(this.state.curPage+1)}>next</a>
                </li>
                <li className={`page-item ${this.state.curPage === this.state.totalPages ? 'disabled': ''}`} key="last">
                  <a className="page-link" href="#posts" onClick={() => this.gotoPage(this.state.totalPages)}>&raquo;</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  )};
}

class Posts extends Component {

  state = {loading : true}

  constructor(props) {
    super(props);

    this.cancelLoading = this.cancelLoading.bind(this);
  }

  cancelLoading = () => {
    this.setState({loading: false});
  }

  componentDidMount() {
    this.node.scrollIntoView();
  }

  render() {
    return (
      <div ref={node => this.node = node}>
        <Header title={this.state.loading?"Loading":"All Posts"} backgroundImg={postsImg}/>
        <PostPage ipfs={this.props.ipfs} posts={this.props.posts} cancelLoading={this.cancelLoading} />
      </div>
    )};
}

export default Posts;