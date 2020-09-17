import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { withRouter, Redirect } from 'react-router';
import fapp from '../../base.js';
import { AuthContext } from '../../auth.js';
import './login.css';
import login_pic from './guy_holding_phone_with_nav.png';

const Login = ({ history }) => {
	const handleLogin = useCallback(
		async (event) => {
			event.preventDefault();
			const { email, password } = event.target.elements;
			try {
				await fapp.auth().signInWithEmailAndPassword(email.value, password.value);
				history.push('/profile');
			} catch (error) {
				alert(error);
			}
		},
		[ history ]
	);

	const { currentUser } = useContext(AuthContext);

	if (currentUser) {
		return <Redirect to="/profile" />;
	}

	return (
		<div className="vertical-center">
			<div className="horizontal-center">
				<div className="row login-container">
					<div className="col-7 login-pic-col">
						<img src={login_pic} className="login-pic" alt="login" />
					</div>
					<div className="col-5 login-form-col">
						<div className="login-form-container-all">
							<div className="login-form-title-container">
								<h1 className="login-form-title"> Login </h1>
							</div>
							<div className="login-form-container">
								<form onSubmit={handleLogin}>
									<div className="login-email-container">
										{/* <label htmlFor="login-email" classname="login-email-label">
							Email
						</label> */}
										<input name="email" className="login-email" type="email" placeholder="Email" />
									</div>
									<div className="login-password-container">
										{/* <label htmlFor="login-password" classname="login-password-label">
							Password
						</label> */}
										<input
											name="password"
											className="login-password"
											type="password"
											placeholder="Password"
										/>
									</div>
									<div className="login-btn-container">
										<button type="submit" className="login-btn">
											Log in
										</button>
									</div>
								</form>
							</div>
							<div className="signup-link-container">
								<Link className="signup-link" to="/signup">
									Don't Have an Account?
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Login);
