import React, { Component } from 'react';

import { Col, FormGroup, Label, Input } from 'reactstrap';

import './FRQ.css';

class FRQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return(
            <FormGroup tag={"fieldset"}>
                <FormGroup row>
                    <Col sm={"6"}>
                        <Label className={"FRQTitle"} for="exampleText">#2 Free Response Question Goes Here</Label>
                        <Input style={{height: '20rem'}} type="textarea" name="text" id="exampleText" />
                    </Col>
                </FormGroup>
            </FormGroup>

        );
    }
}

export default FRQ