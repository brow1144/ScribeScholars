import React, { Component } from 'react';
import logo from './logo.svg'
import { Route } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import firebase from './base.js';

import './App.css';

class App extends Component {

  onFormSubmit(e) {
    e.preventDefault()

    firebase.auth().signInWithEmailAndPassword(e.target.email.value, e.target.password.value)
      .catch(function(err) {
        // Handle errors
        console.log(err.code)
      });

    console.log(firebase.auth().currentUser.uid);
  }

  render() {
    return (
      <div className="App text-center">
        <Route path='/sign-in' />
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
        </div>
      </div>
    );
  }
}

export default App;
