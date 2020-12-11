import React, { Component } from 'react';
import './profile.css';
import fapp from './../../base';
import HttpServiceClass from './../../services/http-services';
import SavedPath from './../saved-path/savedpath';

var HttpService = new HttpServiceClass();
var profile_photo_url;
var profile_photo_id;

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
		this.changeProfilePhoto = this.changeProfilePhoto.bind(this);
	}


	// profile stuff
	load_user_data = () => {
		var user = fapp.auth().currentUser;

		var user_email = { email: user.email };
		HttpService.load_user(user_email)
			.then((data) => {
				this.setState({ username: data.username });
				this.setState({ email: data.email });
				this.setState({ savedpaths: data.savedpaths });
				profile_photo_url = data.profile_photo_url;
				profile_photo_id = data.profile_photo_id;
			})
			.then((temp2) => {
				this.setState({ savedpathsrender: this.load_saved_maps() });
				console.log(this.state.savedpaths);
			});
	};

	changeProfilePhoto = (e) => {
		var user = fapp.auth().currentUser;

		if (e.target.files){
			const file = e.target.files[0];
			const storageRef = fapp.storage().ref();
			const fileRef = storageRef.child(file.name);
			const oldFileRef = storageRef.child(profile_photo_id);
			oldFileRef.delete();
			fileRef.put(file).then(() => {
				fileRef.getDownloadURL().then((url) => {
					profile_photo_url = url;
				}).then(() => {
					var send_url = {
						profile_photo_url: profile_photo_url, 
						profile_photo_id: storageRef.child(file.name).location.path, 
						email: user.email };
					HttpService.save_profile_photo_link(send_url);
					this.refresher();
				});
			});
		}
	};

	refresher = () => {
		this.load_user_data();
	};

	load_saved_maps = () => {
		this.setState({ rand: Math.random() });
		const list = this.state.savedpaths.map((path) => (
			<SavedPath
				email={this.state.email}
				origin={path.origin}
				destination={path.destination}
				time={path.time}
				distance={path.distance}
				lat_a={path.lat_a} 
				lat_b={path.lat_b} 
				lng_a={path.lng_a} 
				lng_b={path.lng_b} 
				refresher={this.refresher}
			/>
		));
		return list;
	};

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
							<img src={profile_photo_url} className="profile-pic" alt="self-portrait" />
							</div>

							<div className="profile-pic-edit">
							<input id="change-profile-pic-btn" title="wasd" type="file" onChange={this.changeProfilePhoto}/>
							<label for="change-profile-pic-btn" className="change-profile-pic-label">Edit Profile Photo</label>
							</div>
						</div>
						
						<div className="col-7 profile-info-col">
							<ul className="profile-info">
								<li className="profile-user">
									<h1 className="user-email-label">Username:</h1> {this.state.username}
								</li>
								<li>
									<h1 className="user-email-label">Email: </h1> {this.state.email}
								</li>
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
