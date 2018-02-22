import React, { Component } from 'react';

import { fireauth, firestore } from '../base.js';

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

        let firstName = ev.target.firstName.value;
        let lastName = ev.target.lastName.value;
        let email = ev.target.email.value;

        fireauth.createUserAndRetrieveDataWithEmailAndPassword(email,  ev.target.password.value)
            .then( () => {
                self.addInfo(email, firstName, lastName);
            })
            .catch(function(err) {
                self.setState({
                    errorCode: err.message,
                    visible: true,
                })
            });
    };

    addInfo = (email, firstName, lastName) => {
        fireauth.onAuthStateChanged( (user) => {
          if (user) {
            this.setFirebase(user, email, firstName, lastName)
          } else {
            // finished signing out
            this.setState({ uid: null })
          }
        }
      );
    };

    setFirebase = (user, email, firstName, lastName) => {
      let docRef = firestore.collection("users").doc(user.uid);
      docRef.set({
        firstName: firstName,
        lastName: lastName,
        email: email,
      }).then(function() {
        console.log("successfully written!");
      }).catch(function(error) {
        console.log(error);
      });
    };

    onDismiss = () => {
        this.setState({ visible: false });
    };

    render() {
        return (
            <div className="text-center">
                <div className="Absolute-Center is-Responsive">
                    <Form onSubmit={ (ev) => this.onFormSubmit(ev) }>
                        <FormGroup>
                            <img src={logo} alt="" width="100" height="100"/>
                        </FormGroup>
                        <FormGroup>
                            <Label mb="3" className="h3 font-weight-normal" for="exampleFirstName">Create a New Account</Label>
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
                </div>
            </div>
        );
    }
}

export default CreateAccount;