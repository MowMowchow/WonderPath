import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HttpServiceClass from './../../services/http-services';
import './saved-path-modal.css';

import Step from '../steps/steps';
import { withScriptjs } from 'react-google-maps';
import Map from '../gmap/gmap-modal';

var HttpService = new HttpServiceClass();
var curr_location;
var curr_destination;
var curr_distance;
var t_curr_destination_lat;
var t_curr_destination_lng;
var t_curr_location_lat;
var t_curr_location_lng;

class Modal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {},
			stepsthere: [],
			stepsback: [],
			curr_address: '',
			dest_address: '',
			showcounter: 0
		};

		this.onClose = this.onClose.bind(this);
		this.loadData = this.loadData.bind(this);
		this.show_stepsthere = this.show_stepsthere.bind(this);
		this.show_stepsback = this.show_stepsback.bind(this);
		this.sendData = this.sendData.bind(this);
		this.redoMap = this.redoMap.bind(this);
		this.loadData();
	}

	onClose = (e) => {
		this.props.onClose && this.props.onClose(e);
	};

	// modal map
	loadData = () => {
		// call this when modawl is clicked
		var self = this;

		var temp = {
			// curr_location: {'lat', 'lng'} }-> assign to curr_location
			curr_location: curr_location,
			curr_destination: curr_destination,
			curr_destination: curr_destination
		};
		HttpService.get_instruc3(temp).then(
			(data) => {
				self.setState({
					data: data,
					stepsthere: data['instruc_there'],
					stepsback: data['instruc_back'],
					dest_address: data['dest_address'],
					curr_address: data['curr_address']
				});
				console.log('Data', data);
				t_curr_location_lat = this.state.curr_address.lat;
				t_curr_location_lng = this.state.curr_address.lng;
				t_curr_destination_lat = this.state.dest_address.lat;
				t_curr_destination_lng = this.state.dest_address.lng;
			},
			(err) => {}
		);
	};

	sendData = () => {
		const temp = {
			curr_location: curr_location,
			curr_destination: curr_destination
		};
		return temp;
	};

	redoMap = () => {
		console.log("loading map", this.maploaded);
			var MapLoader = withScriptjs(Map);
			return (
				<MapLoader
					googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDKLHPlzvh5J-4sJgnvRmYi7OXryBAyK6w"
					loadingElement={<div style={{ height: `100%` }}/>}
				/>
			);
		// }
	};

	show_stepsthere = () => {
		const list = this.state.stepsthere.map((item) => <Step step={item} />);
		return list;
	};

	show_stepsback = () => {
		const list = this.state.stepsback.map((item) => <Step step={item} />);
		return list;
	};

	componentWillReceiveProps() {
		curr_location = { lat: this.props.lat_a, lng: this.props.lng_a };
		curr_destination = { lat: this.props.lat_b, lng: this.props.lng_b };
		console.log('RECIEVING PROPS');
		this.loadData();
	}

	render() {
		if (!this.props.show) {
			return null;
		} else {

			return (
				
				<div className="modal">
					<section className="modal-main">
						<div className="row">
							<button
								className="modal-exit-btn"
								onClick={(e) => {
									this.props.showModal();
								}}
							>
								X
							</button>
							<div className="col-4 modal-sidebar">
								<div className="row modal-info-dist-time-row">
									<div className="col-2" />
									<div className="col-4 modal-info-dist-time-col">
										<p className="modal-info-dist-time">{this.state.data.time} </p>
									</div>
									<div className="col-4 modal-info-dist-time-col">
										<p className="modal-info-dist-time">{this.state.data.distance}</p>
									</div>
									<div className="col-2" />
								</div>

								<hr className="modal-seperator-rnd" />

								<div className="row">
									<div className="col-12">
										<h1 className="modal-steps-title">Steps There</h1>
										{this.show_stepsthere()}
									</div>
								</div>

								<hr className="modal-seperator-rnd" />

								<div className="row">
									<div className="col-12">
										<h1 className="modal-steps-title">Steps Back</h1>
										{this.show_stepsback()}
									</div>
								</div>

								<div className="row">
									<div className="col-12 modal-bottom-spacer" />
								</div>
							</div>

							<div className="col-8 modal-map-container">
								{this.redoMap()}
								<div>{this.props.children}</div>
							</div>
						</div>
					</section>
				</div>
			);
		}
	}
}

export default Modal;
