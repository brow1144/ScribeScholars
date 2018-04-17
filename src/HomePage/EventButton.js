import React, { Component } from 'react';
import { InputGroupText, InputGroup, InputGroupAddon, Button, Row, Col, Form, FormGroup, Alert, Input } from 'reactstrap';
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/react-accessible-accordion.css';
import { firestore } from "../base";
import './EventButton.css';

class EventButton extends Component {

  constructor(props){
    super(props);

    this.state = {

      title: null,
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,

      errorMessage: null,
      errorVisible: false,

      submitting: false,
    };
  };

  componentWillMount(){
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

export default EventButton;