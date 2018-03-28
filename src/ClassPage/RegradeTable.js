import React, { Component } from 'react';
import {Table, Container, Row, Col, Label, Button, Input } from 'reactstrap';
import { firestore } from "../base";
import Modal from 'react-modal';
import './Table.css'
import GradesTable from "./GradesTable";

class RegradeTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: this.props.uid,
      code: this.props.code,
      regrades: [],

      modal_request: {
        name: null,
        maxscore: null,
        reason: null,
        score: null,
        student: null,
        studentCode: null,
      },
      modal_index: null,
      modal_open: false,
      reason_input: "",

      input_score: "",

      submit_status: null,
      doneLoading: false,
    };

    let self = this;

    //Get data on regrades
    let docRef = firestore.collection("classes").doc(this.props.code);
    docRef.get().then(function (doc) {

      self.setState({
        regrades: doc.data().regrades,
      });

    }).then( function () {
      self.setState({ doneLoading: true });

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  };

  //Modal handling
  openRegradeModal = (index) => {
    let self = this;
    self.setState({
      modal_request: self.state.regrades[index],
      modal_index: index,
      modal_open: true,
    });
    //console.log("student name is " + this.state.modal_request.student);
  };

  closeRegradeModal = () => {
    let self = this;
    self.setState({
      modal_request: null,
      modal_open: false,
      modal_index: null,
      reason_input: "",
      submit_status: null,
    });
  };

  //Called when regrade is accepted
  onAccept = () => {
    this.setState({ submit_status: "accepted" });
  };

  //Called after teacher enters student's new grade
  onSubmitFinalScore = () => {
    this.setState({ submit_status: "writing" });
    this.updateStudentAssignment();
    this.removeFromRegrades();
  };

  updateInputScore = (evt) => {
    let self = this;
    self.setState({ input_score: evt.target.value });
  };

  //Called when regrade is declined
  onDecline = () => {
    let self = this;
    self.setState({ submit_status: "declined" });
    self.removeFromRegrades();
  };

  updateStudentAssignment() {
    let self = this;

    let studentRef = firestore.collection("users").doc(this.state.modal_request.studentCode).collection("assignments").doc(this.props.code);
    studentRef.get().then(function (doc) {
      let grades = doc.data().grades;
      for(let i = 0; i < grades.length; i++){
        if(grades[i].name === self.state.modal_request.name){
          let assignment = grades[i];

          if(self.state.submit_status === "writing" || self.state.submit_status === "accepted"){
            assignment.regrade_status = "accepted";
            assignment.score = self.state.input_score;
          }else if(self.state.submit_status === "declined"){
            assignment.regrade_status = "declined";
          }

          grades.splice(i, 1, assignment);

          studentRef.update({
            grades: grades,
          }).then(function () {
            self.setState({
              submit_status: "submitted",
            });
          }).catch(function (error) {
            console.log("Error updating document:", error);
          });;

          break;
        }
      }

    }).then(function (){
      self.setState({ doneLoading: true });
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  };

  removeFromRegrades() {
    let self = this;
    //Get class reference for updating all pending requests
    let classRef = firestore.collection("classes").doc(this.props.code);
    classRef.get().then(function (doc) {

      let allRequests = doc.data().regrades;
      allRequests.splice(self.state.modal_index, 1);

      classRef.update({
        regrades: allRequests
      }).then(function() {

        self.setState({
          submit_status: "submitted",
          regrades: allRequests,
        });

      }).catch(function(error) {
        console.log("Error updating document: ", error);
      });

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  };

  getModalContent() {
    switch(this.state.submit_status){

      case "accepted":
        return (
          <Modal
            className={"modalStyle"}
            onRequestClose={this.closeRegradeModal}
            isOpen={this.state.modal_open}
            ariaHideApp={false}>
            <h2 className={"homeworkTitle"}>
              Regrade Accepted.
            </h2>
            <div className="makeSpace"/>
            <h4 className="modalText">
              Please enter {this.state.modal_request.student}'s new grade for {this.state.modal_request.name}.
            </h4>
            <div className="makeSpace"/>

            <Row>
              <Col xs="0" md="3"/>
              <Col xs="12" md="4">
                <Input type="text" bsSize="lg" value={this.state.input_score} onChange={this.updateInputScore}/>
              </Col>
              <Col md="0"/>
              <Col md="4">
                <h3>{"/" + this.state.modal_request.maxscore}</h3>
              </Col>
              <Col md="1"/>
            </Row>

            <div className="makeSpace"/>
            <Button type="text" className="submitButton" size="lg" block onClick={this.onSubmitFinalScore}>Submit Updated Score</Button>
          </Modal>
        );

      case "declined":
        return (
          <Modal
            className={"modalStyle"}
            onRequestClose={this.closeRegradeModal}
            isOpen={this.state.modal_open}
            ariaHideApp={false}>
            <h2 className={"homeworkTitle"}>
              Regrade Declined. Submitting...
            </h2>
          </Modal>
        );

      case "writing":
        return (
          <Modal
            className={"modalStyle"}
            onRequestClose={this.closeRegradeModal}
            isOpen={this.state.modal_open}
            ariaHideApp={false}>
            <h2 className={"homeworkTitle"}>
              Submitting regrade response...
            </h2>
          </Modal>
        );

      case "submitted":
        return (
          <Modal
            className={"modalStyle"}
            onRequestClose={this.closeRegradeModal}
            isOpen={this.state.modal_open}
            ariaHideApp={false}>
            <h2 className={"homeworkTitle"}>
              Successfully submitted response!
            </h2>
            <div className="makeSpace"/>
            <Row>
              <Col md="5"/>
              <Col md="1">
                <Button type="text" className="submitButton" size="lg" onClick={this.closeRegradeModal}>Return to Regrades</Button>
              </Col>
              <Col md="6"/>
            </Row>
          </Modal>
        );

      default:
        if(this.state.modal_request != null){
          return (
            <Modal
              className={"modalStyle"}
              onRequestClose={this.closeRegradeModal}
              isOpen={this.state.modal_open}
              ariaHideApp={false}>

              <h2 className={"homeworkTitle"}>
                Viewing Regrade Request
              </h2>
              <h2>Student: {this.state.modal_request.student}</h2>
              <h2>Assignment: {this.state.modal_request.name}</h2>
              <h2>Current Score: {this.state.modal_request.score}/{this.state.modal_request.maxscore}</h2>

              <div className={"makeSpace"}/>

              <h2>Reason for Regrade:</h2>
              <Input disabled className={"modalInput"} type={"text"} value={this.state.modal_request.reason}/>

              <div className={"makeSpace"}/>

              <Row>
                <Col xs="0" md="3"/>
                <Col xs="12" md="3">
                  <Button type="text" className="submitButton" size="lg" onClick={this.onAccept}>Accept Request</Button>
                </Col>
                <Col md="0"/>
                <Col md="6">
                  <Button type="text" className="submitButton" size="lg" onClick={this.onDecline}>Decline Request</Button>
                </Col>
                <Col md="1"/>
              </Row>
            </Modal>
          );
        }
    }
  };

  getButton(index, clickBind){
    let buttonText = "View Request";

    return (
      <Button onClick={clickBind}
              style={{backgroundColor: 'white', color: '#21CE99'}}>
        {buttonText}
      </Button>
    );
  };

  render() {

    if(!this.state.doneLoading){
      return (
        <div>
          <Label>
            LOADING
          </Label>
        </div>
      )
    }

    else {
      return (
        <div>
          <Container fluid>
            <Row>
              <Col className={"makeSpace"}>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className={"homeworkTitle"}>Open Regrade Requests</p>
              </Col>
            </Row>
            <Row>
              <Col className={"makeSpace"}>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <Table>
                  <thead>
                  <tr>
                    <th>Student</th>
                    <th>Assignment</th>
                    <th>Score</th>
                    <th>Max Score</th>
                  </tr>
                  </thead>
                  <tbody>
                  {Object.keys(this.state.regrades).map((key, index) => {
                    let boundButtonClick = this.openRegradeModal.bind(this, index);
                    return <tr key={key}>
                      <td>{this.state.regrades[index].student}</td>
                      <td>{this.state.regrades[index].name}</td>
                      <td>{this.state.regrades[index].score}</td>
                      <td>{this.state.regrades[index].maxscore}</td>
                      <td>
                        {this.getButton(index, boundButtonClick)}
                      </td>
                    </tr>
                  })
                  }
                  </tbody>
                </Table>
              </Col>
            </Row>

            <Row>
              <Col>
                {this.getModalContent()}
              </Col>
            </Row>

            <Row>
              <Col className={"moreSpace"}>
              </Col>
            </Row>
          </Container>

        </div>
      )
    }
  }
}

export default RegradeTable