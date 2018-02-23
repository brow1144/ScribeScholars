import React, { Component } from 'react';

import { firestore } from '../base.js';

import { NavLink } from 'react-router-dom'

import { Button, Container, Row, Col, Form, FormGroup, Alert, Input } from 'reactstrap';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import './SetClassroom.css';
import 'react-accessible-accordion/dist/react-accessible-accordion.css';

class SetClassroom extends Component {
    constructor(props) {
      super(props);

      this.state = {
        uid: props.uid,
        deletionCode: null,

        role: this.props.role,

        newClass: null,
        newClassCode: null,
        newClassTeacher: null,

        tempStudents: [],
        tempClassList: [],

        classes: props.classes,
        /*classes: [{
          class: null,
          code: null,
          teacher: null,
        }],*/

        students: null,

        errorCode: "",
        visible: false,
      };
    }

    checkClasses = () => {
      let self = this;

      // get student's classes
      let studentRef = firestore.collection("users").doc(self.state.uid);
      studentRef.get().then(function(doc) {
        if (doc.exists) {
          if (doc.data().classes != null) {
            self.setState({
              classes: doc.data().classes,
            });
          }

          self.joinClass(studentRef);
        } else {
          console.log("user not found");
        }
      }).catch(function(error) {
        console.log("Error getting document: ", error);
      });
    };

    joinClass = (studentRef) => {
      let self = this;

      // check if student is already in class
      if (self.state.classes != null) {
        for (let i in self.state.classes) {
          if (self.state.classes[i].code === self.state.newClassCode) {
            self.setState({
              errorCode: "Already enrolled in this class",
              visible: true,
            });
            return;
          }
        }
      }

      // create new temporary class
      let tmpNewClass = [{
        class: self.state.newClass,
        code: self.state.newClassCode,
        teacher: self.state.newClassTeacher,
      }];

      // add temporary class to classes
      if (self.state.classes != null) {
        self.setState({
          classes: self.state.classes.concat(tmpNewClass),
        });
      } else {
        self.setState({
          classes: tmpNewClass,
        });
      }

      console.log(self.state.classes);
      studentRef.update({
        classes: self.state.classes,
      }).then(function() {
        console.log("Successfully updated classes list");
      }).catch(function(error) {
        console.log("Error updating document: ", error);
      });

      // add student to class roster
      let docRef = firestore.collection("classes").doc(self.state.newClassCode);
      docRef.get().then(function(doc) {
        if (doc.exists) {
          if (self.state.students != null) {
            self.setState({
              students: self.state.students.concat(self.state.uid),
            });
          } else {
            self.setState({
              students: self.state.uid,
            })
          }
          docRef.update({
            students: self.state.students,
          }).then(function() {
            console.log("Successfully updated students list");
          }).catch(function(error) {
            console.log("Error updating document: ", error);
          });
        } else {
          self.setState({
            errorCode: "Class not found",
            visible: true,
          });
        }
      }).catch(function(error) {
        console.log("Error getting document: ", error);
      });
    };

    onFormSubmit = (ev) => {
      ev.preventDefault();
      let self = this;

      let code = ev.target.classCode.value;
      if (code !== "") {
        let docRef = firestore.collection("classes").doc(code);
        docRef.get().then(function (doc) {
          if (doc.exists) {
            let data = doc.data();
            self.setState({
              newClass: data.class,
              newClassCode: code,
              newClassTeacher: data.teacher,
              students: data.students,
            });

            self.checkClasses();
          } else {
            self.setState({
              errorCode: "Class not found",
              visible: true,
            });
          }
        }).catch(function (error) {
          console.log("Error getting document: ", error);
        });
      } else {
        self.setState({
          errorCode: "Please enter a 6-digit code",
          visible: true,
        });
      }
    };

    handleDeleteClick = (classCode) => {
        let self = this;
        
        let classRef = firestore.collection("classes").doc(classCode);
        let studentRef = firestore.collection("users").doc(self.state.uid);


        classRef.get().then(function(doc) {
            self.setState({
                tempStudents: doc.data().students
            });
            let i = self.state.tempStudents.indexOf(self.state.uid);
            self.state.tempStudents.splice(i,1);
            classRef.update({
                students: self.state.tempStudents
            }).then(function() {
                console.log("Student list updated")
            })

        });

        studentRef.get().then(function(doc) {
            self.setState({
                tempClassList: doc.data().classes
            });
            let i = self.state.tempClassList.indexOf(classCode);
            self.state.tempClassList.splice(i,1);
            studentRef.update({
                classes: self.state.tempClassList,
            }).then(function() {
                self.setState({
                    classes: self.state.tempClassList,
                });
                console.log("Class list updated")
            })

        });
    };

    onDismiss = () => {
      this.setState({
        visible: false,
      });
    };

    render() {

        return(
            <Container fluid className={"ContainerRules"}>
                <Row className={"Filler"}> </Row>
                <Row className={"BannerRow"}>
                    <Col xs={"12"} sm={"12"} md={"12"} lg={"12"} xl={"12"} className={"BannerCol"}>
                        <h1>{this.props.name}'s Classroom Settings:</h1>
                    </Col>
                </Row>
                <Row className={"Filler"}> </Row>
                <Row className={"Filler"}> </Row>
                <Row className={"BoxForm"}>
                    <Col xs={"6"}>
                        { this.state.classes != null
                            ?
                            <Accordion>
                                {this.state.classes != null && Object.keys(this.state.classes).map((key, index) => {
                                    return <AccordionItem key={key}>
                                        <AccordionItemTitle>
                                            <h3>
                                                {this.state.classes[index].class}
                                            </h3>
                                        </AccordionItemTitle>
                                        <AccordionItemBody className={"accordBody"}>
                                            <div>
                                                <br/>
                                                <Button className={"classroomButton"} size={"lg"} color={"info"}>Disable
                                                    Notifications</Button>
                                                <Button className={"classroomButton"} size={"lg"} color={"info"}>Disable
                                                    Announcements</Button>
                                                <span onClick={ () => this.handleDeleteClick(this.state.classes[index].code)} className={"clickableIcon float-right"}>
                                                    <i className="fas fa-trash-alt deleteIcon float-right"/>
                                                </span>

                                            </div>
                                        </AccordionItemBody>
                                    </AccordionItem>
                                })}
                            </Accordion>
                            :
                            null
                        }

                        <Row className={"Filler"}> </Row>
                        <Row className={"Filler"}> </Row>

                      {this.state.role === "student" ?
                        <Form onSubmit={this.onFormSubmit}>
                            <FormGroup row check>
                                <Col sm={{ size: 3, offset: 2}}>
                                    <Input bsSize="lg" type="classCode" name="classCode" id="classToAdd" placeholder="Class Code"/>
                                    <Row className={"Filler"}> </Row>
                                </Col>
                                <Col sm={{ size: 5, offset: 2}}>
                                  <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                                    {this.state.errorCode}
                                  </Alert>
                                </Col>
                                <Col sm={{ size: 3, offset: 2}}>
                                  <Button size={"lg"}>Join This Class</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                        :
                        <Col >
                          <Row>
                            <NavLink style={{ textDecoration: 'none' }} to={`/create-class`}>
                              <Button type="submit" className="createClassButton" size ="lg" block>Create Class!</Button>
                            </NavLink>
                          </Row>
                        </Col>
                      }

                        </Col>
                </Row>
            </Container>
        );
    }
}

export default SetClassroom