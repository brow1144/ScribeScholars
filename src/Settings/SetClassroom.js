import React, { Component } from 'react';

import { firestore } from '../base.js';

import { Button, Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import Switch from 'react-toggle-switch';

import './SetClassroom.css';
import 'react-accessible-accordion/dist/react-accessible-accordion.css';
import 'react-toggle-switch/dist/css/switch.min.css';

class SetClassroom extends Component {
    constructor(props) {
      super(props);

      this.state = {
        uid: props.uid,
        newClassCode: null,

        classes: [{
          class: null,
          code: null,
          teacher: null,
        }],

        students: null,
      };
    }

    checkClasses = () => {
      let self = this;

      let studentRef = firestore.collection("users").doc(self.state.uid);
      studentRef.get().then(function(doc) {
        if (doc.exists) {
          self.setState({
            classes: doc.data().classes,
          });

          self.joinClass(studentRef);
        } else {
          console.log("user not found");
        }
      }).catch(function(error) {
        console.log("Error getting document: ", error);
      });
    };

    joinClass = (studentRef) => {
      /*let object = [{}];

      let self = this;

      for(let i in self.state.classes) {
        let classRef = studentRef.collection(self.state.classes[i].code).doc(self.state.newClassCode);

      }

      classRef.get().then(function(doc) {
        if (doc.exists) {
          console.log("User already in class");
        } else {
          for(let i in self.state.classes) {
            if (self.state.classes.hasOwnProperty()) {
              //let docRef = firestore.collection("users").doc(self.state.classes[i].teacher);
              //let dateRef = docRef.collection(self.state.classes[i].class).doc("deadlines");
              let classRef = studentRef.collection(self.state.classes[i].class).doc(self.state.newClassCode);



              dateRef.get().then(function (doc) {
                if (doc.exists) {
                  let data = doc.data();
                  for (let j in data.array) {
                    if (data.array.hasOwnProperty()) {
                      object.unshift({
                        title: data.array[j].title,
                        start: new Date(data.array[j].year, data.array[j].month, data.array[j].day),
                        end: new Date(data.array[j].year, data.array[j].month, data.array[j].day),
                      });
                      self.setState({
                        dates: object,
                      })
                    }
                  }

                } else {
                  console.log("No such document!");
                }
              }).catch(function (error) {
                console.log("Error getting document:", error);
              });
            }
            object.pop();
          }

          self.setState({
            dates: object
          });
        }
      }).catch(function(error) {
        console.log("Error getting document: ", error);
      });

*/
    };


    onFormSubmit = (ev) => {
      ev.preventDefault();
      let self = this;

      let code = ev.target.classCode.value;

      let docRef = firestore.collection("classes").doc(code);
      docRef.get().then(function(doc) {
        if (doc.exists) {
          self.setState({
            newClassCode: code,
          });

          self.checkClasses();
        } else {
          console.log("class not found");
        }
      }).catch(function(error) {
        console.log("Error getting document: ", error);
      });
    };

    handleDeleteClick = () => {
        console.log("this was clicked")

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
                        <Accordion>
                        {this.props.classes != null && Object.keys(this.props.classes).map((key, index) => {
                            return<AccordionItem key={key}>
                                    <AccordionItemTitle>
                                        <h3>
                                            {this.props.classes[index].class}
                                        </h3>
                                    </AccordionItemTitle>
                                    <AccordionItemBody className={"accordBody"}>
                                        <div>
                                            <br/>
                                            <Button className={"classroomButton"} size={"lg"} color={"info"}>Disable Notifications</Button>
                                            <Button className={"classroomButton"} size={"lg"} color={"info"}>Disable Announcements</Button>

                                            <span onClick={this.handleDeleteClick} className={"clickableIcon float-right"}>
                                                <i onClick={this.handleDeleteClick} className="fas fa-trash-alt deleteIcon float-right"/>
                                            </span>

                                        </div>
                                    </AccordionItemBody>
                                </AccordionItem>


                        })}
                        </Accordion>

                        <Row className={"Filler"}> </Row>
                        <Row className={"Filler"}> </Row>
                        <Form onSubmit={this.onFormSubmit}>
                            <FormGroup row check>
                                <Col sm={{ size: 2, offset: 2}}>
                                    <Input bsSize="lg" type="classCode" name="classCode" id="classToAdd" placeholder="Class Code"/>
                                    <Row className={"Filler"}> </Row>
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