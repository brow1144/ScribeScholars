import React, { Component } from 'react';

import { Nav, NavLink, Container, Row, Col, Button, Card} from 'reactstrap';
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

      ans: null,
      history: [],

      finalPage: false,
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
      finalPage: false,
      option1: quest[this.state.currentQuestion - 1].option1,
      option2: quest[this.state.currentQuestion - 1].option2,
      option3: quest[this.state.currentQuestion - 1].option3,
      option4: quest[this.state.currentQuestion - 1].option4,
      prompt: quest[this.state.currentQuestion - 1].prompt,
      type: quest[this.state.currentQuestion - 1].type,
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
          history: doc.data().history,
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

    console.log(this.state.currentQuestion);

    user.get().then((doc) => {
      if (doc.exists) {
        if(doc.data().currentQuestion-1 > 0) {
          user.update({
            history: self.state.history,
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

  /*
   * Increment the page and send the history to fire base
   */
  incPage = () => {
    let self = this;

    let user = firestore.collection("users").doc(this.state.uid).collection("inClass").doc(this.state.lessonNumber)

    user.get().then((doc) => {
      if (doc.exists) {
        console.log(doc.data().currentQuestion+1);
        console.log(self.state.numOfQuestions);
        console.log(doc.data().currentQuestion+1 == self.state.numOfQuestions+1);

        if(doc.data().currentQuestion+1 <= self.state.numOfQuestions) {
          user.update({
            history: self.state.history,
            currentQuestion: self.state.currentQuestion + 1,
          }).then(function() {
            self.getUserAssignment(self.props.class)
          });
        }
        else if(doc.data().currentQuestion+1 == self.state.numOfQuestions+1) {
          user.update({
            currentQuestion: self.state.currentQuestion + 1,
            history: self.state.history,
          }).then(function() {
            self.setState({
              history: self.state.history,
              currentQuestion: self.state.currentQuestion + 1,
              finalPage: true,
              option1: null,
              option2: null,
              option3: null,
              option4: null,
              prompt: null,
              type: null,
            });
          });
        }
        else{
          user.update({
            history: self.state.history,
          }).then(function() {
            self.getUserAssignment(self.props.class)
          });
        }
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  /*
   * When the next button is clicked, send the ans saved to firebase
   */
  sendAns = () => {
    let self = this;

    let user = firestore.collection("users").doc(this.state.uid).collection("inClass").doc(this.state.lessonNumber)

    user.get().then((doc) => {
      if (doc.exists) {
        console.log("About to update");
        user.update({
          history: self.state.history,
        }).then(function () {
          console.log("I updated and now moving pages");
          self.getUserAssignment(self.props.class)
        });
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  /*
   * Sets the answer to current selected answer, also updates the history array with the new answer
   */
  setAns = (answer) => {

    let self = this;
    let tmp = self.state.history;

    for(let i in tmp) {
      if(i == self.state.currentQuestion-1)
      {
        tmp[i] = answer
      }
    }

    this.setState({
      ans: answer,
      history: tmp,
    })

  }

  render() {
    return (
      <div className={"center"}>
        <Container fluid>
          <Card style={{boxShadow: '8px 8px 3px rgba(0, 0, 0, 0.2)'}}>
            <Row>
              <MCQ currentQuestion={this.state.currentQuestion} name={this.state.name} prompt={this.state.prompt} setAns = {this.setAns} finalPage = {this.state.finalPage}
                       option1={this.state.option1} option2={this.state.option2} option3={this.state.option3} option4={this.state.option4}/>
            </Row>

            {this.state.finalPage
              ?
              <Row>
                <Col xs={6}>
                  <div className={"space"}/>
                  <Button onClick={this.decPage}>Last Question</Button>
                  <br/>
                </Col>
                <Col xs={6}>
                  <div className={"space"}/>
                  <Nav pills>
                    <RouterLink className="navLinks" to={`/HomePage/${this.state.class}/announcements`}>
                      <NavLink>Return to the classroom page</NavLink>
                    </RouterLink>
                  </Nav>
                </Col>
              </Row>
              :
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
            }
            <br/>
          </Card>

        </Container>
      </div>
    )
  }
}

export default GenAssignment