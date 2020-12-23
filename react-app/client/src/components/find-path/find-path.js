import React, { Component } from 'react';
import './find-path.css';
import HttpServiceClass from '../../services/http-services';
import Step from '../steps/steps';
import Map from '../gmap/gmap';
import { withScriptjs } from 'react-google-maps';
import fapp from './../../base';

var curr_location;
var curr_distance;
var t_curr_destination_lat;
var t_curr_destination_lng;
var t_curr_location_lat;
var t_curr_location_lng;

let HttpService = new HttpServiceClass();

class FindPath extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			stepsthere: [],
			stepsback: [],
			curr_address: '',
			dest_address: ''
		};

		//binds
		this.loadData = this.loadData.bind(this);
		this.show_stepsthere = this.show_stepsthere.bind(this);
		this.show_stepsback = this.show_stepsback.bind(this);
		this.sendData = this.sendData.bind(this);
		this.calc = this.calc.bind(this);
		this.redoMap = this.redoMap.bind(this);
		this.save_path = this.save_path.bind(this);
	}

	loadData = () => {
		var self = this;
		var temp = {
			curr_location: curr_location,
			curr_distance: curr_distance
		};
		HttpService.get_instruc2(temp)
			.then(
				(data) => {
					self.setState({
						data: data,
						stepsthere: data['instruc_there'],
						stepsback: data['instruc_back'],
						dest_address: data['dest_address'],
						curr_address: data['curr_address']
					});
					t_curr_location_lat = this.state.curr_address.lat;
					t_curr_location_lng = this.state.curr_address.lng;
					t_curr_destination_lat = this.state.dest_address.lat;
					t_curr_destination_lng = this.state.dest_address.lng;
				},
				(err) => {}
			)
			.then((temp1) => {
				this.redoMap();
			});
	};

	sendData = () => {
		const temp = {
			curr_location_lat: t_curr_location_lat,
			curr_location_lng: t_curr_location_lng,
			curr_destination_lat: t_curr_destination_lat,
			curr_destination_lng: t_curr_destination_lng
		};
		return temp;
	};

	redoMap = () => {
		var MapLoader = withScriptjs(Map);
		return (
			<MapLoader
				googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB4kJ6nBlKfHG1aZg7x7x_ZvIIhGvvSqck"
				loadingElement={<div style={{ height: `100%` }} />}
			/>
		);
	};

	narrow = () => {
		console.log('Narrow Btn Works');
	};

	calc = (event) => {
		console.log('Calc Btn Works');
		event.preventDefault();
		this.loadData();
	};

	inp_change = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		if (nam === 'curr_location') {
			curr_location = val;
		} else if (nam === 'curr_distance') {
			curr_distance = val;
		}
	};

	show_stepsthere = () => {
		const list = this.state.stepsthere.map((item) => <Step step={item} />);
		return list;
	};

	show_stepsback = () => {
		const list = this.state.stepsback.map((item) => <Step step={item} />);
		return list;
	};

	save_path = (event) => {
		var user = fapp.auth().currentUser;

		if (!user) {
			alert('Please Sign In to Save a Path');
		} else {
			// send shit through http service
			var temp = {
				email: user.email, // how to find email
				coors: {
					lat_a: t_curr_location_lat,
					lng_a: t_curr_location_lng,
					lat_b: t_curr_destination_lat,
          lng_b: t_curr_destination_lng,
          origin: '',
          destination: '',
          distance: this.state.data.distance,
          time: this.state.data.time
        },
        
      };
      console.log(temp);

			if (temp.coors.lat_a === null || temp.coors.lng_a === null || temp.coors.lat_b === null || temp.coors.lng_b == null) {
				alert('Please Calculate a Path Before Saving');
			} else {
				HttpService.save_path(temp);

				console.log('Save Btn Works');
				event.preventDefault();
			}
		}
	};

	render() {
		return (
			<div className="container-fluid find_path-container">
				<div className="row m-0">
					<div className="col-xl-3 col-lg-4 col-md-12 sidebar">
						<div className="row">
							{' '}
							{/*narrow button */}
							{/* <div className="col-6 narrow-btn-col">
								<button type="button" className="btn narrow-btn" onClick={this.narrow}>
									Narrow
								</button>
							</div> */}
							<div className="col-12 save-btn-col">
								<button type="button" className="btn save-btn" onClick={this.save_path}>
									Save Path
								</button>
							</div>
						</div>
						<form className="new-dist-form" onSubmit={this.calc}>
							<div className="row inp-row">
								<div className="col-lg-5 col-sm-5 col-md-5 col-4 new-dist-inp-col">
									{' '}
									{/* new dist inp */}
									<label htmlFor="curr_distance" className="new-dist-inp-label">
										{'Distance (km)'}
									</label>
									<input
										name="curr_distance"
										type="text"
										className="new-dist-inp"
										onChange={this.inp_change}
									/>
								</div>
								<div className="col-lg-7 col-sm-7 col-md-7 col-8 new-address-inp-col">
									{' '}
									{/* new dist btn */}
									<label htmlFor="curr_location" className="new-address-inp-label">
										Address
									</label>
									<input
										name="curr_location"
										type="text"
										className="new-address-inp"
										onChange={this.inp_change}
									/>
								</div>
							</div>

							<div className="row calc-btn-row">
								<div className="col-12 calc-btn-col">
									<button type="submit" className="btn calc-btn" onClick={this.calc}>
										Calculate New
									</button>
								</div>
							</div>
						</form>
						<hr className="seperator-rnd" />

						<div className="row info-dist-time-row">
							<div className="col-2" />
							<div className="col-4 info-dist-time-col">
								<p className="info-dist-time">{this.state.data.time} </p>
							</div>
							<div className="col-4 info-dist-time-col">
								<p className="info-dist-time">{this.state.data.distance}</p>
							</div>
							<div className="col-2" />
						</div>

						<hr className="seperator-rnd" />

						<div className="row">
							<div className="col-12">
								<h1 className="steps-title">Steps There</h1>
								{this.show_stepsthere()}
							</div>
						</div>

						<hr className="seperator-rnd" />

						<div className="row">
							<div className="col-12">
								<h1 className="steps-title">Steps Back</h1>
								{this.show_stepsback()}
							</div>
						</div>

						<div className="row">
							<div className="col-12 bottom-spacer" />
						</div>
					</div>

					{/* map */}
					<div className="col-xl-9 col-lg-8 col-md-12 map-container">{this.redoMap()}</div>
				</div>
			</div>
		);
	}
}

export default FindPath;
