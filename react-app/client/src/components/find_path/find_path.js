import React, {Component} from 'react';
import './find_path.css';
import HttpServiceClass from '..//..//services/http-services';

let HttpService = new HttpServiceClass();
class Find_path extends Component {
	constructor(props){
		super(props);
		this.state = {data: {}};

		//binds
		this.loadData = this.loadData.bind(this);
	}

	componentDidMount(){
		this.loadData();
	}

	loadData = () => {
		var self = this;
		HttpService.get_instruc().then(data => {
			self.setState({data: data})
		}, err => {}).then(oop => {console.log(this.state.data)});
	}



	render() {
		return (
			<h1>find path</h1>
		);
	}
}

export default Find_path;
