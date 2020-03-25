import React, { Component } from "react";
import {Link} from "react-router-dom";
import Header from "./Header";
import {PostPreview} from "./Post";
import {getLatestPosts} from "./blogUtils";

import homeImg from '../img/home-bg.jpg';

class PostProfile extends Component {

  render() {
      return (
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                {this.props.posts.map(
                  (post) => (
                    <PostPreview post={post} key={post.id}/>
                  )
                )}
                <div className="clearfix">
                  <Link className="btn btn-primary float-right" to="/posts">Older Posts &rarr;</Link>
                </div>
              </div>
            </div>
          </div>
      );
  }
}

class Home extends Component {
  state = {
    latestPosts: [],
    loading: true
  }

  async componentDidMount() {
    this.node.scrollIntoView();

    const latestPosts = await getLatestPosts(this.props.ipfs, this.props.posts);
    this.setState({
      latestPosts,
      loading: false
    });
  }
  
  render() {
    return (
      <div  ref={node => this.node = node}>
        <Header backgroundImg={homeImg} title={this.state.loading?"Loading":"Myse1f"} subtitle="Welcome to my blog"/>
        <PostProfile posts={this.state.latestPosts}/>
      </div>
    );
  }
}

export default Home;

