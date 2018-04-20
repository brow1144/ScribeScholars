import React, { Component } from 'react';

import { Col, FormGroup, Input } from 'reactstrap';


class FIB extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        if(this.props.finalPage === false) {
            return (
                <Col>
                    <br/>
                    <FormGroup tag={"fieldset"}>
                        <legend className={"RadioTitle"}>{this.props.prompt}</legend>
                        <Col sm={{size: 10, offset: 1}}>
                            <Input onChange={(ev) => this.props.setFIB(ev.target.value)} value={this.props.frqResponse}
                                    type="username"
                                   name="here" id="exampleText"/>
                            <br />
                        </Col>
                    </FormGroup>
                </Col>


            );
        }
        else {
            return (
                <Col sm={{size: 10, offset: 1}}>
                    <h3>End of the assignment</h3>
                </Col>
            )
        }
    }
}

export default FIB