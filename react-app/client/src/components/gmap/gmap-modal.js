/*global google*/
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';
import Modal from '../saved-path-modal/saved-path-modal';

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
        const find_path_temp = new Modal();
        const travel_data = find_path_temp.sendData();
        const origin = {lat: travel_data.curr_location.lat, lng: travel_data.curr_location.lng}
        const destination = {lat: travel_data.curr_destination.lat, lng: travel_data.curr_destination.lng};
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
					containerElement={<div style={{ height: '80vh', width: '100%' }} />}
					mapElement={<div style={{ height: '100%' }} />}
				/>
			</div>
		);
	}
}


export default Map;
