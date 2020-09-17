import React, { Component } from 'react';
import profile_photo from './profile_photo.png';
import './profile.css';
import fapp from './../../base';
import HttpServiceClass from './../../services/http-services';
import SavedPath from './../saved-path/savedpath';
var HttpService = new HttpServiceClass();

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			savedpaths: [],
			rand: Math.random(),
			savedpathsrender: []
		};

		this.load_user_data = this.load_user_data.bind(this);
		this.load_saved_maps = this.load_saved_maps.bind(this);
		this.refresher = this.refresher.bind(this);
	}

	load_user_data = () => {
		var user = fapp.auth().currentUser;
		var user_email = { email: user.email };
		HttpService.load_user(user_email).then((data) => {
			this.setState({ username: data.username });
			this.setState({ email: data.email });
			this.setState({ savedpaths: data.savedpaths });
		}).then((temp2) => {
			this.setState({savedpathsrender: this.load_saved_maps()});
			console.log(this.state.savedpaths);

		});
		
	};

	refresher = () => {
		this.load_user_data();
	}


	load_saved_maps = () => {
		this.setState({rand: Math.random()});
		const list = this.state.savedpaths.map((path) =>
		<SavedPath email={this.state.email} origin={path.origin} destination={path.destination} time={path.time} distance={path.distance} refresher={this.refresher}/>	
		)
		return list;
	}

	componentDidMount() {
		this.load_user_data();
	}

	render() {
		return (
			<div className="profile-container">
				<div className="profile-row-container">
					<div className="row profile-row">
						<div className="col-5 profile-pic-col">
							<div className="profile-pic-container">
								<img src={profile_photo} className="profile-pic" alt="self-portrait" />
							</div>
						</div>
						<div className="col-7 profile-info-col">
							<ul className="profile-info">
								<li className="profile-user"><h1 className="user-email-label">Username:</h1> {this.state.username}</li>
								<li><h1 className="user-email-label">Email: </h1> {this.state.email}</li>
							</ul>
						</div>
					</div>
					<div className="row saved-paths-header-row">
						<div className="col-12 saved-paths-header-col">
							<h1 className="saved-paths-header">~ Saved Paths ~</h1>
						</div>
					</div>
					<div className="row saved-paths-container">
						{this.state.savedpathsrender}
						{/* make each map comonent a bootstrap row with col in it */}
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;
