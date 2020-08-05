import React, { Component } from 'react';
import './steps.css';

class Step extends Component {
    constructor(props){
        super (props);
        this.state = {instruc: {}}
    }





    render() {
        return(
            <div className="row">
                <div className="col-12">
                    {this.props.step.step}
                </div>
            </div>
            
            <div className="row">
                    <div className="col-2"/>
                    <div className="col-10">
                    {this.props.step.step_dist}
                    </div>
            </div>
            
        );
    }

}

export default Step