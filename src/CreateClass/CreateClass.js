import React, { Component } from 'react';
import { firestore } from '../base.js';
import { Form, Input, Button, Label, Alert } from 'reactstrap';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import ClassSuccess from './ClassSuccess';
import './CreateClass.css'
import logo from '../logo.svg';

class CreateClass extends Component {

    constructor(props){
        super(props);

        this.MIN_NAME_LENGTH = 6;

        this.handleTabBoxInput = this.handleTabBoxInput.bind(this);

        this.state = {
            uid: props.uid,

            classes: null,
            className: null,
            email: null,
            tabs: ['annoucements', 'assignments-and-documents', 'course-discussion', 'grades'],
            code: null,

            errorMessage: null,
            visible: false,

            done: false,
        };

    }

    onFormSubmit = (ev) => {
        ev.preventDefault();

        let name = ev.target.className.value;
        let email = ev.target.email.value;

        if(name === ''){
            this.setState({
                errorMessage: "Please enter a class name.",
                visible: true,
            })
        }

        else if(email === ''){
            this.setState({
                errorMessage: "Please enter a class email.",
                visible: true,
            })
        }

        else if(name.length < this.MIN_NAME_LENGTH){
            this.setState({
                errorMessage: "Class name must be at least " + this.MIN_NAME_LENGTH + " characters long.",
                visible: true,
            })
        }

        else if(!email.includes("@")){
            this.setState({
                errorMessage: "Please enter a valid email.",
                visible: true,
            })
        }

        else {

            this.setState({
                className: name,
                email: email,
                visible: false,
            }, this.createNewClassDoc );

        }
    };

    //Update Firestore database
    createNewClassDoc = () => {
        let self = this;
        let code = CreateClass.getCode();

        //Create new document in "classes" collection
        let classRef = firestore.collection("classes").doc(code);
        classRef.get().then(function(doc) {
            if (doc.exists) {
                self.createNewClassDoc();
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

                    self.setState({
                        done: false,
                        code: code,
                    });

                    self.getClasses();
                }).catch(function(error) {
                    console.log(error);
                });
            }
        }).catch(function(error) {
            console.log("Error getting document: ", error);
        });
    };

    getClasses() {
        let self = this;

        let teacherRef = firestore.collection("users").doc(this.state.uid);
        teacherRef.get().then(function (doc) {
            if (doc.exists) {
                if (doc.data().classes != null) {
                    self.setState({
                        classes: doc.data().classes,
                    });
                }

                self.updateTeacher(teacherRef);
            } else {
                console.log("user not found");
            }
        }).catch(function (error) {
            console.log("Error getting document: ", error);
        });
    }

    updateTeacher(teacherRef) {
        let self = this;

        let newClass = [{
            class: this.state.className,
            code: this.state.code,
        }];

        if (this.state.classes != null) {
            this.setState({
                classes: this.state.classes.concat(newClass),
            });
        } else {
            this.setState({
                classes: newClass,
            });
        }

        teacherRef.update({
            classes: self.state.classes,
        }).then(function() {
            //console.log("Successfully updated classes list");

            self.setState({
                done: true,
            });
        }).catch(function(error) {
            console.log("Error updating document: ", error);
        });
    }

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

    onDismiss = () => {
        this.setState({ visible: false });
    };

    render() {

        if (!this.state.done) {

            return (
                <div className="text-center">'
                    <div className="Absolute-Center is-Responsive">
                        <Form onSubmit={this.onFormSubmit}>

                            <div className="form-group">
                                <img src={logo} alt="" width="100" height="100"/>
                            </div>

                            <div className="form-group">
                                <h3 className="h3 font-weight-normal">Create A New Classroom</h3>
                            </div>

                            <div className="form-group">
                                <Input name="className" className="inputField" type="text" placeholder="Enter class name"/>
                            </div>

                            <div className="form-group">
                                <Input name="email" className="inputField" type="text" placeholder="Enter public class email"/>
                            </div>

                            <div className="form-group">
                                <h5 className="h5 font-weight-normal">Classroom Tab Options: </h5>

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

                            <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss.bind(this)}>
                                {this.state.errorMessage}
                            </Alert>

                            <Button type="submit" className="createClassButton" size="lg" block>Create New Class!</Button>

                        </Form>
                    </div>
                </div>
            );
        } else {
            return(
                <ClassSuccess uid={this.state.uid} className={this.state.className} code={this.state.code}/>
            );
        }
    }
}

export default CreateClass;