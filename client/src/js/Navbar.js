import React, {Component} from 'react';
import {Link} from "react-router-dom";
import $ from 'jquery';

import '../scss/navbar.scss';

class NavBar extends Component {

    componentDidMount() {
        // Show the navbar when the page is scrolled up
        var MQL = 992;

        //primary navigation slide-in effect
        if ($(window).width() > MQL) {
            var headerHeight = $('#mainNav').height();
            $(window).on('scroll', {
                previousTop: 0
            },
            function() {
                var currentTop = $(window).scrollTop();
                //check if user is scrolling up
                if (currentTop < this.previousTop) {
                //if scrolling up...
                if (currentTop > 0 && $('#mainNav').hasClass('is-fixed')) {
                    $('#mainNav').addClass('is-visible');
                } else {
                    $('#mainNav').removeClass('is-visible is-fixed');
                }
                } else if (currentTop > this.previousTop) {
                //if scrolling down...
                $('#mainNav').removeClass('is-visible');
                if (currentTop > headerHeight && !$('#mainNav').hasClass('is-fixed')) $('#mainNav').addClass('is-fixed');
                }
                this.previousTop = currentTop;
            });
        }
    }

    render() {
        return (
            <div>
                {/* <!-- Navigation --> */}
                <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                    <div className="container">
                    <label className="navbar-brand" href="index.html">Myse1f Blog</label>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/posts">Posts</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="btn btn-primary" to="/newPost">New Post</Link>
                        </li>
                        </ul>
                    </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar;