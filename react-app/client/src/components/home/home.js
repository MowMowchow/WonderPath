import React, { Component } from 'react';
import './home.css';
import '../../wonderpath_icon/style.css';
import guy_with_map from './guy_with_map_2.png';
import free_icon from './free_icon.png';
import multiarrow_icon from './multiarrow_icon.png';
import share_icon from './share_icon.png';

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

				{/* Section 2 */}

				<div className="sec-2-container">
					<div className="row sec-2-row">
						<div className="col-xl-7 col-lg-6 sec-2-col-left">
							<div className="sec-2-header-block">
								<h1 className="sec-2-header">Routes Made Easy</h1>
								<p className="sec-2-header-text">WonderPath plans your route so you don't have to</p>
							</div>
							<div className="info-block-all">
								<img className="info-icon" src={multiarrow_icon} alt="wasd" />
								<div className="info-block">
									<h2 className="info-block-header">Customizable Direction and Distance</h2>
									<p className="info-block-text">
										WonderPath's dynamic path generation algorithm allows the user to dictate both
										the direction and distance of their route
									</p>
								</div>
							</div>
							<div className="info-block-all">
								<img className="info-icon" src={free_icon} alt="wasd" />
								<div className="info-block">
									<h2 className="info-block-header">Totally Free</h2>
									<p className="info-block-text">
										We believe everyone should be able to enjoy the outdoors free of charge
									</p>
								</div>
							</div>
							<div className="info-block-all">
								<img className="info-icon" src={share_icon} alt="wasd" />
								<div className="info-block">
									<h2 className="info-block-header">Save and Share You Paths With Others</h2>
									<p className="info-block-text">
										Sign up for a free WonderPath account to save your favourite routes and share
										them with your friends
									</p>
								</div>
							</div>
						</div>
						<div className="col-xl-5 col-lg-6 sec-2-col-right">
							<img className="sec-2-img" src={guy_with_map} alt="hahaa" />
						</div>
					</div>
				</div>

				{/*Section 3 */}

				<div className="sec-3-container">
					<div className="row sec-3-row">
						<div className="col-5 sec-3-col-left">hi</div>
						<div className="col-7 sec-3-col-right">bye</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
