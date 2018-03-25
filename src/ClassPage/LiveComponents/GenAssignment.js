import React, { Component } from 'react';

import { Nav, NavLink, Container, Row, Col, Button, Card, FormGroup, Label, Input } from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom'
import {firestore} from "../../base";
import MCQ from "./MCQ";

import "./GenAssignment.css"


class GenAssignment extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: this.props.uid,

      option1: null,
      option2: null,
      option3: null,
      option4: null,
      prompt: null,
      type: null,

      lessonNumber: this.props.lessonNumber,

      maxscore: null,
      name: null,
      class: null,
      questions: null,

      numOfQuestions: null,
      currentScore: null,
      currentQuestion: null,
      completed: null,
      answerHistory: null,
    }
  }

  componentWillMount() {
    this.getAssignments(this.props.class)
  }

  /*
   *Decides which question will be picked based on currentQuestion variable
   */
  setQuestion = () => {

    let self = this;

    let quest = this.state.questions;

    self.setState({
      option1: quest[this.state.currentQuestion-1].option1,
      option2: quest[this.state.currentQuestion-1].option2,
      option3: quest[this.state.currentQuestion-1].option3,
      option4: quest[this.state.currentQuestion-1].option4,
      prompt: quest[this.state.currentQuestion-1].prompt,
      type: quest[this.state.currentQuestion-1].type,
    });

  };


  getAssignments = (classCode) => {

    let self = this;

    let docRef = firestore.collection("classes").doc(classCode).collection("inClass").doc(this.state.lessonNumber);

    docRef.get().then(function (doc) {
      if (doc.exists) {
        self.setState({
          maxscore: doc.data().maxscore,
          name: doc.data().name,
          class: classCode,
          questions: doc.data().questions,
        }, () => {
          self.getUserAssignment();
        })
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });


  };


  getUserAssignment = () => {

    console.log("im in it");
    let self = this;

    let docRef = firestore.collection("users").doc(this.state.uid).collection("inClass").doc(this.state.lessonNumber)

    docRef.get().then((doc) => {
      if (doc.exists) {
        self.setState({
          currentScore: doc.data().currentScore,
          currentQuestion: doc.data().currentQuestion,
          completed: doc.data().completed,
          answerHistory: doc.data().answerHistory,
          numOfQuestions: doc.data().numOfQuestions,
        }, () => {
          self.setQuestion();
        })
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  decPage = () => {
    let self = this;

    let user = firestore.collection("users").doc(this.state.uid).collection("inClass").doc(this.state.lessonNumber)

    user.get().then((doc) => {
      if (doc.exists) {
        if(doc.data().currentQuestion-1 > 0) {
          user.update({
            currentQuestion: self.state.currentQuestion - 1,
          }).then(function() {
            self.getUserAssignment(self.props.class)
          });
        }
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  incPage = () => {
    let self = this;

    let user = firestore.collection("users").doc(this.state.uid).collection("inClass").doc(this.state.lessonNumber)

    user.get().then((doc) => {
      if (doc.exists) {
        if(doc.data().currentQuestion+1 <= self.state.numOfQuestions) {
          user.update({
            currentQuestion: self.state.currentQuestion + 1,
          }).then(function() {
              self.getUserAssignment(self.props.class)
          });
        }
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  render() {
    return (
      <div className={"center"}>
        <Container fluid>
          <Card style={{boxShadow: '8px 8px 3px rgba(0, 0, 0, 0.2)'}}>
            <Row>
              <Col sm={{size: 10, offset: 1}}>
                <MCQ currentQuestion={this.state.currentQuestion} name={this.state.name} prompt={this.state.prompt}
                     option1={this.state.option1}
                     option2={this.state.option2} option3={this.state.option3} option4={this.state.option4}/>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Button onClick={this.decPage}>Last Question</Button>
                <br/>
              </Col>
              <Col xs={6}>
                <Button onClick={this.incPage}>Next Question</Button>
                <br/>
              </Col>
            </Row>
            <br/>
          </Card>

        </Container>
      </div>
    )
  }
}

export default GenAssignment