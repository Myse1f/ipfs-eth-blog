import React, {Component} from 'react';
import Header from './Header';

import aboutImg from '../img/about-bg.jpg';

class About extends Component {
  
  componentDidMount() {
    this.node.scrollIntoView();
  }

  render() {
      return (
        <div ref={node => this.node = node}>
        <Header backgroundImg={aboutImg} title="About Me" subtitle="This is what I do"/>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <p>A postgraduate student studying in Zhejiang University.</p>
              <p>Major in Computer Tecnology. Interested in java beckend, blockchain, and decentralized storage(eg. IPFS).</p>
              <p>This blog is developed by Ethereum and IPFS!</p>
            </div>
          </div>
        </div>
      </div>);
  }
}

export default About;