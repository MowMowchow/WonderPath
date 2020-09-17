import React, { Component } from 'react';
import './nav.css';
import { Link } from 'react-router-dom';
import '../../wonderpath_icon/style.css';
import fapp from "./../../base";


// https://wonderpath.herokuapp.com
const base_url = 'http://localhost:3000';
class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			urlloc: window.location.href,
		};

		this.checkroute = this.checkroute.bind(this);	
	}

	checkroute = (route) => {
		this.setState({ urlloc: route });
	};
	

	render() {

		return (
			<nav
				className={
					this.state.urlloc === base_url + '/#/' ? (
						'navbar navbar-expand-lg'
					) : (
						'navbar navbar-expand-lg navbar-og'
					)
				}
				id="mNavbar"
			>
				<a className="nav-logo-text" href={base_url}>
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
						<Link to="/findpath" onClick={() => this.checkroute(base_url + '/#/findpath')}>
							<li className={this.props.loggedin || this.props.loggedout ? "nav-item nav-link" : "nav-item nav-link bye"}>Find Path</li>
						</Link>
						<Link to="/about" onClick={() => this.checkroute(base_url + '/#/about')}>
							<li className={this.props.loggedin || this.props.loggedout ? "nav-item nav-link" : "nav-item nav-link bye"}>About</li>
						</Link>
						<Link to="/login" onClick={() => this.checkroute(base_url + '/#/login')}>
							<li className={this.props.loggedout ? "nav-item nav-link" : "nav-item nav-link bye"}>Login</li>
						</Link>

						<Link to="/profile" onClick={() => this.checkroute(base_url + '/#/profile')}>
							<li className={this.props.loggedin ? "nav-item nav-link profile-nav-tab" : "nav-item nav-link bye"}>Profile</li>
						</Link>

						<a href="/" onClick={() => fapp.auth().signOut()}>
						<li className={this.props.loggedin ? "nav-item nav-link" : "nav-item nav-link bye"}>Sign Out</li>
						</a>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Nav;
