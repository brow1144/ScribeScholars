import React, {Component} from 'react';

import {Col, FormGroup, Label, Input} from 'reactstrap';

import "../LiveComponents/MCQ.css"


class MSQ extends Component {

  constructor(props) {
    super(props);

    this.state = {
      opt1: "1",
      opt2: "2",
      opt3: "3",
      opt4: "4",
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
                  <Input onClick={() => this.props.selectMulti(this.state.opt1)} className={"RadioButton"} type="checkbox"
                         name="radio1" checked={this.props.multiHist[0] === "1"}/>{' '}
                  <p className={"textSize"}>{this.props.option1}</p>
                </Label>
              </FormGroup>
              <FormGroup>
                <Label className={"RadioLabel"}>
                  <Input onClick={() => this.props.selectMulti(this.state.opt2)} className={"RadioButton"} type="checkbox"
                         name="radio2" checked={this.props.multiHist[1] === "2"}/>{' '}
                  <p className={"textSize"}>{this.props.option2}</p>
                </Label>
              </FormGroup>
              <FormGroup>
                <Label className={"RadioLabel"}>
                  <Input onClick={() => this.props.selectMulti(this.state.opt3)} className={"RadioButton textSize"}
                         type="checkbox" name="radio3" checked={this.props.multiHist[2] === "3"}/>
                  <p className={"textSize"}>{this.props.option3}</p>
                </Label>
              </FormGroup>
              <FormGroup>
                <Label className={"RadioLabel"}>
                  <Input onClick={() => this.props.selectMulti(this.state.opt4)}  className={"RadioButton"} type="checkbox"
                         name="radio4" checked={this.props.multiHist[3] === "4"}/>
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