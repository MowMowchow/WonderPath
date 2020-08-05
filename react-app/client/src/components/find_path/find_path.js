import React, {Component} from 'react';
import './find_path.css';
import HttpServiceClass from '..//..//services/http-services';
import Step from '..//steps/steps';

let HttpService = new HttpServiceClass();
class Find_path extends Component {
	constructor(props){
		super(props);
    this.state = {
      data: {},
      stepsthere: []};

		//binds
    this.loadData = this.loadData.bind(this);
    this.showsteps = this.showsteps.bind(this);
	}

	componentDidMount(){
		this.loadData();
	}

	loadData = () => {
		var self = this;
		HttpService.get_instruc().then(data => {
      self.setState({data: data});
      self.setState({stepsthere: data['instruc_there']})
		}, err => {}).then(oop => {console.log(this.state.stepsthere)});
	}


  narrow = () => {
    console.log('hihi');
  }

  showsteps = () => {
    const list = this.state.stepsthere.map((item) => 
    <Step step={item} />
    )
    return(list);
  }


	render() {
		return (
			<div className="container-fluid">
				<div className="row">
          <div className="col-xl-2 col-lg-3 col-md-12">
            <div className="row">  {/*narrow button */}
              <div className="col-12 narrow-btn-col">
              <button type="button" className="btn narrow-btn" onClick={this.narrow}>Narrow</button>
              </div>
            </div>

            <div className="row">
              <form className="new-dist-form">
              <div className="col-lg-4 col-sm-3 col-md-4 new-dist-inp-col"> {/* new dist inp */}
                  <input type="text" className="new-dist-inp"/>
              </div>
              <div className="col-lg-8 col-sm-9 col-md-8 calc-btn-col"> {/* new dist btn */}
              <button type="button" className="btn calc-btn" onClick={this.narrow}>Calculate New</button>
              </div>
              </form>
            </div>

            <hr class="seperator-rnd"/>
            
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

            <hr class="seperator-rnd"/>
    
            <div className="row">
              <div className="col-12">
                steps there
                {this.showsteps()}
              </div>
            </div>

            <hr class="seperator-rnd"/>
            
            <div className="row">
              <div className="col-12">
                steps back

              </div>
            </div>


          </div>


          {/* map */}
          <div className="col-xl-10 col-lg-9 col-md-12"> 
            map
          </div>

				</div>
				

			</div>
			
		);
	}
}

export default Find_path;
