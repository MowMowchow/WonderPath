import React, {Component} from 'react';
import './find_path.css';
import HttpServiceClass from '..//..//services/http-services';
import Step from '..//steps/steps';
import Map from '..//gmap/gmap';
import { withScriptjs } from "react-google-maps";
const MapLoader = withScriptjs(Map);

let HttpService = new HttpServiceClass();
class Find_path extends Component {
	constructor(props){
		super(props);
    this.state = {
      data: {},
      stepsthere: [],
      stepsback: []
    };

		//binds
    this.loadData = this.loadData.bind(this);
    this.show_stepsthere = this.show_stepsthere.bind(this);
    this.show_stepsback = this.show_stepsback.bind(this);
	}

	componentDidMount(){
		this.loadData();
	}

	loadData = () => {
		var self = this;
		HttpService.get_instruc().then(data => {
      self.setState({data: data});
      self.setState({stepsthere: data['instruc_there']})
      self.setState({stepsback: data['instruc_back']})
		}, err => {});
	}


  narrow = () => {
    console.log('Narrow Btn Works');
  }

  calc = () => {
    console.log('Calc Btn Works');
  }

  show_stepsthere = (z) => {
    const list = this.state.stepsthere.map((item) => 
    <Step step={item} />
    )
    return(list);
  }

  show_stepsback = (z) => {
    const list = this.state.stepsback.map((item) => 
    <Step step={item} />
    )
    return(list);
  }

  // initMap = () => {
  //   map = new google.maps.Map(document.getElementById("map"), {
  //     center: { lat: -34.397, lng: 150.644 },
  //     zoom: 8
  //   });
  // }


	render() {
		return (
			<div className="container-fluid find_path-container">
				<div className="row m-0">
          <div className="col-xl-3 col-lg-4 col-md-12 sidebar">
            <div className="row">  {/*narrow button */}
              <div className="col-12 narrow-btn-col">
              <button type="button" className="btn narrow-btn" onClick={this.narrow}>Narrow</button>
              </div>
            </div>

            <div className="row inp-row">
              <form className="new-dist-form">
              <div className="col-lg-5 col-sm-5 col-md-5 col-4 new-dist-inp-col"> {/* new dist inp */}
                  <label htmlFor="dist" className="new-dist-inp-label">{"Distance (km)"}</label>
                  <input name="dist" type="text" className="new-dist-inp" value={this.state.data.curr_dist}/>
              </div>
              <div className="col-lg-7 col-sm-7 col-md-7 col-8 new-address-inp-col"> {/* new dist btn */}
                  <label htmlFor="address" className="new-address-inp-label">Address</label>
                  <input name="address" type="text" className="new-address-inp" value={this.state.data.curr_address}/>
              </div>
              </form>
            </div>
            
            <div className="row">
              <div className="col-12 calc-btn-col">
                <button type="button" className="btn calc-btn" onClick={this.calc}>Calculate New</button>

              </div>
            </div>

            <hr className="seperator-rnd"/>
            
            <div className="row info-dist-time-row">
              <div className="col-2"/>
              <div className="col-4 info-dist-time-col">
                <p className="info-dist-time">{this.state.data.time} </p>
              </div>
              <div className="col-4 info-dist-time-col">
                <p className="info-dist-time">{this.state.data.distance}</p>
              </div>
              <div className="col-2"/>
            </div>

            <hr className="seperator-rnd"/>
    
            <div className="row">
              <div className="col-12">
                <h1 className="steps-title">Steps There</h1>
                {this.show_stepsthere()}
              </div>
            </div>

            <hr className="seperator-rnd"/>
            
            <div className="row">
              <div className="col-12">
              <h1 className="steps-title">Steps Back</h1>
              {this.show_stepsback()}
              </div>
            </div>

            <div className="row">
              <div className="col-12 bottom-spacer"/>
            </div>
          </div>

        

          {/* map */}
          <div className="col-xl-9 col-lg-8 col-md-12 map-container"> 
            <MapLoader
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBTcJcpE8loo8Hmel4kVw5hXa8VOv2FLoo"
              loadingElement={<div style={{ height: `100%` }} />}
            />
          </div>

				</div>
				

			</div>
			
		);
	}
}

export default Find_path;
