import React, { Component } from 'react';
import { Label, InputGroupText, InputGroup, InputGroupAddon, Button, Container, Row, Col, Form, FormGroup, Alert, Input, ModalBody, ModalFooter, ModalHeader, Modal } from 'reactstrap';
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/react-accessible-accordion.css';
import { firestore } from "../base";
import './EventButton.css';

class EventButton extends Component {

  constructor(props){
    super(props);

    this.state = {

      name: null,
      description: null,
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,

      errorMessage: null,
      errorVisible: false,

      submitting: false,
    };
  };

  onFormSubmit = (ev) => {
    ev.preventDefault();
    let self = this;

    let name = ev.target.name.value;
    let description = ev.target.description.value;
    let startDate = ev.target.startDate.value;
    let startTime = ev.target.startTime.value;
    let endDate = ev.target.endDate.value;
    let endTime = ev.target.endTime.value;

    /*if (name === "") {
      self.setState({
        errorMessage: "Please enter a valid event name.",
        errorVisible: true,
      });
      return;
    }

    if (description === "") {
      self.setState({
        errorMessage: "Please enter a valid event description.",
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
    }*/

    console.log("reached");

    /*let event = {
      name: name,
      description: description,
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
    };

    self.setState({
      submitting: true,
    });

    let userRef = firestore.collection("users").doc(this.props.uid);
    userRef.get().then(function (doc) {
      let currentEvents = doc.data().events;
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
    });*/
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
            <AccordionItem>
              <AccordionItemTitle>
                <h3 align="center">Add an Event</h3>
              </AccordionItemTitle>
              <AccordionItemBody className={"accordBody"}>
                <div className={"inside"}>

                  <Form>

                    <Row>
                      <Col>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Name</InputGroupText>
                          </InputGroupAddon>
                          <Input name="name"/>
                        </InputGroup>
                        <br/>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Description</InputGroupText>
                          </InputGroupAddon>
                          <Input name="description"/>
                        </InputGroup>
                        <br/>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Start Date</InputGroupText>
                          </InputGroupAddon>
                          <Input type="date" name="startDate"/>
                        </InputGroup>
                        <br/>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Start Time</InputGroupText>
                          </InputGroupAddon>
                          <Input type="time" name="startTime"/>
                        </InputGroup>
                        <br/>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>End Date</InputGroupText>
                          </InputGroupAddon>
                          <Input type="date" name="endDate"/>
                        </InputGroup>
                        <br/>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>End Time</InputGroupText>
                          </InputGroupAddon>
                          <Input type="time" name="endTime"/>
                        </InputGroup>
                        <br/>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Alert color="danger" isOpen={this.state.errorVisible} toggle={this.onDismiss}>
                          {this.state.errorMessage}
                        </Alert>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Button type="submit" className="submitButton">Add Event</Button>
                      </Col>
                    </Row>

                  </Form>

                </div>
              </AccordionItemBody>
            </AccordionItem>
          </Accordion>
        </div>
      );
    } else {
      return (
        <div>
          <Label align="center"> Submitting... </Label>
        </div>
      );
    }
  }
}

export default EventButton;