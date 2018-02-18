import React, { Component } from 'react';

import { fireauth } from '../base.js'

import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import './CreateClass.css'
import logo from '../logo.svg'

class CreateClass extends Component {
  constructor(){
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      uid: null,
      value: null
    };
  }

  onFormSubmit = (ev) => {
    ev.preventDefault();
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  validate() {
    const len = this.state.value.length;
    if(len != 6) return 'warning';
    else return 'success';
  }

  render() {
    return (
      <Form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.validate()}
        >
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter 6 digit class code"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
      </Form>
    );
  }
}

export default CreateClass;