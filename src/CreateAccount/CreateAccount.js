import React, { Component } from 'react';

import { fireauth, firestore } from '../base.js';

import { Form, FormGroup, Label, Input, Button, Alert, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './CreateAccount.css';
import logo from '../logo.svg';

class CreateAccount extends Component {
    constructor() {
        super();

        this.toggle = this.toggle.bind(this);

        this.state = {
            errorCode: "",
            visible: false,
            dropdownOpen: false,
            role: null,
            uid: null,
        };
    }

    onFormSubmit = (ev) => {
        ev.preventDefault();
        let self = this;

        let firstName = ev.target.firstName.value;
        let lastName = ev.target.lastName.value;
        let email = ev.target.email.value;

        if (self.state.role === null) {
          self.setState({
            errorCode: "Please select an account type",
            visible: true,
          });
        } else {
          fireauth.createUserAndRetrieveDataWithEmailAndPassword(email, ev.target.password.value)
            .then(() => {
              self.addInfo(email, firstName, lastName);
            }).catch(function(err) {
              self.setState({
                errorCode: err.message,
                visible: true,
              })
            });
        }
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
        role: this.state.role,
      }).then(function() {
        console.log("successfully written!");
      }).catch(function(error) {
        console.log(error);
      });
    };

    onDismiss = () => {
        this.setState({ visible: false });
    };

    toggle() {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen,
      })
    }

    selectRole(name) {
      this.setState({
        role: name,
      })
    }

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
                        <FormGroup>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle caret color="secondary">
                                    Account Type
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => this.selectRole("student")}>
                                        Student
                                    </DropdownItem>
                                    <DropdownItem onClick={() => this.selectRole("teacher")}>
                                        Teacher
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </FormGroup>
                        <hr />
                        <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                            {this.state.errorCode}
                        </Alert>
                        <FormGroup>
                            <Button className="createAccountButton" size="lg" block>Create Account!</Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}

export default CreateAccount;