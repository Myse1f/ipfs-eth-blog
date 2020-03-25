import React, {Component} from 'react';

import '../scss/header.scss';

class Header extends Component {

    render() {
      return (
        <div>
            {/* Page header */}
            <header className="masthead" style={{backgroundImage: `url(${this.props.backgroundImg})`}}>
              <div className="overlay"></div>
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 col-md-10 mx-auto">
                    <div className="site-heading">
                      <h1>{this.props.title}</h1>
                      <h2 className="subheading">{this.props.subtitle}</h2>
                      <span className="meta">{this.props.meta}</span>
                    </div>
                  </div>
                </div>
              </div>
            </header>
        </div>
      )
    }
}

export default Header;