import React, {Component} from 'react';

import {Col, FormGroup, Form, Button, Label, Input} from 'reactstrap';

import '../CreateActivity/SMQForm.css';

class SMQEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question,
    }

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
      points: parseInt(ev.target.points.value),
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
            <Input bsSize="lg" type="username" name="promptQ" id="exampleNumber" defaultValue={this.state.question.prompt}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label size="lg" for="exampleNumber" sm={3}>Selection 1:</Label>
          <Col sm={6}>
            <Input bsSize="lg" type="username" name="opt1" id="exampleNumber" defaultValue={this.state.question.option1}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label size="lg" for="exampleNumber" sm={3}>Selection 2:</Label>
          <Col sm={6}>
            <Input bsSize="lg" type="username" name="opt2" id="exampleNumber" defaultValue={this.state.question.option2}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label size="lg" for="exampleNumber" sm={3}>Selection 3:</Label>
          <Col sm={6}>
            <Input bsSize="lg" type="username" name="opt3" id="exampleNumber" defaultValue={this.state.question.option3}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label size="lg" for="exampleNumber" sm={3}>Selection 4:</Label>
          <Col sm={6}>
            <Input bsSize="lg" type="username" name="opt4" id="exampleNumber" defaultValue={this.state.question.option4}/>
          </Col>
        </FormGroup>
        <Label for="exampleSelect" style={{fontSize: '1.25rem'}}>Enter all answers separated by commas (Eg "1, 3, 4"):</Label>
        <Col sm={4}>
          <Input bsSize="lg" type="username" name="ans" id="exampleSelect" defaultValue={this.state.question.correctAns}/>
        </Col>
        <br/>
        <FormGroup row>
          <Label size="lg" for="examplePoints" sm={3}>Points:</Label>

          <Col sm={2}>
            <Input bsSize="lg" type="number" name="points" id="examplePoints" defaultValue={this.state.question.points}/>
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

export default SMQEdit