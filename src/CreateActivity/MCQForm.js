import React, {Component} from 'react';

import {Col, FormGroup, Form, Button, Label, Input} from 'reactstrap';

import './MCQForm.css';

class MCQForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    onFormSubmit = (ev) => {
        ev.preventDefault();
        console.log(this.props.question);

    };

    render() {
        return (
            <Form onSubmit={this.onFormSubmit} style={{paddingLeft: '1rem'}}>
                <br/>
                <FormGroup row>
                    <Label size="lg" for="exampleNumber" sm={2}>Question Prompt:</Label>

                    <Col sm={6}>
                        <Input bsSize="lg" type="username" name="promptQ" id="exampleNumber"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label size="lg" for="exampleNumber" sm={2}>Selection 1:</Label>

                    <Col sm={6}>
                        <Input bsSize="lg" type="username" name="opt1" id="exampleNumber"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label size="lg" for="exampleNumber" sm={2}>Selection 2:</Label>

                    <Col sm={6}>
                        <Input bsSize="lg" type="username" name="opt2" id="exampleNumber"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label size="lg" for="exampleNumber" sm={2}>Selection 3:</Label>

                    <Col sm={6}>
                        <Input bsSize="lg" type="username" name="opt3" id="exampleNumber"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label size="lg" for="exampleNumber" sm={2}>Selection 4:</Label>

                    <Col sm={6}>
                        <Input bsSize="lg" type="username" name="opt4" id="exampleNumber"/>
                    </Col>
                </FormGroup>
                <Label for="exampleSelect" style={{fontSize: '1.25rem'}}>Select An Answer</Label>
                <Col sm={4}>
                    <Input bsSize="lg" type="select" name="ans" id="exampleSelect">
                        <option>Selection 1</option>
                        <option>Selection 2</option>
                        <option>Selection 3</option>
                        <option>Selection 4</option>
                    </Input>
                </Col>
                {/*
                <Label size="lg" for="exampleText" sm={6}>Selection 1:</Label>

                <FormGroup row>
                    <Col sm={10}>
                        <Input bsSize="lg" type="textarea" name="descriptText" id="exampleText"/>
                    </Col>
                </FormGroup>*/}
                <br/>
                <FormGroup check>
                    <Col sm={{size: 10}}>
                        <Button color={"secondary"} size={"lg"} block>Save Question</Button>
                    </Col>
                </FormGroup>
            </Form>

        );
    }
}

export default MCQForm