import React, { Component } from 'react';

import { fireauth, googleProvider } from './base.js';

import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import './SignIn.css';
import logo from './logo.svg';

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
        //console.log(err.message);

        self.setState({
          errorCode: err.message,
          visible: true,
        })

      });
  };

  handleGoogle = () => {
    fireauth.auth().signInWithPopup(googleProvider);
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
          <hr />
          <Button onClick={ this.handleGoogle } className="google-button"> <i className="fab fa-google"></i>  Sign in with Google!</Button>
        </div>
      </div>
    );
  }
}

export default SignIn;
