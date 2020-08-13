import React, { Component } from 'react';
import './home.css';
import '../../wonderpath_icon/style.css';
var ReactRotatingText = require('react-rotating-text');

class Home extends Component {
	render() {
		return (
			<div className="container-fluid ">
				<div id="particles-js">
					<div className="hero-container">
						<div className="row logo-row">
							<div className="col-lg-5 logo-col">
								<span className="icon-wonderpath_logo_map-1 logo" />
							</div>
							<div className="col-lg-7 slogan-col">
								<div className="row slogan-row-top">
									<div className="col-12 slogan-col-top">
										<h1 className="slogan-top-text">
											Start
											<ReactRotatingText
												items={[ ' Walking', ' Biking', ' Running', ' Moving' ]}
											/>
										</h1>
									</div>
								</div>
								<div className="row slogan-row-bottom">
									<div className="col-12 slogan-col-bottom">
										<h1 className="slogan-bottom-text">With WonderPath</h1>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
