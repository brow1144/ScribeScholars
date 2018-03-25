import React, { Component } from 'react';

import {Col, FormGroup, Label, Input, Card} from 'reactstrap';

import {firestore} from "../../base";

import "./MCQ.css"

const MCQ = (props) => {

  return (

      <FormGroup tag={"fieldset"}>
        <legend className={"RadioTitle"}>{props.name}: Question {props.currentQuestion}</legend>
        <legend className={"RadioTitle"}>{props.prompt}</legend>
        <Col sm={{size: 10, offset: 1}}>
          <FormGroup>
            <Label className={"RadioLabel"}>
              <Input className={"RadioButton"} type="radio" name="radio1"/>{' '}
              <p className={"textSize"}>{props.option1}</p>
            </Label>
          </FormGroup>
          <FormGroup>
            <Label className={"RadioLabel"}>
              <Input className={"RadioButton"} type="radio" name="radio1"/>{' '}
              <p className={"textSize"}>{props.option2}</p>
            </Label>
          </FormGroup>
          <FormGroup>
            <Label className={"RadioLabel"}>
              <Input className={"RadioButton textSize"} type="radio" name="radio1"/>
              <p className={"textSize"}>{props.option3}</p>
            </Label>
          </FormGroup>
          <FormGroup>
            <Label className={"RadioLabel"}>
              <Input className={"RadioButton"} type="radio" name="radio1"/>
              <p className={"textSize"}>{props.option4}</p>
            </Label>
          </FormGroup>
        </Col>
      </FormGroup>

  )

}


export default MCQ