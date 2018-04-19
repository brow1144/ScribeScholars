import React, {Component} from 'react';

import {Col, FormGroup, Form, Button, Label, Input} from 'reactstrap';

import '../CreateActivity/MCQForm.css';

class MCQGame extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    onFormSubmit = (ev) => {
        ev.preventDefault();

        let ans;
        switch (ev.target.ans.value) {
            case "Selection 1":
                ans = "option1";
                break;
            case "Selection 2":
                ans = "option2";
                break;
            case "Selection 3":
                ans = "option3";
                break;
            default:
                ans = "option4";
        }
        let quest = {
            prompt: ev.target.promptQ.value,
            option1: ev.target.opt1.value,
            option2: ev.target.opt2.value,
            option3: ev.target.opt3.value,
            option4: ev.target.opt4.value,
            correctAns: ans,
            strAns: ev.target.points.value,
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
                <Label for="exampleSelect" style={{fontSize: '1.25rem'}}>Select An Answer</Label>
                <Col sm={4}>
                    <Input bsSize="lg" type="select" name="ans" id="exampleSelect">
                        <option>Selection 1</option>
                        <option>Selection 2</option>
                        <option>Selection 3</option>
                        <option>Selection 4</option>
                    </Input>
                </Col>
                <br/>
                <FormGroup row>
                  <Label size="lg" for="examplePoints" sm={3}>Enter the Correct Answer:</Label>

                  <Col sm={2}>
                    <Input bsSize="lg" type="username" name="points" id="examplePoints"/>
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

export default MCQGame