import React, { Component } from 'react';

import firebase from '../base.js';


import { NavLink } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './SignIn.css';
import logo from '../logo.svg';

class SignIn extends Component {

  onFormSubmit = (ev) => {
    ev.preventDefault();

    firebase.auth().sendPasswordResetEmail(ev.target.email.value)
      .then(function () {
        console.log("Reset Email Sent")
      })
      .catch(function () {
        console.log("Cannot send reset email")
      });
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
              <Label  className="h3 font-weight-normal" for="exampleEmail">Please Enter Your Account Email</Label>
            </FormGroup>
            <FormGroup>
              <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
            </FormGroup>
            <Button className="createAccountButton" type="submit" size="lg" block>Reset Password</Button>
          </Form>
          <hr />
          <NavLink style={{ textDecoration: 'none' }} to="/ScribeScholars/sign-in">
            <Button className="createAccountButton" size="lg" block>Back to Sign In</Button>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default SignIn;
