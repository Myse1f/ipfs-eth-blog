import React, {Component} from "react";

import "../scss/footer.scss";

class Footer extends Component {
  render() {
      return (
        <footer>
          <hr/>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <ul className="list-inline text-center">
                  <li className="list-inline-item">
                    <a href={process.env.REACT_APP_MY_WEIXIN}>
                      <span className="fa-stack fa-lg">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fab fa-weixin fa-stack-1x fa-inverse"></i>
                      </span>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href={process.env.REACT_APP_MY_WEIBO}>
                      <span className="fa-stack fa-lg">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fab fa-weibo fa-stack-1x fa-inverse"></i>
                      </span>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href={process.env.REACT_APP_MY_GITHUB}>
                      <span className="fa-stack fa-lg">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                      </span>
                    </a>
                  </li>
                </ul>
                <p className="copyright text-muted">Copyright &copy; Myse1f 2020</p>
              </div>
            </div>
          </div>
        </footer>
      );
  }
}

export default Footer;