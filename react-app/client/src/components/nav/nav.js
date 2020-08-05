import React, { Component } from 'react';
import './nav.css';
import { Link } from 'react-router-dom';

class Nav extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg">
				<Link to="/">
					<p className="nav-item navbar-nav">
						WonderPath
					</p>

				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNavAltMarkup"
					aria-controls="navbarNavAltMarkup"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon">o/c</span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<ul className="navbar-nav">
						<Link to="/findpath">
								<li className="nav-item nav-link">Find Path</li>
						</Link>
						<Link to="/about">
								<li className="nav-item nav-link">About</li>
						</Link>
						<Link to="/signup">
								<li className="nav-item nav-link">Sign Up</li>
						</Link>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Nav;
