import React, {Component} from 'react';

import './CreateActivity.css';
import MCQ from './MCQ';

class CreateActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: props.uid,
            role: this.props.role,
        };
    }
    render() {
        return(
            <div>
                <MCQ/>
            </div>
        );


    }
}

export default CreateActivity