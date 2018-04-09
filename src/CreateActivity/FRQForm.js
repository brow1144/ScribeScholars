import React, { Component } from 'react';

import { Col, FormGroup, Label, Input, Form, Button} from 'reactstrap';

import './FRQForm.css';

class FRQForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    onFormSubmit = (ev) => {
        ev.preventDefault();
        let quest = {
            type: "FRQ",
            prompt: ev.target.promptQ.value,
            points: parseInt(ev.target.points.value),
        };

        this.props.recordQuestion(quest, this.props.index);
    };


    render() {
        return(
            <Form onSubmit={this.onFormSubmit} style={{paddingLeft: '1rem'}}>
                <br/>
                <FormGroup row>
                    <Label size="lg" for="exampleNumber" sm={3}>Question Prompt:</Label>

                    <Col sm={6}>
                        <Input bsSize="lg" type="username" name="promptQ" id="exampleNumber"/>
                    </Col>
                </FormGroup>
                <br/>
                <FormGroup row>
                  <Label size="lg" for="examplePoints" sm={3}>Points:</Label>

                  <Col sm={2}>
                    <Input bsSize="lg" type="number" name="points" id="examplePoints" defaultValue="1"/>
                  </Col>
                </FormGroup>
                <br/>
                <FormGroup check style={{paddingLeft: '0'}}>
                    <Col sm={{size: 6, offset: 3}} style={{paddingLeft: '0'}}>
                        <Button color={"secondary"} size={"lg"} block>Save Question</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default FRQForm