import React, { Component } from 'react';

import { firestore, fireauth, googleProvider } from '../base.js';

import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import './CreateAccount.css';
import logo from '../logo.svg';

class CreateAccount extends Component {
    constructor() {
        super();

        this.state = {
            errorCode: "",
            visible: false,
            uid: null,
        };
    }

    onFormSubmit = (ev) => {
        ev.preventDefault();
        let self = this;

        fireauth.createUserAndRetrieveDataWithEmailAndPassword(ev.target.email.value, ev.target.password.value)
            .then( (credential) => {
                alert(credential.user.uid);

                //this.addInfo(ev, credential.user.uid);
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

        //this.getUserFromLocalStorage();

    };

    /*addInfo = () => {
      fireauth.onAuthStateChanged( (user) => {
          if (user) {
            // finished signing in
            this.authHandler(user)
          } else {
            // finished signing out
            this.setState({ uid: null })
          }
        }
      )
      let docRef = firestore.collection("users").doc(uid);
      docRef.set({
        firstName: ev.target.firstName.value,
        lastName: ev.target.lastName.value,
        email: ev.target.email.value
      }).then(function() {
        console.log("successfully written!");
      }).catch(function(error) {
        console.log("error");
      });
    };*/

    handleGoogle = () => {
        fireauth.auth().signInWithPopup(googleProvider);
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
                            <Input type="firstName" name="firstName" id="exampleFirstName" placeholder="First Name" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="lastName" name="lastName" id="exampleLastName" placeholder="Last Name" />
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
                            <Button className="createAccountButton" size="lg" block>Create Account!</Button>
                        </FormGroup>
                    </Form>
                    <hr />
                    <Button onClick={ this.handleGoogle } className="google-button"> <i className="fab fa-google"></i>  Sign in with Google!</Button>
                </div>
            </div>
        );
    }
}

export default CreateAccount;