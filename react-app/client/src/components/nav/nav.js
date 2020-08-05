import React, { Component } from 'react';
import './nav.css';
import { Link } from 'react-router-dom';

class Nav extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg">
				<a className="navbar-brand" href="#">
					WonderPath
				</a>
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
							<a className="nav-link">
								<li className="nav-item">Find Path</li>
							</a>
						</Link>
						<Link to="/about">
							<a className="nav-link">
								<li className="nav-item">About</li>
							</a>
						</Link>
						<Link to="/signup">
							<a className="nav-link">
								<li className="nav-item">Sign Up</li>
							</a>
						</Link>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Nav;
