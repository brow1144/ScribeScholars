import React, { Component } from 'react';

import { fireauth, firestore } from '../base.js';

import { Form, FormGroup, Label, Input, Button, Alert, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Col } from 'reactstrap';
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
            tmpDob: null,
            tmpPhone: null,
            tmpEmail: null,
            tmpRole: null,

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
        let dob = ev.target.dob.value;
        let phone = ev.target.phone.value;
        let email = ev.target.email.value;
        let role = ev.target.role.value;

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
        } else if (dob === null) {
          self.setState({
            errorCode: "Please enter your date of birth",
            visible: true,
          });
        } else if (phone === "") {
          self.setState({
            errorCode: "Please enter your phone number",
            visible: true,
          });
        } else if (role === "Select Account Type") {
          self.setState({
            errorCode: "Please choose an account type",
            visible: true,
          });
        }/*else if (self.state.role === null) {
          self.setState({
            errorCode: "Please select an account type",
            visible: true,
          });
        } */else {
          fireauth.createUserAndRetrieveDataWithEmailAndPassword(email, ev.target.password.value)
            .then(() => {
              self.setState({
                tmpFirstName: firstName,
                tmpLastName: lastName,
                tmpDob: dob,
                tmpPhone: phone,
                tmpEmail: email,
                tmpRole: role,
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
        let self = this;

        fireauth.onAuthStateChanged( (user) => {
          if (user) {
            let docRef = firestore.collection("users").doc(user.uid);
            docRef.set({
              firstName: this.state.tmpFirstName,
              lastName: this.state.tmpLastName,
              dob: this.state.tmpDob,
              phone: this.state.tmpPhone,
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
            self.setState({ uid: null })
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

    /*selectRole(name) {
      let display = name;
      if (name === "student")
        display = "Student";
      else if (name === "teacher")
        display = "Teacher";

      this.setState({
        role: name,
        selected: display,
      })
    }*/

    render() {
        return (
          <Container>
            <div className="text-center">
                <div className="Absolute-Center is-Responsive">
                    <Form onSubmit={ (ev) => this.onFormSubmit(ev) }>
                        <FormGroup>
                            <img src={logo} alt="" width="100" height="100"/>
                        </FormGroup>
                        <FormGroup>
                            <Label className="h3 font-weight-normal" for="exampleFirstName">Create a New Account</Label>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={6}>
                              <Input name="firstName" id="exampleFirstName" placeholder="First Name" />
                            </Col>
                            <Col sm={6}>
                              <Input name="lastName" id="exampleLastName" placeholder="Last Name" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={6}>
                              <Input type="date" name="dob" id="exampleDob" placeholder="Date of Birth" />
                            </Col>
                            <Col sm={6}>
                              <Input name="phone" id="examplePhone" placeholder="Phone Number" />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="password" name="password" id="examplePassword" placeholder="Password" />
                        </FormGroup>
                        <FormGroup row>
                          <Col sm={{ size: 6, offset: 3 }}>
                            <Input type="select" name="role" id="exampleSelect" placeholder="Account Type">
                              <option>Select Account Type</option>
                              <option>Student</option>
                              <option>Teacher</option>
                            </Input>
                          </Col>
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
          </Container>
        );
    }

  /* <FormGroup>
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
                      </FormGroup> */
}

export default CreateAccount;