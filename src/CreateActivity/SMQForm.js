import React, {Component} from 'react';

import {Col, FormGroup, Form, Button, Label, Input} from 'reactstrap';

import './SMQForm.css';

class SMQForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    onFormSubmit = (ev) => {
        ev.preventDefault();

        //let ans = ev.target.ans.value.split(", ");

        let quest = {
            type: "SMQ",
            prompt: ev.target.promptQ.value,
            option1: ev.target.opt1.value,
            option2: ev.target.opt2.value,
            option3: ev.target.opt3.value,
            option4: ev.target.opt4.value,
            correctAns: ev.target.ans.value,
            points: parseInt(ev.target.points.value, 10),
        };

        this.props.recordQuestion(quest, this.props.index);
    };

    render() {
        return (
            <Form onSubmit={this.onFormSubmit} style={{paddingLeft: '1rem'}}>
                <br/>
                <FormGroup row>
                    <Label size="lg" for="exampleNumber" sm={3}>Question Prompt:</Label>

                    <Col sm={6}>
                        <Input bsSize="lg" type="username" name="promptQ" id="exampleNumber"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label size="lg" for="exampleNumber" sm={3}>Selection 1:</Label>

                    <Col sm={6}>
                        <Input bsSize="lg" type="username" name="opt1" id="exampleNumber"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label size="lg" for="exampleNumber" sm={3}>Selection 2:</Label>

                    <Col sm={6}>
                        <Input bsSize="lg" type="username" name="opt2" id="exampleNumber"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label size="lg" for="exampleNumber" sm={3}>Selection 3:</Label>

                    <Col sm={6}>
                        <Input bsSize="lg" type="username" name="opt3" id="exampleNumber"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label size="lg" for="exampleNumber" sm={3}>Selection 4:</Label>

                    <Col sm={6}>
                        <Input bsSize="lg" type="username" name="opt4" id="exampleNumber"/>
                    </Col>
                </FormGroup>
                <Label for="exampleSelect" style={{fontSize: '1.25rem'}}>Enter all answers separated by commas (Eg "1, 3, 4"):</Label>
                <Col sm={4}>
                    <Input bsSize="lg" type="username" name="ans" id="exampleSelect"/>
                </Col>
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

export default SMQForm