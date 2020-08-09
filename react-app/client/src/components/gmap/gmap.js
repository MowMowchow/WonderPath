/*global google*/
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';
import FindPath from '../find-path/find-path';

class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			directions: null,
            refresh: 1
        };
        
        this.doMap = this.doMap.bind(this);
    }
    

    doMap = () => {
        const find_path_temp = new FindPath();
        const travel_data = find_path_temp.sendData();
        const origin = {lat: travel_data.curr_location_lat, lng: travel_data.curr_location_lng}
        //const origin = "3915 tacc drive, mississauga"
        const destination = {lat: travel_data.curr_destination_lat, lng: travel_data.curr_destination_lng};
        //const destination = {lat: 43.56384330990673, lng: -79.74364589999999};
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
            {
                origin:origin,
                destination: destination,
                travelMode: google.maps.TravelMode.WALKING 
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    }
    

	componentDidMount() {
        this.doMap()

    }


	render() {
		const GoogleMapExample = withGoogleMap((props) => (
			<GoogleMap defaultCenter={{ lat: 40.756795, lng: -73.954298 }} defaultZoom={13}>
				<DirectionsRenderer directions={this.state.directions} />
			</GoogleMap>
		));

		return (
			<div>
				<GoogleMapExample
					containerElement={<div style={{ height: 'calc(100vh - 58.4px)', width: '100%' }} />}
					mapElement={<div style={{ height: '100%' }} />}
				/>
			</div>
		);
	}
}


export default Map;
