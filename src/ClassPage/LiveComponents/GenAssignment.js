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

      correctAns: null,
      option1: null,
      option2: null,
      option3: null,
      option4: null,
      prompt: null,
      type: null,

      lessonNumber: this.props.lessonNumber,

      name: null,
      code: null,
      questions: null,

      maxScore: null,
      numOfQuestions: null,
      currentScore: null,
      currentQuestion: null,
      answerHistory: null,
      completed: null,
      history: [],
      status: [],
      gradeScore: 0,

      ans: null,

      finalPage: false,
    }
  }

  componentWillMount() {
    this.getAssignments(this.props.code)
  }

  getAssignments = (classCode) => {

    let self = this;

    let docRef = firestore.collection("classes").doc(self.props.code).collection("inClass").doc(self.props.lessonNumber);

    docRef.get().then(function (doc) {
      if (doc.exists) {
        self.setState({
          name: doc.data().name,
          code: self.props.code,
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

    let docRef = firestore.collection("users").doc(self.props.uid).collection("inClass").doc(self.props.lessonNumber);

    docRef.get().then((doc) => {
      if (doc.exists) {
        self.setState({
          maxScore: doc.data().maxScore,
          currentScore: doc.data().currentScore,
          currentQuestion: doc.data().currentQuestion,
          completed: doc.data().completed,
          answerHistory: doc.data().answerHistory,
          numOfQuestions: doc.data().numOfQuestions,
          history: doc.data().history,
          status: doc.data().questions,
        }, () => {
          self.setQuestion();
          self.checkCompletion();
        })
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  /*
   *Decides which question will be picked based on currentQuestion variable
   */
  setQuestion = () => {

    let self = this;

    let quest = this.state.questions[this.state.currentQuestion - 1];

    self.setState({
      correctAns: quest.correctAns,
      option1: quest.option1,
      option2: quest.option2,
      option3: quest.option3,
      option4: quest.option4,
      prompt: quest.prompt,
      type: quest.type,
      points: quest.points,
    });
  };

  /*
 * Increment the page and send the history to fire base
 */
  incPage = () => {
    let self = this;

    let user = firestore.collection("users").doc(this.state.uid).collection("inClass").doc(this.state.lessonNumber)

    user.get().then((doc) => {
      if (doc.exists) {
        if(doc.data().currentQuestion+1 <= self.state.numOfQuestions) {
          user.update({
            history: self.state.history,
            currentQuestion: self.state.currentQuestion + 1,
            questions: self.state.status,
            completed: self.state.completed,
            answerHistory: self.state.answerHistory,
            currentScore: self.state.currentScore,
          }).then(function() {
            self.getUserAssignment(self.props.code)
          });
        }
        else if(doc.data().currentQuestion+1 == self.state.numOfQuestions+1) {
          user.update({
            history: self.state.history,
            questions: self.state.status,
            completed: self.state.completed,
            answerHistory: self.state.answerHistory,
            currentScore: self.state.currentScore,
            score: self.state.gradeScore,
          }).then(function() {
            self.setState({
              finalPage: true,
            });
            self.getUserAssignment(self.props.code)
          });
        }

      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  decPage = () => {
    let self = this;

    if (this.state.finalPage) {
      self.setState({
        finalPage: false,
      })
    }
    else {
      let user = firestore.collection("users").doc(this.state.uid).collection("inClass").doc(this.state.lessonNumber);

      user.get().then((doc) => {
        if (doc.exists) {
          if (doc.data().currentQuestion - 1 > 0) {
            user.update({
              history: self.state.history,
              currentQuestion: self.state.currentQuestion - 1,
              questions: self.state.status,
              completed: self.state.completed,
              answerHistory: self.state.answerHistory,
              currentScore: self.state.currentScore,
            }).then(function () {
              self.getUserAssignment(self.props.code)
            });
          }
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    }
  };

  /*
   * Sets the answer to current selected answer,
   * updates the history array with the new answer,
   * check the completion status, and
   * checks if the answer given is right, and calc current score
   */
  setAns = (answer) => {

    let self = this;
    let tmpHis = self.state.history;
    let tmpStat = self.state.status;

    //Update history array
    for(let i in tmpHis) {
      if(i == self.state.currentQuestion-1)
      {
        tmpHis[i] = answer
      }
    }

    //Update status array
    for(let i in tmpStat) {
      if(i == self.state.currentQuestion-1)
      {
        if(answer === self.state.correctAns){
          tmpStat[i] = "1";
        }
        else{
          tmpStat[i] = "0";
        }
      }
    }

    //Check for completion variable
    let check = 0;
    for(let i in self.state.status) {
      if(self.state.status[i] !== "2"){
        check += 1;
      }
    }

    let num = 0;
    if(check === self.state.numOfQuestions)
      num = 2;
    else if(check === 0)
      num = 0;
    else
      num = 1;

    //Calc the grade
    self.updateGrade();


    //Set the states
    self.setState({
      ans: answer,
      history: tmpHis,
      status: tmpStat,
      completed: num,
    })


  };

  updateGrade = () => {
    let self = this;

    let tmpGrade = self.state.answerHistory;
    let tmpGradeScore = this.state.gradeScore;
    let percentage = 0;

    if (this.state.status[this.state.currentQuestion - 1] == "1")
      tmpGradeScore += this.state.points;

    for(let i in tmpGrade) {                              //i starts at 0 and is the index for tmp grade array
      if(i == self.state.currentQuestion-1) {             //find the current question which we want to update
        for(let j = 0;  j <= i; j++) {                  //loop over previous questions to find current
          if(self.state.status[j] == "1") {             //if the question is wrong, take the percentage and divide it by
            percentage += 1;
          }
        }
      }
    }
    tmpGrade[self.state.currentQuestion-1] = percentage/(self.state.currentQuestion) * 100;

    let score = percentage/(self.state.currentQuestion) * 100;

    self.setState({
      answerHistory: tmpGrade,
      currentScore: score,
      gradeScore: tmpGradeScore,
    })
  };

  checkCompletion = () => {
    let check = 0;
    for(let i in this.state.status) {
      if(this.state.status[i] !== "2"){
        check += 1;
      }
    }

    let num = 0;

    if(check === this.state.numOfQuestions) {
      num = "2";
    }
    else if(check === 0) {
      num = "0";
    }
    else {
      num = "1";
    }

    this.setState({
      completed: num,
    });
  };

  /*
   * Reset the currentQuestion to 1 when you return to the homepage
   */
  resetQuest = () => {
    let self = this;

    let user = firestore.collection("users").doc(this.state.uid).collection("inClass").doc(this.state.lessonNumber)

    user.get().then((doc) => {
      if (doc.exists) {
        user.update({
          currentQuestion: 1,
        }).then(function () {
          self.setState({
            currentQuestions: self.state.currentQuestions
          });
        });
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  render() {
    return (
      <div className={"center"}>
        <Container fluid>
          <Card style={{boxShadow: '8px 8px 3px rgba(0, 0, 0, 0.2)'}}>
            <Row>
              <MCQ currentQuestion={this.state.currentQuestion} name={this.state.name} prompt={this.state.prompt}
                   setAns = {this.setAns} finalPage = {this.state.finalPage} oldAns = {this.state.history[this.state.currentQuestion-1]}
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
                {this.state.completed === "2"
                  ?
                  <Col xs={6}>
                    <div className={"space"}/>
                    <Nav pills>
                      <RouterLink className="navLinks" to={`/ScribeScholars/HomePage/${this.state.code}/announcements`}>
                        <NavLink >Return to the classroom page</NavLink>
                      </RouterLink>
                    </Nav>
                  </Col>
                  :
                   <Col>
                     <h3>Not all questions are completed!</h3>
                     <h3>Please answer all questions before continuing.</h3>
                   </Col>
                }
              </Row>
              :
              <Row>
                <Col xs={{size: 5, offset: 1}}>
                  <Button onClick={this.decPage}>Last Question</Button>
                  <Button onClick={this.incPage}>Next Question</Button>
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