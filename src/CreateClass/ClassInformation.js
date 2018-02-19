import React, { Component } from 'react';

import { fireauth } from '../base.js'

import { Form, FormGroup, Input, Button } from 'reactstrap';
import logo from '../logo.svg'

class ClassInformation extends Component {

  constructor(){
    super();

    this.state = {
      uid: ''
    };
  }

  onFormSubmit = (ev) => {}

  validateForm = () => {}

  render() {
    return (
      <Form onSubmit={this.onFormSubmit}>
        <img src={logo} alt="" width="100" height="100"/>
        <h3 className = "h3 font-weight-normal">Enter Class Information</h3>
      </Form>
    )
  }
}

export default ClassInformation;