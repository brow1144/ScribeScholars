import React, { Component } from 'react';

import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { fireauth, googleProvider } from './base.js';
import './SignIn.css';
import logo from './logo.svg'

class SignIn extends Component {

  onFormSubmit = (e) => {
    e.preventDefault()

    fireauth.auth().signInWithEmailAndPassword(e.target.email.value, e.target.password.value)
      .catch(function(err) {
        // Handle errors
        console.log(err.code)
      });

  };

  handleGoogle = () => {
    fireauth.auth().signInWithPopup(googleProvider);
  };

  render() {
    return (
      <div className="App text-center">
        <div className="Absolute-Center is-Responsive">
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
            <FormGroup>
              <Button className="signInButton" size="lg" block>Sign In!</Button>
            </FormGroup>
          </Form>
          <hr />
          <Button onClick={ this.handleGoogle } className="google-button"> <i className="fab fa-google"></i>  Sign in with Google!</Button>
        </div>
      </div>
    );
  }
}

export default SignIn;
