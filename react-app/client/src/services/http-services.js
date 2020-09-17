import 'whatwg-fetch';
import { Component } from 'react';
const url = 'https://wonderpath-server.herokuapp.com'; 
// http://127.0.0.1:5000
// https://wonderpath-server.herokuapp.com
class HttpServiceClass extends Component {
	constructor(props) {
        super(props);
        
        this.get_instruc.bind(this);
        this.get_instruc2.bind(this);
        this.send_user_info.bind(this);
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

    send_user_info = (inp_json) => {
        var promise = new Promise((resolve, reject) => {
            fetch(url+"/sui", { // Send User Info
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

    save_path = (inp_json) => {
        var promise = new Promise((resolve, reject) => {
            fetch(url+"/savepath", { // Send User Info
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

    
    load_user = (inp_json) => {
        var promise = new Promise((resolve, reject) => {
            fetch(url+"/loaduser", {
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

    delete_path = (inp_json) => {
        var promise = new Promise((resolve, reject) => {
            fetch(url+"/deletepath", {
                method: 'PUT',
			    headers: {
				'Content-Type': 'application/json;charset=utf-8',
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