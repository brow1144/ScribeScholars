import React, { Component } from 'react';
import { Label,InputGroupText, InputGroup, InputGroupAddon, Button, Row, Col, Form, FormGroup, Alert, Input } from 'reactstrap';
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/react-accessible-accordion.css';
import { firestore } from "../base";
import './EventButton.css';
import EventClasses from './EventClasses'

class EventButton extends Component {

  constructor(props){
    super(props);

    this.state = {

      title: null,
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      selectedClass: null,

      classes: [{
        name: null,
      }],

      errorMessage: null,
      errorVisible: false,
      addToStudent: false,

      submitting: false,
    };
  };

  componentWillMount(){
    this.getClasses();
    this.setState({
      role: this.props.role,
    });
  };

  onFormSubmit = (ev) => {
    ev.preventDefault();
    let self = this;

    let title = ev.target.title.value;
    let startDate = ev.target.startDate.value;
    let startTime = ev.target.startTime.value;
    let endDate = ev.target.endDate.value;
    let endTime = ev.target.endTime.value;
    //riley stuff
      let addClassCode = ev.target.select.value;

    if (title === "") {
      self.setState({
        errorMessage: "Please enter a valid event title.",
        errorVisible: true,
      });
      return;
    }

    if (startDate === "") {
      self.setState({
        errorMessage: "Please enter a valid event start date.",
        errorVisible: true,
      });
      return;
    }

    if (startTime === "") {
      self.setState({
        errorMessage: "Please enter a valid event start time.",
        errorVisible: true,
      });
      return;
    }

    if (endDate === "") {
      self.setState({
        errorMessage: "Please enter a valid event end date.",
        errorVisible: true,
      });
      return;
    }

    if (endTime === "") {
      self.setState({
        errorMessage: "Please enter a valid event end time.",
        errorVisible: true,
      });
      return;
    }

    self.setState({
      submitting: true,
    });

    let event = {
      title: title,
      start: startDate + " " + startTime,
      end: endDate + " " + endTime,
    };

    let userRef = firestore.collection("users").doc(this.props.uid);
    let classRef;


    if (addClassCode != null && addClassCode !== "Do Not Add To Class") {
        let theRealCode = addClassCode.split(" : ")[1];
      classRef = firestore.collection("classes").doc(theRealCode);
      let classStudents;
        classRef.get().then(function (doc) {
            classStudents = doc.data().students;
            let i = 0;

            //adding event to all students within the selected class
            for (i = 0; i < classStudents.length; i++) {
                let studCode = classStudents[i];
                let studRef = firestore.collection("users").doc(studCode);

                studRef.get().then(function (doc) {
                    let currentEvents = doc.data().events;
                    if (currentEvents == null) {
                        currentEvents = [];
                    }
                    currentEvents.push(event);

                    studRef.update({
                        events: currentEvents,
                    }).catch(function (error) {
                        console.error("Error updating events list" + (error));
                    });
                }).then(function () {
                    self.setState({
                        submitting: false,
                    });
                }).catch(function (error) {
                    console.error("Error getting user doc" + (error));
                });

            }
        });


    }

    //adding the event to the controlling user

    userRef.get().then(function (doc) {
      let currentEvents = doc.data().events;
      if(currentEvents == null){
        currentEvents = [];
      }
      currentEvents.push(event);

      userRef.update({
        events: currentEvents,
      }).catch(function (error) {
        console.error("Error updating events list" + (error));
      });
    }).then(function (){
      self.setState({
        submitting: false,
      });
    }).catch(function (error){
      console.error("Error getting user doc" + (error));
    });
  };

  onDismiss = () => {
    let self = this;
    self.setState({ visible: false });
  };

  getClasses = () => {
        let object = [{}];

        let self = this;

        let userRef = firestore.collection("users").doc(this.props.uid);
        userRef.get().then(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                object = doc.data().classes
                self.setState({
                    classes: object,
                });

        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

        object.pop();

        self.setState({
            classes: object
        });
  };

  render() {

    if(!this.state.submitting) {
      return (
        <div>
          <Accordion>
            <AccordionItem expanded={this.props.expanded}>
              <AccordionItemTitle>
                <h3 align="center">Add an Event</h3>
              </AccordionItemTitle>
              <AccordionItemBody className={"accordBody"}>
                <div className="text-center">
                  <Row>
                    <Col md="1"/>
                    <Col md="10">

                      <Form onSubmit={(ev) => this.onFormSubmit(ev)}>
                        <div className="divider"/>

                          {this.props.role === "teacher"

                              ?<FormGroup >
                                <Label for= "exampleSelect" > Select if you want a class event</Label>
                                <EventClasses classes={this.state.classes}/>
                              </FormGroup>
                              :<div/>

                          }

                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Title</InputGroupText>
                            </InputGroupAddon>
                            <Input name="title"/>
                          </InputGroup>
                          <br/>
                        </FormGroup>

                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Start Date</InputGroupText>
                            </InputGroupAddon>
                            <Input type="date" name="startDate"/>
                          </InputGroup>
                          <br/>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Start Time</InputGroupText>
                            </InputGroupAddon>
                            <Input type="time" name="startTime"/>
                          </InputGroup>
                          <br/>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>End Date</InputGroupText>
                            </InputGroupAddon>
                            <Input type="date" name="endDate"/>
                          </InputGroup>
                          <br/>
                        </FormGroup>

                        <FormGroup>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>End Time</InputGroupText>
                            </InputGroupAddon>
                            <Input type="time" name="endTime"/>
                          </InputGroup>
                          <br/>
                        </FormGroup>

                        <FormGroup>
                          <Alert color="danger" isOpen={this.state.errorVisible} toggle={this.onDismiss}>
                            {this.state.errorMessage}
                          </Alert>

                          <Button size="lg" className="submitButton">Add Event</Button>
                        </FormGroup>

                      </Form>

                    </Col>
                  </Row>

                </div>
              </AccordionItemBody>
            </AccordionItem>
          </Accordion>
        </div>
      );
    } else {
      return (
        <div>
          <Accordion>
            <AccordionItem expanded={this.props.expanded}>
              <AccordionItemTitle>
                <h3 align="center">Submitting Event...</h3>
              </AccordionItemTitle>
            </AccordionItem>
          </Accordion>
        </div>
      );
    }
  }
}

/*{(this.props.role === "teacher")
                              ? <EventClasses radioCheck={this.radioCheck} addClass={this.setAddClass} classes={this.state.classes} classToAdd={this.state.classToAdd}/>
                              : <div/>
                          }*/

export default EventButton;