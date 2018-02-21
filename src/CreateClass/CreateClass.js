import React, { Component } from 'react';

import { firestore } from '../base.js';

import { Form, Input, Button } from 'reactstrap';
import './CreateClass.css'
import logo from '../logo.svg'
  
class CreateClass extends Component {

  constructor(props){
    super(props);

    this.handleInput = this.handleInput.bind(this);

    this.state = {
      uid: props.uid,
      code: '',
      className: '',
      codeValid: false,
      passwordValid: false,
      formValid: false,
      errorVisible: false,
    };
  }

  onFormSubmit = (ev) => {
    ev.preventDefault();
    this.generateCode();
    if(this.state.formValid){
      console.log("Success!");

      //TODO Add submit logic

    } else {
      this.setState({ errorVisible: true });
      //console.log("Error: Form Submit Failure");
    }
  };

  generateCode = () => {
    let self = this;

    let code = "";
    for (let i = 0; i < 6; i++) {
      code += Math.floor(Math.random()*10);
    }

    let docRef = firestore.collection("classes").doc(code);
    docRef.get().then(function(doc) {
      if (doc.exists) {
        self.generateCode();
      } else {
        docRef.set({
          name: this.className,
          teacher: this.uid
        }).then(function() {
          console.log("successfully written!");
        }).catch(function(error) {
          console.log(error);
        });
      }
    }).catch(function(error) {
      console.log("Error getting document: ", error);
    });
  };

  handleInput = (e) => {
    const className = e.target.name;
    const value = e.target.value;
    this.setState({[className]: value},
      () => {this.validateField(className, value)});
  };

  validateField(fieldName){

    switch(fieldName){

      case 'code':

        //console.log("Code length: " + this.state.code.length);

        if(this.state.code.length === 6){
          this.setState({codeValid: true}, function() {
            this.validateForm();
          });
          //console.log("Code Valid!")
        }
        else {
          this.setState({codeValid: false}, function() {
            this.validateForm();
          });
          //console.log("Code Invalid!")
        }
        //console.log("Code Valid " + this.state.codeValid)
        return;

      case 'password':

        //console.log("Password length: " + this.state.password.length);

        if(this.state.password.length >= 6){
          this.setState({passwordValid: true}, function() {
            this.validateForm();
          });
          //console.log("Password Valid!")
        }
        else {
          this.setState({passwordValid: false}, function() {
            this.validateForm();
          });
          //console.log("Password Invalid!")
        }
        //console.log("Password Valid " + this.state.passwordValid);
        return;

      default:
        console.log("Error: incorrect fieldName");
        return;
    }
  }

  validateForm = () =>{
    this.setState({formValid: this.state.codeValid && this.state.passwordValid}, function() {
      this.printForm();
    });

  };

  printForm(){
    //console.log("formValid: " + this.state.formValid);
  }


  //TODO Add input labels
  render() {

    return (
      <div className="text-center">
        <div className ="Absolute-Center is-Responsive">
          <Form onSubmit={this.onFormSubmit}>
            <img src={logo} alt="" width="100" height="100"/>
            <h3 className = "h3 font-weight-normal">Create New Class</h3>
            <div className="form-group">
              <Input name="className" type="text" placeholder="Enter class name"
                value={this.state.code}
                onChange={this.handleInput}
              />
            </div>
            <div className = "form-group">
              <Input name="password" type="password" placeholder="Enter your password"
                value={this.state.password}
                onChange={this.handleInput}
              />
            </div>
            <Button type="submit" className="createClassButton" size ="lg" block>Create Class!</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default CreateClass;