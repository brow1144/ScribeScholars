import React, { Component } from 'react';

import { Nav, NavLink, Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom'
import {firestore} from "../../base";


const MCQ = (props) => {

  return (
    <FormGroup tag={"fieldset"}>
      <legend className={"RadioTitle"}>#1 This Is The Question Header?</legend>
      <Col sm={{size: 10}}>
        <FormGroup>
          <Label className={"RadioLabel"}>
            <Input className={"RadioButton"} type="radio" name="radio1"/>{' '}
            <p>`oh hey bud ${props.question}`</p>
          </Label>
        </FormGroup>
        <FormGroup>
          <Label className={"RadioLabel"}>
            <Input className={"RadioButton"} type="radio" name="radio1"/>{' '}
            <p>Possible Answer Number 2</p>
          </Label>
        </FormGroup>
        <FormGroup>
          <Label className={"RadioLabel"}>
            <Input className={"RadioButton"} type="radio" name="radio1"/>
            <p>Possible Answer Number 3</p>
          </Label>
        </FormGroup>
        <FormGroup>
          <Label className={"RadioLabel"}>
            <Input className={"RadioButton"} type="radio" name="radio1"/>
            <p>Possible Answer Number 3</p>
          </Label>
        </FormGroup>
      </Col>
    </FormGroup>
  )

}


export default MCQ