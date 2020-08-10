import React, { Component } from 'react';
import './nav.css';
import { Link } from 'react-router-dom';

class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = { urlloc: window.location.href };
	  }

	checkroute = (route) => {
		this.setState({urlloc: route});
	}

	
	render() {
		
		return (
			<nav className={this.state.urlloc === 'http://localhost:3000/#/' ? "navbar navbar-expand-lg" : "navbar navbar-expand-lg navbar-og"} id="mNavbar">
				{/* <Link to="/ref" onClick={() => this.checkroute('http://localhost:3000/#/ref')}> */}
					<a className="nav-logo navbar-nav" href="http://localhost:3000">
						WonderPath
					</a>

				{/* </Link> */}

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
						<Link to="/findpath"  onClick={() => this.checkroute('http://localhost:3000/#/findpath')}>
								<li className="nav-item nav-link">Find Path</li>
						</Link>
						<Link to="/about"  onClick={() => this.checkroute('http://localhost:3000/#/about')}>
								<li className="nav-item nav-link">About</li>
						</Link>
						<Link to="/signup"  onClick={() => this.checkroute('http://localhost:3000/#/signup')}>
								<li className="nav-item nav-link">Sign Up</li>
						</Link>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Nav;
