import React, { Component } from 'react';

import { fireauth } from '../base.js';

import { NavLink } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import './SignIn.css';
import logo from '../logo.svg';

class SignIn extends Component {

  constructor() {
    super();

    this.state = {
      errorCode: "",
      visible: false,
    };
  }

  onFormSubmit = (ev) => {
    ev.preventDefault();
    let self = this;

    fireauth.signInWithEmailAndPassword(ev.target.email.value, ev.target.password.value)
      .catch(function(err) {
        // Handle errors
        self.setState({
          errorCode: err.message,
          visible: true,
        })

      });
  };

onDismiss = () => {
  this.setState({ visible: false });
};

  render() {
    return (
      <div className="text-center">
        <div className="Absolute-CenterK is-ResponsiveK">
          <Form onSubmit={ this.onFormSubmit }>
            <FormGroup>
              <img src={logo} alt="" width="100" height="100"/>
            </FormGroup>
            <FormGroup>
              <Label mb="3" className="h3 font-weight-normal" for="exampleEmail">Please Sign In</Label>
            </FormGroup>
            <FormGroup>
              <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
            </FormGroup>
            <FormGroup>
              <Input type="password" name="password" id="examplePassword" placeholder="Password" />
            </FormGroup>
            <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
              {this.state.errorCode}
            </Alert>
            <FormGroup>
              <Button className="signInButton" size="lg" block>Sign In!</Button>
            </FormGroup>
          </Form>
          <NavLink style={{ textDecoration: 'none' }} to="/create-account">
            <Button className="createAccountButton" size="lg" block>Sign Up!</Button>
          </NavLink>
          <hr />
        </div>
      </div>
    );
  }
}

export default SignIn;
