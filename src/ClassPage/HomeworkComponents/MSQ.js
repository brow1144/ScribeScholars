import React, {Component} from 'react';

import {Col, FormGroup, Label, Input} from 'reactstrap';

import "../LiveComponents/MCQ.css"


class MSQ extends Component {

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
        <Col sm={{size: 8, offset: 2}}>
          <FormGroup tag={"fieldset"}>
            <legend className={"RadioTitle"}>{this.props.name}: Question {this.props.currentQuestion}</legend>
            <legend className={"RadioTitle"}>{this.props.prompt}</legend>
            <Col>
              <FormGroup>
                <Label className={"RadioLabel"}>
                  <Input onClick={() => this.props.setAns(this.state.opt1)} className={"RadioButton"} type="checkbox"
                         name="radio1"/>{' '}
                  <p className={"textSize"}>{this.props.option1}</p>
                </Label>
              </FormGroup>
              <FormGroup>
                <Label className={"RadioLabel"}>
                  <Input onClick={() => this.props.setAns(this.state.opt2)} className={"RadioButton"} type="checkbox"
                         name="radio2"/>{' '}
                  <p className={"textSize"}>{this.props.option2}</p>
                </Label>
              </FormGroup>
              <FormGroup>
                <Label className={"RadioLabel"}>
                  <Input onClick={() => this.props.setAns(this.state.opt3)} className={"RadioButton textSize"}
                         type="checkbox" name="radio3"/>
                  <p className={"textSize"}>{this.props.option3}</p>
                </Label>
              </FormGroup>
              <FormGroup>
                <Label className={"RadioLabel"}>
                  <Input onClick={() => this.props.setAns(this.state.opt4)}  className={"RadioButton"} type="checkbox"
                         name="radio4"/>
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


export default MSQ