import React, { Component } from 'react';

import { firestore } from '../base.js';

import { Button, Container, Row, Col, Form, FormGroup, Alert, Input } from 'reactstrap';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
//import Switch from 'react-toggle-switch';

import './SetClassroom.css';
import 'react-accessible-accordion/dist/react-accessible-accordion.css';
import 'react-toggle-switch/dist/css/switch.min.css';

class SetClassroom extends Component {
    constructor(props) {
      super(props);

      this.state = {
        uid: props.uid,

        newClass: null,
        newClassCode: null,
        newClassTeacher: null,

        classes: [{
          class: null,
          code: null,
          teacher: null,
        }],

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

    handleDeleteClick = () => {
        console.log("this was clicked")

    };

    onDismiss = () => {
      this.setState({
        visible: false,
      });
    };

    render()
    {

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
                        { this.props.classes != null
                            ?
                            <Accordion>
                                {this.props.classes != null && Object.keys(this.props.classes).map((key, index) => {
                                    return <AccordionItem key={key}>
                                        <AccordionItemTitle>
                                            <h3>
                                                {this.props.classes[index].class}
                                            </h3>
                                        </AccordionItemTitle>
                                        <AccordionItemBody className={"accordBody"}>
                                            <div>
                                                <br/>
                                                <Button className={"classroomButton"} size={"lg"} color={"info"}>Disable
                                                    Notifications</Button>
                                                <Button className={"classroomButton"} size={"lg"} color={"info"}>Disable
                                                    Announcements</Button>

                                                <span onClick={this.handleDeleteClick}
                                                      className={"clickableIcon float-right"}>
                                                <i onClick={this.handleDeleteClick}
                                                   className="fas fa-trash-alt deleteIcon float-right"/>
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
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SetClassroom