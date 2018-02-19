import React, { Component } from 'react';

import { fireauth } from '../base.js'

import { Form, FormGroup, Input, Button, } from 'reactstrap';
import './CreateClass.css'
import logo from '../logo.svg'

class CreateClass extends Component {
  constructor(){
    super();

    this.handleInput = this.handleInput.bind(this);

    this.state = {
      uid: '',
      code: '',
      password: '',
      codeValid: false,
      passwordValid: false,
      formValid: false,
    };
  }

  onFormSubmit = (ev) => {
    ev.preventDefault();
  }

  handleInput = (e) => {
    console.log("handle change called");
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
      () => {this.validateField(name, value)});
  }

  validateField(fieldName, value) {
    if(fieldName === 'password'){
      this.setState({passwordValid: true});
      return;
    }

    else if(fieldName === 'code'){
      let ret = false;
      const len = this.state.code.length;
      if(len === 6) ret = true;
      this.setState({emailValid: ret}, this.validateForm);
    }
  }

  validateForm(){
    this.setState({formValid: this.state.codeValid && this.state.passwordValid});
  }


  //TODO Add input labels
  render() {
    return (
      <div className="text-center">
        <div className ="Absolute-Center is-Responsive">
          <Form onSubmit={this.onFormSubmit}>
            <img src={logo} alt="" width="100" height="100"/>
            <h3 className = "h3 font-weight-normal">Create New Class</h3>
            <div className="form-group">
              <Input name="code" type="text" placeholder="Enter 6 digit class code"
                value={this.state.code}
                onChange={this.handleInput}
              />
            </div>
            <div className = "form-group">
              <Input name="password" type="password"  placeholder="Enter your password"
                value={this.state.password}
                onChange={this.handleInput}
              />
            </div>
            <Button type="submit" className="createClassButton" size ="lg" block>Create Class!</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default CreateClass;