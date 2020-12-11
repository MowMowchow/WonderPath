import React, { Component } from 'react';
import './home.css';
import '../../wonderpath_icon/style.css';
import guy_with_map from './guy_with_map.png';
import free_icon from './free_icon.png';
import multiarrow_icon from './multiarrow_icon.png';
import share_icon from './share_icon.png';
import girl_with_phone from './girl_with_phone.png';

// https://wonderpath.herokuapp.com
// http://localhost:3000
const base_url = 'https://wonderpath-server.herokuapp.com'
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
						<div className="col-xl-5 col-lg-6 sec-3-col-left">
						<img className="sec-3-img" src={girl_with_phone} alt="hahaa" />
						</div>
						<div className="col-xl-7 col-lg-6 sec-3-col-right">
							<div className="sec-3-header-block">
								<h1 className="sec-3-header">Simple To Use</h1>
								<p className="sec-3-header-text">WonderPath only requires 3 straightforward steps</p>
							</div>
							<div className="step-block">
								<p className="step-block-text">1) Enter your current/address location</p>
							</div>

							<div className="step-block">
								<p className="step-block-text">2) Enter the distance you want your path to be</p>
							</div>

							<div className="step-block">
								<p className="step-block-text">
									3) Click the dropdown menu to choose the direction of your path{' '}
								</p>
							</div>
						</div>
					</div>

					<div className="row try-now-btn-row">
						<div className="col-12 try-now-btn-col">
						{/* <Link to="/findpath"> */}
						<a href={base_url+'/#/findpath'}><button type="button" className="btn try-now-btn">Try now!</button></a>
						
						{/* </Link> */}
						</div>
					</div>
					
				</div>
			</div>
		);
	}
}

export default Home;
