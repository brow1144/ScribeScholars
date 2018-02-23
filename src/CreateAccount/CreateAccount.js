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
            uid: null,

            tmpFirstName: null,
            tmpLastName: null,
            tmpEmail: null,


            errorCode: "",
            visible: false,

            dropdownOpen: false,
            selected: "Account Type",
        };
    }

    onFormSubmit = (ev) => {
        ev.preventDefault();
        let self = this;

        let firstName = ev.target.firstName.value;
        let lastName = ev.target.lastName.value;
        let email = ev.target.email.value;

        if (firstName === "") {
          self.setState({
            errorCode: "Please enter your first name",
            visible: true,
          });
        } else if (lastName === "") {
          self.setState({
            errorCode: "Please enter your last name",
            visible: true,
          });
        } else if (self.state.role === null) {
          self.setState({
            errorCode: "Please select an account type",
            visible: true,
          });
        } else {
          fireauth.createUserAndRetrieveDataWithEmailAndPassword(email, ev.target.password.value)
            .then(() => {
              self.setState({
                tmpEmail: email,
                tmpFirstName: firstName,
                tmpLastName: lastName,
              });

              self.addInfo();
            }).catch(function(err) {
              self.setState({
                errorCode: err.message,
                visible: true,
              })
            });
        }
    };

    addInfo = () => {
        fireauth.onAuthStateChanged( (user) => {
          if (user) {
            let docRef = firestore.collection("users").doc(user.uid);
            docRef.set({
              firstName: this.state.tmpFirstName,
              lastName: this.state.tmpLastName,
              email: this.state.email,
              role: this.state.role,
            }).then(function() {
              console.log("successfully written!");
            }).catch(function(error) {
              self.setState({
                errorCode: error.message,
                visible: true,
              });
            });
          } else {
            // finished signing out
            this.setState({ uid: null })
          }
        }
      );
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
      let display = name;
      if (name === "student")
        display = "Student";
      else if (name === "teacher")
        display = "Teacher";

      this.setState({
        role: name,
        selected: display,
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
                            <Label className="h3 font-weight-normal" for="exampleFirstName">Create a New Account</Label>
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
                                  {this.state.selected}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>Account Type</DropdownItem>
                                    <DropdownItem divider />
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