import React, { Component } from 'react';
import {Table, Container, Row, Col, Label, Button, Input } from 'reactstrap';
import { firestore } from "../base";
import Modal from 'react-modal';
import './Table.css'

class RegradeTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: this.props.uid,
      code: this.props.code,
      regrades: [],

      modal_request: {
        assignment: null,
        maxscore: null,
        reason: null,
        score: null,
        student: null,
        studentCode: null,
      },
      modal_index: null,
      modal_open: false,
      reason_input: "",

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
      console.log(self.state.regrades);
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
      modal_open: false,
      modal_index: null,
      reason_input: "",
      submit_status: null,
    });
  };

  onRegradeSubmit = () => {

  };

  getModalContent() {
    switch(this.state.submit_status){

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
            <Button type="text" className="submitButton" size="lg" onClick={this.closeRegradeModal}>Return to Regrades</Button>
          </Modal>
        );

      default:
        return (
          <Modal
            className={"modalStyle"}
            onRequestClose={this.closeRegradeModal}
            isOpen={this.state.modal_open}
            ariaHideApp={false}>

            <h2 className={"homeworkTitle"}>
              View Regrade Request
            </h2>
            <h2>Student: {this.state.modal_request.student}</h2>
            <h2>Assignment: {this.state.modal_request.name}</h2>
            <h2>Current Score: {this.state.modal_request.score}/{this.state.modal_request.maxscore}</h2>

            <div className={"makeSpace"}/>

            <h2>Reason for Regrade:</h2>
            <Input className={"modalInput"} type={"text"} value={this.state.reason_input} onChange={this.updateReasonValue}/>

            <div className={"makeSpace"}/>

            <Col>
              <Button type="text" className="submitButton" size="lg" onClick={this.onRegradeSubmit}>Accept Request</Button>
            </Col>
            <Col>
              <Button type="text" className="submitButton" size="lg" onClick={this.onRegradeSubmit}>Decline Request</Button>
            </Col>
          </Modal>
        );
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