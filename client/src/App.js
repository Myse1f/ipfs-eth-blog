import React, { Component } from "react";
import BlogStorageContract from "./contracts/BlogStorage.json";
import getWeb3 from "./js/getWeb3";
import ipfsClient from "ipfs-http-client";
import truffleContract from "@truffle/contract";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {getBlogRoot} from "./js/blogUtils";

import NavBar from "./js/Navbar"
import Posts from "./js/Posts";
import Footer from "./js/Footer";
import Home from "./js/Home";
import About from "./js/About";
import Header from "./js/Header";
import Post from "./js/Post";
import NewPost from "./js/NewPost";

import notfoundImg from "./img/404.png";
import EditPost from "./js/EditPost";

class App extends Component {
  state = {ipfs: null, bloghash: null, posts: [], post: null}

  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
    this.editPost = this.editPost.bind(this);
  } 

  handleUpdate = async (posts) => {
    this.setState({ posts });
  }

  editPost = (post) => {
    this.setState({post: post});
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      const ipfs = ipfsClient(process.env.REACT_APP_IPFS_API);
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = BlogStorageContract.networks[networkId];
      const contract = truffleContract({abi: BlogStorageContract.abi});
      contract.setProvider(web3.currentProvider);
      const instance = await contract.at(deployedNetwork.address);

      // Get blog 
      const bloghash = await instance.get();
      const blog = await getBlogRoot(ipfs, bloghash);
      const posts = blog.posts;
      
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ account: accounts[0], ipfs, blog, contract: instance, posts });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.blog) {
      return <div>Loading Blog from Ethereum And IPFS...</div>;
    }
    return (
      <div>
        <NavBar/>
        <Switch>
          <Route exact path="/">
            <Home ipfs={this.state.ipfs} posts={this.state.posts}/>
          </Route>
          <Route path="/home">
            <Home ipfs={this.state.ipfs} posts={this.state.posts}/>
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/posts">
            <Posts ipfs={this.state.ipfs} posts={this.state.posts}/>
          </Route>
          <Route path="/post/:hash">
            <Post 
              contract={this.state.contract} 
              account={this.state.account} 
              ipfs={this.state.ipfs}
              oldBlog={this.state.blog}
              handleUpdate={this.handleUpdate}
              editPost={this.editPost}
              />
          </Route>
          <Route path="/edit/:hash">
            <EditPost 
              contract={this.state.contract} 
              account={this.state.account} 
              ipfs={this.state.ipfs}
              oldBlog={this.state.blog}
              handleUpdate={this.handleUpdate}
              post={this.state.post}
              />
          </Route>
          <Route path="/newPost">
            <NewPost 
              contract={this.state.contract} 
              account={this.state.account} 
              ipfs={this.state.ipfs} 
              oldBlog={this.state.blog}
              handleUpdate={this.handleUpdate}
              />
          </Route>
          <Route path="*">
            <Header backgroundImg={notfoundImg}/>
          </Route>
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default function() {
  return (<BrowserRouter><App/></BrowserRouter>)
}
