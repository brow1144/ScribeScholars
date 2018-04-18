import React, { Component } from 'react';
import {Table, Container, Row, Col, Label, Button, Input } from 'reactstrap';
import { firestore } from "../base";
import Modal from 'react-modal';
import './Table.css'

class RegradeTable extends Component { //TODO if Firebase Regrade collection is enmpty doneLoading is never set

  constructor(props) {
    super(props);

    this.state = {
      uid: this.props.uid,
      code: this.props.code,
      regrades: [],

      modal_request: null,
      modal_index: null,
      modal_doc_id: null,
      modal_open: false,

      input_score: "",

      submit_status: null,
      doneLoading: false,
    };

    let regradeRef = firestore.collection("classes").doc(this.state.code).collection("regrades");
    regradeRef.get().then((snapshot) => {
      let i = 0;
      snapshot.forEach((doc) => {
        i++;
        if (doc.data().class === this.state.code) {
          this.setState({
            regrades: this.state.regrades.concat(doc.data()),
          });
        }
        if(i === snapshot.docs.length){
          this.setState({
            doneLoading: true,
          });
        }
      });
    }).catch((error) => {
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
      submit_status: null,
      input_score: null,
    });
  };

  //Called after teacher enters student's new grade
  onSubmitFinalScore = () => {
    let self = this;
    self.setState({ submit_status: "writing" });
    self.handleUpdating("accepted", this.state.input_score);
  };

  updateInputScore = (evt) => {
    let self = this;
    self.setState({ input_score: evt.target.value });
  };

  //Called when regrade is accepted
  onAccept = () => {
    let self = this;
    self.setState({ submit_status: "accepted" });
  };

  //Called when regrade is declined
  onDecline = () => {
    let self = this;
    self.setState({ submit_status: "declined" });
    self.handleUpdating("declined", null);
  };

  //Handles updating after the forms have been submitted
  handleUpdating(accOrDec, newScore){
    let self = this;
    let response = null;
    let request = this.state.modal_request;
    firestore.collection("users").doc(request.studentCode).collection(request.type).doc(request.userDocCode).get().then(function (doc){
      response = doc.data();
      response.regradeStatus = accOrDec;
      if(newScore != null){
        response.score = newScore;
      }
      self.updateStudentDoc(response);
    }).catch(function (error){
      console.error("Error getting document " + (error));
    });
  }

  //Deletes the regrade from the regrade collection of the class and sets submit status to submitted
  deleteRegradeDoc() {
    let self = this;
    firestore.collection("classes").doc(this.state.code).collection("regrades").doc(this.state.modal_request.requestCode).delete().then(function (){
      self.setState({ submit_status: "submitted"});
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  };

  //Updates the student's regrade collection with the contents of response.
  //Response should come from getUserAssignment
  updateStudentDoc(response) {
    let self = this;
    //Get class reference for updating all pending requests
    let studentRef = firestore.collection("users").doc(this.state.modal_request.studentCode).collection(this.state.modal_request.type).doc(this.state.modal_request.userDocCode);
    studentRef.set(response).then(function (doc){
      self.deleteRegradeDoc();
    }).catch(function (error) {
      console.error("Error setting doc", (error));
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
              Please enter {this.state.modal_request.studentName}'s new grade for {this.state.modal_request.name}.
            </h4>
            <div className="makeSpace"/>

            <Row>
              <Col xs="0" md="3"/>
              <Col xs="12" md="4">
                <Input type="text" bsSize="lg" value={this.state.input_score} onChange={this.updateInputScore}/>
              </Col>
              <Col md="4">
                <h3>{"/" + this.state.modal_request.maxScore}</h3>
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
              <h2>Student: {this.state.modal_request.studentName}</h2>
              <h2>Assignment: {this.state.modal_request.name}</h2>
              <h2>Current Score: {this.state.modal_request.score}/{this.state.modal_request.maxScore}</h2>

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
                      <td>{this.state.regrades[index].studentName}</td>
                      <td>{this.state.regrades[index].name}</td>
                      <td>{this.state.regrades[index].score}</td>
                      <td>{this.state.regrades[index].maxScore}</td>
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