import 'whatwg-fetch';
import { Component } from 'react';
const url = 'https://wonderpath-server.herokuapp.com'; 

class HttpServiceClass extends Component {
	constructor(props) {
        super(props);
        
        this.get_instruc.bind(this);
    }

    get_instruc = () => {
        var promise = new Promise((resolve, reject) => {
            fetch(url+"/").then((res) => {
                resolve(res.json());
            });
        });
        return promise;
    }

    
    get_instruc2 = (inp_json) => {
        var promise = new Promise((resolve, reject) => {
            fetch(url+"/get-steps", {
                method: 'POST',
			    headers: {
				'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(inp_json)

            }).then((res) => {
                resolve(res.json());
            });
        });
        return promise;
    }

    
}

export default HttpServiceClass;