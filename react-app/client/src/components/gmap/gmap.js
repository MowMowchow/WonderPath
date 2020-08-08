/*global google*/
import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";


class Map extends Component {
  state = {
    directions: null
  };

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();

    const origin = { lat: 43.545900, lng: -79.743670 };
    const destination = { lat: 43.56384330990673, lng: -79.74364589999999 };

    directionsService.route(
      {
        origin: origin,
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

  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
        defaultZoom={13}
      >
        <DirectionsRenderer
          directions={this.state.directions}
        />
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: "calc(100vh - 58.4px)", width: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div>
    );
  }
}

export default Map;
