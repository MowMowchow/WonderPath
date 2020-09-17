import React, { Component } from 'react';
import './saved-path.css';
import HttpServiceClass from './../../services/http-services';

var HttpService = new HttpServiceClass();

class SavedPath extends Component {
	constructor(props) {
		super(props);
		this.state = {
			origin: '',
			destination: ''
		};
		this.do1 = this.do1.bind(this);
	}

	do1 = (param, callback1) => {
    HttpService.delete_path(param)
    .then((temp2) => callback1());
	};

	delete = (event) => {
		var temp = {
			email: this.props.email,
			info: {
				origin: this.props.origin,
				destination: this.props.destination,
				time: this.props.time,
				distance: this.props.distance
			}
		};
		this.do1(temp, this.props.refresher);
	};

	render() {
		return (
			<div className="row saved-paths-row">
				<div className="col-3 location-marker-col">
					<div className="location-marker-container">
						<i className="fas fa-map-marker-alt location-marker" />
					</div>
				</div>
				<div className="col-8 saved-path-info-col">
					<div className="row dist-time-row">
						<div className="col-6">
							<h3 className="dist-time-txt">
								{' '}
								<p className="dist-time-label">Distance: </p> {this.props.distance}{' '}
							</h3>
						</div>
						<div className="col-6">
							<h3 className="dist-time-txt">
								{' '}
								<p className="dist-time-label">Time: </p> {this.props.time}{' '}
							</h3>
						</div>
					</div>
					<div className="row org-row">
						<div className="col-12">
							<h3 className="org-txt">
								{' '}
								<p className="org-label"> Origin: </p> {this.props.origin}{' '}
							</h3>
						</div>
					</div>
					<div className="row dest-row">
						<div className="col-12">
							<h3 className="dest-txt">
								{' '}
								<p className="dest-label"> Destination: </p> {this.props.destination}{' '}
							</h3>
						</div>
					</div>
				</div>
				<div className="col-1 delete-btn-col">
					<button type="button" className="delete-btn" onClick={this.delete}>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
			</div>
		);
	}
}

export default SavedPath;
