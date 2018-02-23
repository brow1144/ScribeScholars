import React, { Component } from 'react';
import { firestore } from '../base.js';
import { Form, Input, Button, Label } from 'reactstrap';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import ClassSuccess from './ClassSuccess';
import './CreateClass.css'
  
class CreateClass extends Component {

  constructor(props){
    super(props);

    this.MIN_NAME_LENGTH = 6;

    this.handleInput = this.handleInput.bind(this);
    this.handleTabBoxInput = this.handleTabBoxInput.bind(this);

    this.state = {
      uid: props.uid,
      className: '',
      email: '',
      tabs: ['annoucements', 'assignments-and-documents', 'course-discussion', 'grades'],
      nameValid: false,
      formValid: false,
      done: false,
    };

  }

  onFormSubmit = (ev) => {
    ev.preventDefault();
    if(this.state.formValid){

      this.setState({
        className: this.state.className,
      }, this.setNewDoc );

    } else {
      console.log("Error: Class name needs to be at least 6 characters");
    }
  };

  //Update Firestore database
  setNewDoc = () => {
    let self = this;
    let code = CreateClass.getCode();

    //TODO Add check for repeated code

    let classData = {
      class: self.state.className,
      teacher: self.state.uid,
      teacher_email: self.state.email,
      Announcements: [],
      deadlines: [],
      students: [],
      tabs: self.state.tabs
    };


    let classRef = firestore.collection("classes").doc(code);
    classRef.set(classData).then(function () {
      self.setState({
        done: false,
      });
    }); //TODO Error catching*/

    /*let classRef = firestore.collection("classes").doc(code);
=======

    //Create new document in "classes" collection
    let classRef = firestore.collection("classes").doc(code);
>>>>>>> a10497ec2cf31980bc6bd89365aa86107583e209
    classRef.get().then(function(doc) {
      if (doc.exists) {
        //code = getCode();
      } else {
        classRef.set({
          class: self.state.className,
          teacher: self.state.uid,
          teacher_email: self.state.email,
          announcements: [],
          deadlines: [],
          students: [],
          tabs: self.state.tabs,
        }).then(function() {
          console.log("successfully written!");
        }).catch(function(error) {
          console.log(error);
        });
      }
    }).catch(function(error) {
      console.log("Error getting document: ", error);
    });*/


    //Update user document based on uid with newly generated class information
    let teacherRef = firestore.collection("users").doc(this.state.uid);
    firestore.runTransaction(t => {
      return t.get(teacherRef)
        .then(doc => {

          let classArray = doc.data().classes;
          let newData = {
            class: self.state.className,
            code: code,
            teacher: self.state.uid
          };
          classArray.push(newData);

          t.update( teacherRef, { classes: classArray } );

        });
    }).then(result => {
      self.setState({
        done: true,
      });
    }).catch(err => {
      console.log('Transaction failure:', err);
    });
  };

  //Generate class code
  static getCode() {
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += Math.floor(Math.random()*10);
    }
    return code;
  }

  //Sets this.state.tabs to checkboxes that are currently selected
  handleTabBoxInput = (e) => {
    this.setState({
      tabs: e
    });
  };

  //Handle text field input
  handleInput = (e) => {
    const className = e.target.name;
    const value = e.target.value;
    this.setState({[className]: value},
      () => {this.validateField(className, value)});
  };

  validateField(fieldName){

    switch(fieldName){

      case 'className':

        if(this.state.className.length >= this.MIN_NAME_LENGTH){
          this.setState({nameValid: true}, this.validateForm
          );
        }
        else {
          this.setState({nameValid: false}, this.validateForm);
        }
        return;

      default:
        console.log("Error: incorrect fieldName");
        return;
    }
  }

  validateForm = () => {
    this.setState({formValid: this.state.nameValid});
  };

  render() {

    if (!this.state.done) {

      return (
        <div className="quarter">
          <Form onSubmit={this.onFormSubmit}>

            <div className="form-group">
              <h3 className="h3 font-weight-bold">Create A New Classroom</h3>
            </div>

            <div className="titleField"/>

            <div className="form-group">
              <Label className="inputLabel">Class Name: </Label>
              <Input name="className" className="inputField" type="text" placeholder="Enter the class name"
                     onChange={this.handleInput}
              />
            </div>

            <div className="form-group">
              <Label className="inputLabel">Email: (Students will see this as your public email) </Label>
              <Input name="email" className="inputField" type="text" placeholder="Enter your email"
                     onChange={this.handleInput}/>
            </div>

            <div className="form-group">
              <Label>Choose which tabs you would like included in your classroom:</Label>
              <div/>

              <CheckboxGroup name="tabs"
                             value={this.state.tabs}
                             checkboxDepth={2}
                             onChange={this.handleTabBoxInput}>
                <Label> <Checkbox value="annoucements" name="annoucements" onChange={this.handleTabBoxInput}
                                  checked="checked"/> Annoucements </Label>
                <div/>
                <Label> <Checkbox value="assignments-and-documents" name="assignments-and-documents"
                                  onChange={this.handleTabBoxInput} checked="checked"/> Assignments and Documents
                </Label>
                <div/>
                <Label> <Checkbox value="course-discussion" name="course-discussion" onChange={this.handleTabBoxInput}
                                  checked="checked"/> Course Discussion </Label>
                <div/>
                <Label> <Checkbox value="grades" name="grades" onChange={this.handleTabBoxInput}
                                  checked="checked"/> Grades </Label>
              </CheckboxGroup>
            </div>


            <div className="titleField"/>

            <Button type="submit" className="createClassButton" size="lg" block>Create Class!</Button>

          </Form>
        </div>
      );
    } else {
      return(
          <ClassSuccess uid={this.state.uid} className={this.state.className}/>
      );
    }
  }
}

export default CreateClass;