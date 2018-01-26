import React, { Component } from 'react';
// import base from './base.js';

import logo from './logo.svg'
import './App.css';

import { Route } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App text-center">
        <Route path='/sign-in' />
        <div className="Absolute-Center is-Responsive">
          <Form>
            <FormGroup>
              <img src={logo} alt="" width="100" height="100"/>
            </FormGroup>
            <FormGroup>
              <Label mb="3" className="h3 font-weight-normal" for="exampleEmail">Please Sign In</Label>
              <h2>{this.state.uid}</h2>
            </FormGroup>
            <FormGroup>
              <Input onChange={this.updateFormU} type="email" name="email" id="exampleEmail" placeholder="Email" />
            </FormGroup>
            <FormGroup>
              <Input onChange={this.updateFormP} type="password" name="password" id="examplePassword" placeholder="Password" />
            </FormGroup>
            <FormGroup>
              <Button onClick={this.handleClick} type="submit" className="signInButton" size="lg" block>Sign In!</Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
