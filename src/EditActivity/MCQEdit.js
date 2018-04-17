import React, {Component} from 'react';

import {Col, FormGroup, Form, Button, Label, Input} from 'reactstrap';

import '../CreateActivity/MCQForm.css';

class MCQEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQues: this.props.question,
    };
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
      type: "MCQ",
      prompt: ev.target.promptQ.value,
      option1: ev.target.opt1.value,
      option2: ev.target.opt2.value,
      option3: ev.target.opt3.value,
      option4: ev.target.opt4.value,
      correctAns: ans,
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
            <Input bsSize="lg" type="username" name="promptQ" id="exampleNumber" defaultValue={this.state.currentQues.prompt}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label size="lg" for="exampleNumber" sm={3}>Selection 1:</Label>

          <Col sm={6}>
            <Input bsSize="lg" type="username" name="opt1" id="exampleNumber" defaultValue={this.state.currentQues.option1}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label size="lg" for="exampleNumber" sm={3}>Selection 2:</Label>

          <Col sm={6}>
            <Input bsSize="lg" type="username" name="opt2" id="exampleNumber" defaultValue={this.state.currentQues.option2}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label size="lg" for="exampleNumber" sm={3}>Selection 3:</Label>

          <Col sm={6}>
            <Input bsSize="lg" type="username" name="opt3" id="exampleNumber" defaultValue={this.state.currentQues.option3}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label size="lg" for="exampleNumber" sm={3}>Selection 4:</Label>

          <Col sm={6}>
            <Input bsSize="lg" type="username" name="opt4" id="exampleNumber" defaultValue={this.state.currentQues.option4}/>
          </Col>
        </FormGroup>
        <Label for="exampleSelect" style={{fontSize: '1.25rem'}}>Select An Answer</Label>
        <Col sm={4}>
          {this.state.currentQues.correctAns === "option1"
            ?
            <Input bsSize="lg" type="select" name="ans" id="exampleSelect" defaultValue={"Selection 1"}>
              <option>Selection 1</option>
              <option>Selection 2</option>
              <option>Selection 3</option>
              <option>Selection 4</option>
            </Input>
            : this.state.currentQues.correctAns === "option2"
              ?
              <Input bsSize="lg" type="select" name="ans" id="exampleSelect" defaultValue={"Selection 2"}>
                <option>Selection 1</option>
                <option>Selection 2</option>
                <option>Selection 3</option>
                <option>Selection 4</option>
              </Input>
              : this.state.currentQues.correctAns === "option3"
                ?
                <Input bsSize="lg" type="select" name="ans" id="exampleSelect" defaultValue={"Selection 3"}>
                  <option>Selection 1</option>
                  <option>Selection 2</option>
                  <option>Selection 3</option>
                  <option>Selection 4</option>
                </Input>
                :
                <Input bsSize="lg" type="select" name="ans" id="exampleSelect" defaultValue={"Selection 4"}>
                  <option>Selection 1</option>
                  <option>Selection 2</option>
                  <option>Selection 3</option>
                  <option>Selection 4</option>
                </Input>
          }
        </Col>
        <br/>
        <FormGroup row>
          <Label size="lg" for="examplePoints" sm={3}>Points:</Label>

          <Col sm={2}>
            <Input bsSize="lg" type="number" name="points" id="examplePoints" defaultValue={this.state.currentQues.points}/>
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

export default MCQEdit