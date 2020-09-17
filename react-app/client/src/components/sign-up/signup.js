import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import fapp from '../../base';
import HttpServiceClass from '../../services/http-services';
import './signup.css';
import sign_up from './guy_walking_holding_phone.png';

var HttpService = new HttpServiceClass();

const SignUp = ({ history }) => {
	const handleSignUp = useCallback(
		async (event) => {
			event.preventDefault();
			const { username, email, password } = event.target.elements;

			try {
				await fapp.auth().createUserWithEmailAndPassword(email.value, password.value);
				var temp = {
					username: username.value,
					email: email.value,
					savedpaths: []
				};
				console.log(temp);
				HttpService.send_user_info(temp);
				history.push('/profile');
			} catch (error) {
				alert(error);
			}
		},
		[ history ]
	);

	return (
		<div className="vertical-center">
			<div className="horizontal-center">
				<div className="row signup-container">
					<div className="col-7 signup-pic-col">
						<img src={sign_up} className="signup-pic" alt="sign up" />

						{/* <img src={signup_pic} className="signup-pic" alt="signup" /> */}
					</div>
					<div className="col-5 signup-form-col">
						<div className="signup-form-container-all">
							<div className="signup-form-title-container">
								<h1 className="signup-form-title"> Sign Up </h1>
							</div>
							<div className="signup-form-container">
								<form onSubmit={handleSignUp}>
									<div className="signup-username-container">
										{/* <label htmlFor="signup-email" classname="signup-email-label">
							Email
						</label> */}
										<input
											name="username"
											className="signup-username"
											type="text"
											placeholder="Username"
										/>
									</div>
									<div className="signup-email-container">
										{/* <label htmlFor="signup-email" classname="signup-email-label">
							Email
						</label> */}
										<input name="email" className="signup-email" type="email" placeholder="Email" />
									</div>
									<div className="signup-password-container">
										{/* <label htmlFor="signup-password" classname="signup-password-label">
							Password
						</label> */}
										<input
											name="password"
											className="signup-password"
											type="password"
											placeholder="Password"
										/>
									</div>
									<div className="signup-btn-container">
										<button type="submit" className="signup-btn">
											Sign Up
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(SignUp);
