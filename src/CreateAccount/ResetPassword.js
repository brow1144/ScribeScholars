import React, { Component } from 'react';

import { fireauth } from '../base.js';

import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import './CreateAccount.css';
import logo from '../logo.svg';
import {firestore} from "../base";

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

    fireauth.createUserAndRetrieveDataWithEmailAndPassword(ev.target.email.value, ev.target.password.value)
      .then( (credential) => {
        alert(credential.user.uid);

        this.addInfo(ev, credential.user.uid);
      })
      .catch(function(err) {
        // Handle errors
        //console.log(err.message);
        //let errCode = err.code;
        //let errMessage = err.message;
        /*if (errCode !== 'auth/weak-password') {
            alert(errMessage);
        } else {
            alert('The password is too weak.');
        }*/
        //console.log(err);

        self.setState({
          errorCode: err.message,
          visible: true,
        })
      });


  };

  getClasses = () => {
    let docRef = firestore.collection("users").doc(this.state.uid);
    let self = this;

    docRef.get().then(function(doc) {
      if (doc.exists) {
        self.setState({
          classes: doc.data().classes,
        });
        self.getDeadlines();
      } else {
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    })
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
              <Label mb="3" className="h3 font-weight-normal" for="exampleEmail">Create a New Account</Label>
            </FormGroup>
            <FormGroup>
              <Input type="newPassword" name="newPassword" id="exampleNewPassword" placeholder="New Password" />
            </FormGroup>
            <FormGroup>
              <Input type="confirmNewPassword" name="confirmNewPassword" id="exampleConfirmNewPassword" placeholder="Confirm New Password" />
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
