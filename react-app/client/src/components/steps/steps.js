import React, { Component } from 'react';
import './steps.css';

class Step extends Component {
    constructor(props){
        super (props);
        this.state = {instruc: {}}
    }

    render() {
        return(
            <div className="container-fluid">
            <div className="row">
                <div className="col-12 step-text">
                    {this.props.step.step}
                </div>
            </div>
            
            <div className="row">
                    <div className="col-12 step-dist">
                        <div className="step-dist-text">
                            {this.props.step.step_dist}
                        </div>
                        <div className="step-dist-line"/>
                    </div>
            </div>
            </div>
        );
    }

}

export default Step