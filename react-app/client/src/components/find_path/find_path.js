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


	render() {
		return (
			<div className="container-fluid">
				<div className="row">
          <div className="col-xl-3 col-lg-4 col-md-12 sidebar">
            <div className="row">  {/*narrow button */}
              <div className="col-12 narrow-btn-col">
              <button type="button" className="btn narrow-btn" onClick={this.narrow}>Narrow</button>
              </div>
            </div>

            <div className="row inp-row">
              <form className="new-dist-form">
              <div className="col-lg-4 col-sm-3 col-md-4 col-4 new-dist-inp-col"> {/* new dist inp */}
                  <input type="text" className="new-dist-inp" placeholder="Distance"/>
              </div>
              <div className="col-lg-8 col-sm-9 col-md-8 col-8"> {/* new dist btn */}
                  <input type="text" className="new-address-inp" placeholder="Address"/>
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
          <div className="col-xl-9 col-lg-8 col-md-12"> 
            map
          </div>

				</div>
				

			</div>
			
		);
	}
}

export default Find_path;
