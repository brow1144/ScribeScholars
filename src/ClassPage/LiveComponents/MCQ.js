import React, {Component} from 'react';

import {Col, FormGroup, Label, Input} from 'reactstrap';

import "./MCQ.css"


class MCQ extends Component {

  constructor(props) {
    super(props);

    this.state = {
      opt1: "option1",
      opt2: "option2",
      opt3: "option3",
      opt4: "option4",
    }
  }

  render() {
    if (this.props.finalPage === false) {
      return (
        <Col sm={{size: 10, offset: 1}}>
          <FormGroup tag={"fieldset"}>
            <legend className={"RadioTitle"}>{this.props.name}: Question {this.props.currentQuestion}</legend>
            <legend className={"RadioTitle"}>{this.props.prompt}</legend>
            <Col sm={{size: 10, offset: 1}}>
              <FormGroup>
                <Label className={"RadioLabel"}>
                  <Input onClick={() => this.props.setAns(this.state.opt1)} checked={this.props.oldAns === "option1"} className={"RadioButton"} type="radio"
                         name="radio1"/>{' '}
                  <p className={"textSize"}>{this.props.option1}</p>
                </Label>
              </FormGroup>
              <FormGroup>
                <Label className={"RadioLabel"}>
                  <Input onClick={() => this.props.setAns(this.state.opt2)} checked={this.props.oldAns === "option2"} className={"RadioButton"} type="radio"
                         name="radio1"/>{' '}
                  <p className={"textSize"}>{this.props.option2}</p>
                </Label>
              </FormGroup>
              <FormGroup>
                <Label className={"RadioLabel"}>
                  <Input onClick={() => this.props.setAns(this.state.opt3)} checked={this.props.oldAns === "option3"} className={"RadioButton textSize"}
                         type="radio" name="radio1"/>
                  <p className={"textSize"}>{this.props.option3}</p>
                </Label>
              </FormGroup>
              <FormGroup>
                <Label className={"RadioLabel"}>
                  <Input onClick={() => this.props.setAns(this.state.opt4)} checked={this.props.oldAns === "option3"} className={"RadioButton"} type="radio"
                         name="radio1"/>
                  <p className={"textSize"}>{this.props.option4}</p>
                </Label>
              </FormGroup>
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


export default MCQ