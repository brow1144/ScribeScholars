import React, { Component } from 'react';

import { firestore, fireauth } from '../base.js';

import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import './ResetPassword.css';
import logo from '../logo.svg';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorCode: "",
      visible: false,
      uid: props.uid,
    };
  }

  onFormSubmit = (ev) => {
    ev.preventDefault();
    let self = this;

      fireauth.confirmPasswordReset(null, ev.target.newPassword)
        .catch(function(err) {
          //handle errors
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
        <div className="Absolute-Center is-Responsive">
          <Form onSubmit={ this.onFormSubmit }>
            <FormGroup>
              <img src={logo} alt="" width="100" height="100"/>
            </FormGroup>
            <FormGroup>
              <Label mb="3" className="h3 font-weight-normal" for="exampleNewPassword">Reset Password</Label>
            </FormGroup>
            <FormGroup>
              <Input type="newPassword" name="newPassword" id="exampleNewPassword" placeholder="New Password" />
            </FormGroup>
            <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
              {this.state.errorCode}
            </Alert>
            <FormGroup>
              <Button className="resetPasswordButton" size="lg" block>Reset Password</Button>
            </FormGroup>
          </Form>
          <hr />
        </div>
      </div>
    );
  }
}

export default ResetPassword;
