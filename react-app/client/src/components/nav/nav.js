import React, {Component} from 'react';
import './nav.css';
import { Link } from 'react-router-dom';

class Nav extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<a className="navbar-brand" href="google.ca">
					Navbar
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNavAltMarkup"
					aria-controls="navbarNavAltMarkup"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span classNameName="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div className="navbar-nav">
						<a className="nav-item nav-link active" href="google.ca">
							Home <span className="sr-only">(current)</span>
						</a>
						<a className="nav-item nav-link" href="google.ca">
							Features
						</a>
						<a className="nav-item nav-link" href="google.ca">
							Pricing
						</a>
						<a className="nav-item nav-link disabled" href="google.ca">
							Disabled
						</a>
					</div>
				</div>
			</nav>
		);
	}
}

export default Nav;
