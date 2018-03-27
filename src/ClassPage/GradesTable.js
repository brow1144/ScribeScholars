import React, { Component } from 'react';
import {Table, Container, Row, Col, Label, Button, Input } from 'reactstrap';
import { firestore } from "../base";
import Modal from 'react-modal';
import './Table.css'

class GradesTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: this.props.uid,
      code: this.props.code,

      gradeData: [],
      score: 0,
      max_score: 0,

      regrade_open: false,
      reason_input: "",
      submit_status: null,
      modal_assignment: {
        name: null,
        score: null,
        maxscore: null,
      },
      studentName: null,
      modal_index: null,

      doneLoading: false,
    };

    let self = this;

    //Get data on grades
    let docRef = firestore.collection("users").doc(this.props.uid).collection("assignments").doc(this.props.code);
    docRef.get().then(function (doc) {

      self.setState({
        gradeData: doc.data().grades
      });

    }).then( function () {

      for(let i = 0; i < self.state.gradeData.length; i++){
        self.addScore(self.state.gradeData[i].score, self.state.gradeData[i].maxscore);
      }

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

    //Get students full name
    let studentRef = firestore.collection("users").doc(this.props.uid);
    studentRef.get().then(function (doc) {
      self.setState({ studentName: GradesTable.getFullName(doc.data().firstName, doc.data().lastName)})
    }).then(function (){
      self.setState({ doneLoading: true });
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  };

  //Modal handling
  openRegradeModal = (index) => {
    let self = this;
    self.setState({
      modal_assignment: this.state.gradeData[index],
      modal_index: index,
      regrade_open: true,
    });
  };

  closeRegradeModal = () => {
    let self = this;
    self.setState({
      modal_assignment: {
        name: null,
        score: null,
        maxscore: null,
      },
      modal_index: null,
      regrade_open: false,
      submit_status: "closed",
      reason_input: "",
    });
  };

  updateReasonValue = (evt) => {
    let self = this;
    self.setState({ reason_input: evt.target.value });
  };

  //Gets students full name
  static getFullName(first, last){
    return first + " " + last;
  };

  //Regrade request handling
  onRegradeSubmit = () => {
    let self = this;
    self.setState({ submit_status: "writing" });

    let request = {
      name: this.state.modal_assignment.name,
      maxscore: this.state.modal_assignment.maxscore,
      reason: this.state.reason_input,
      score: this.state.modal_assignment.score,
      student: this.state.studentName,
      studentCode: this.props.uid,
    }

    //Get student's assignment list for updating regrade_status
    let docRef = firestore.collection("users").doc(this.props.uid).collection("assignments").doc(this.props.code);
    docRef.get().then(function () {

      let assignment = self.state.gradeData[self.state.modal_index];
      assignment.regrade_status = "pending";

      docRef.update({
        grades: self.state.gradeData,
      }).catch(function (error) {
        console.log("Error updating document:", error);
      });

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

    //Get class reference for updating all pending requests
    let classRef = firestore.collection("classes").doc(this.props.code);
    classRef.get().then(function (doc) {

      let allRequests = doc.data().regrades;

      if (allRequests != null) {
        allRequests.push(request);
      } else {
        allRequests = request;
      }

      classRef.update({
        regrades: allRequests
      }).then(function() {

        self.setState({
          submit_status: "submitted",
        });

      }).catch(function(error) {
        console.log("Error updating document: ", error);
      });

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }

  //Function for calculating total score
  addScore = (score, maxscore) => {
    let self = this;
    let sc = +self.state.score;
    let m_sc = +self.state.max_score;

    sc += +score;
    m_sc += +maxscore;

    self.setState({
      score: sc,
      max_score: m_sc,
    });
  };

  getModalContent() {
    switch(this.state.submit_status){

      case "writing":
        return (
          <Modal
            className={"modalStyle"}
            onRequestClose={this.closeRegradeModal}
            isOpen={this.state.regrade_open}
            ariaHideApp={false}>
            <h2 className={"homeworkTitle"}>
              Submitting request...
            </h2>
          </Modal>
        );

      case "submitted":
        return (
          <Modal
            className={"modalStyle"}
            onRequestClose={this.closeRegradeModal}
            isOpen={this.state.regrade_open}
            ariaHideApp={false}>
            <h2 className={"homeworkTitle"}>
              Successfully submitted request!
            </h2>
            <div/>
            <h4 className={"homeworkTitle"}>Your request is pending instructor review.</h4>
            <div/>
            <Button type="text" className="submitButton" size="lg" onClick={this.closeRegradeModal}>Return to Assignments</Button>
          </Modal>
        );

      default:
        return (
          <Modal
            className={"modalStyle"}
            onRequestClose={this.closeRegradeModal}
            isOpen={this.state.regrade_open}
            ariaHideApp={false}>

            <h2 className={"homeworkTitle"}>
              Request Regrade
            </h2>
            <h2>Assignment: {this.state.modal_assignment.name}</h2>
            <h2>Score: {this.state.modal_assignment.score}/{this.state.modal_assignment.maxscore}</h2>

            <div className={"makeSpace"}/>

            <h2>Reason for Regrade:</h2>
            <Input className={"modalInput"} type={"text"} value={this.state.reason_input} onChange={this.updateReasonValue}/>

            <div className={"makeSpace"}/>

            <Button type="text" className="submitButton" size="lg" onClick={this.onRegradeSubmit}>Submit Request</Button>
          </Modal>
        );
    }
  }

  getButton(index, clickBind){
    let buttonText = "Request Regrade";
    let regrade_status = this.state.gradeData[index].regrade_status;
    if(regrade_status != null){
      clickBind = null;
      switch(regrade_status){
        case "pending":
          buttonText = "Regrade Pending";
          break;
        case "accepted":
          buttonText = "Regrade Accepted";
          break;
        case "declined":
          buttonText = "Regrade Declined";
          break;
        default:
          break;
      }
    }

    return (
      <Button onClick={clickBind}
              style={{backgroundColor: 'white', color: '#21CE99'}}>
        {buttonText}
      </Button>
    );
  }

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
                <p className={"homeworkTitle"}>Grades</p>
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
                    <th>Assignment</th>
                    <th>Score</th>
                    <th>Max Score</th>
                    <th>Regrades</th>
                  </tr>
                  </thead>
                  <tbody>
                  {Object.keys(this.state.gradeData).map((key, index) => {
                    let boundButtonClick = this.openRegradeModal.bind(this, index);
                    return <tr key={key}>
                      <td>{this.state.gradeData[index].name}</td>
                      <td>{this.state.gradeData[index].score}</td>
                      <td>{this.state.gradeData[index].maxscore}</td>
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

            <Row>
              <Col xs={12}>
                <Table>
                  <thead>
                  <tr>
                    <th>Total: {this.state.score}/{this.state.max_score}</th>
                  </tr>
                  </thead>
                </Table>
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
};

export default GradesTable