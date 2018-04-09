import React, { Component } from 'react';

import { Nav, NavLink, Container, Row, Col, Button, Card} from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom'
import {firestore} from "../../base";

import MCQ from "../LiveComponents/MCQ";
import FRQ from "./FRQ";
import Video from "./Video";
import MSQ from "./MSQ";
import FIB from "./FIB";

class GenHomework extends Component {

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
      url: null,
      frqResponse: " ",

      homeworkNumber: this.props.homeworkNumber,

      descript: null,
      name: null,
      code: null,
      questions: null,

      score: null,
      mcq: null,
      maxscore: null,
      numOfQuestions: null,
      currentScore: null,
      currentQuestion: null,
      completed: null,
      history: [],
      answers: [],

      multiple: [],
      multi: [],

      finalPage: false,
    }
  }

  componentWillMount() {
    this.getAssignments(this.props.code)
  }

  getAssignments = (classCode) => {

    let self = this;

    let docRef = firestore.collection("classes").doc(self.props.code).collection("homework").doc(self.props.homeworkNumber);

    docRef.get().then(function (doc) {
      if (doc.exists) {
        self.setState({
          descript: doc.data().descript,
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

    let docRef = firestore.collection("users").doc(this.state.uid).collection("homework").doc(this.props.homeworkNumber)

    docRef.get().then((doc) => {
      if (doc.exists) {
        self.setState({
          maxscore: doc.data().maxscore,
          currentScore: doc.data().currentScore,
          currentQuestion: doc.data().currentQuestion,
          completed: doc.data().completed,
          numOfQuestions: doc.data().numOfQuestions,
          history: doc.data().history,
          answers: doc.data().answers,
          mcq: doc.data().mcq,
        }, () => {
          self.setQuestion();
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

    if (quest.type === "MCQ") {
      self.setState({
        correctAns: quest.correctAns,
        option1: quest.option1,
        option2: quest.option2,
        option3: quest.option3,
        option4: quest.option4,
        prompt: quest.prompt,
        type: quest.type,
      });
    } else if (quest.type === "FRQ") {
      self.setState({
        frqResponse: self.state.history[self.state.currentQuestion - 1],
        prompt: quest.prompt,
        type: quest.type,
      });
    } else if (quest.type === "VIDEO") {
      self.setState({
        url: quest.url,
        type: quest.type,
      });
    } else if (quest.type === "SMQ") {
      self.setState({
        correctAns: quest.correctAns,
        option1: quest.option1,
        option2: quest.option2,
        option3: quest.option3,
        option4: quest.option4,
        prompt: quest.prompt,
        type: quest.type,
      });
    }
    else if (quest.type === "FIB") {
      self.setState({
          prompt: quest.prompt,
          type: quest.type,
      })
    }
  };

  /*
 * Increment the page and send the history to fire base
 */
  incPage = () => {
    let self = this;

    let user = firestore.collection("users").doc(this.state.uid).collection("homework").doc(this.state.homeworkNumber)

    if(self.state.type !== "MCQ") {
      self.fillArray()
    }

    user.get().then((doc) => {
      if (doc.exists) {
        if (doc.data().currentQuestion + 1 <= self.state.numOfQuestions) {
          user.update({
            history: self.state.history,
            currentQuestion: self.state.currentQuestion + 1,
            completed: self.state.completed,
            currentScore: self.state.currentScore,
            answers: self.state.answers,
            mcq: self.state.mcq,
          }).then(function () {
            self.getUserAssignment(self.props.code)
          });
        }
        else if (doc.data().currentQuestion + 1 == self.state.numOfQuestions + 1) {
          user.update({
            history: self.state.history,
            completed: self.state.completed,
            currentScore: self.state.currentScore,
            answers: self.state.answers,
            mcq: self.state.mcq,
          }).then(function () {
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
      if(self.state.type !== "MCQ") {
        self.fillArray()
      }

      let user = firestore.collection("users").doc(this.state.uid).collection("homework").doc(this.state.homeworkNumber);

      user.get().then((doc) => {
        if (doc.exists) {
          if (doc.data().currentQuestion - 1 > 0) {
            user.update({
              history: self.state.history,
              currentQuestion: self.state.currentQuestion - 1,
              completed: self.state.completed,
              currentScore: self.state.currentScore,
              answers: self.state.answers,
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
   * Sets the answers array to current correct answer, and
   * updates the history array with the new answer,
   */

  //
  // TODO: Make sure you change set ans to work properly for select multiple since you can unselect aanswers however you plan to do it
  //
  setAns = (answer) => {

    let self = this;
    let tmpHis = self.state.history;
    let ansArr = self.state.answers;

    //Update history array
    for(let i in tmpHis) {
      if(i == self.state.currentQuestion-1)
      {
        tmpHis[i] = answer
      }
    }

    //Update answers array
    for(let i in ansArr) {
      if(i == self.state.currentQuestion-1)
      {
        ansArr[i] = self.state.correctAns
      }
    }

    //Set the states
    self.setState({
      ans: answer,
      answers: ansArr,
      history: tmpHis,
    })
  };

  /*
   * Fill the history array with the FRQ's answer and set it to empty for Video questions
   */
  fillArray = () => {
    let self = this;
    let tmpHis = self.state.history;
    let ansArr = self.state.answers;

    //Update history array
    for(let i in tmpHis) {
      if(i == self.state.currentQuestion-1)
      {
        if(self.state.type === "Video")
          tmpHis[i] = "Video";
        else if(self.state.type === "FRQ")
          tmpHis[i] = self.state.frqResponse;
      }
    }

    //Update answers array
    for(let i in ansArr) {
      if(i == self.state.currentQuestion-1)
      {
        ansArr[i] = "ungraded"
      }
    }

    //Set the states
    self.setState({
      answers: ansArr,
      history: tmpHis,
    })
  };

  /*
   * Sets the completed variable
   */
  checkCompletion = () => {
    let self = this;
    let complete = 0;
    let s  = 0;
    let mcqQuestion = 0;

    let tmpHis = self.state.history;
    let ansArr = self.state.answers;

    //Update history array
    for(let i in tmpHis) {
      if(ansArr[i] !== "")            //Make sure to only grade MCQ
      {
        if(ansArr[i] !== "ungraded")                  //Increment the complete variable if its not empty string
        {
          mcqQuestion += 1;
          if(ansArr[i] === tmpHis[i]) {
            s += 1;
          }
        }
      }
      else
        complete = 1
    }

    if(complete)
      complete = 0;
    else {
      complete = 2;
      //score = s;
      self.setState({
        score: s,
      })
    }
    console.log(s);
    //Set the states
    self.setState({
      mcq: mcqQuestion,
      completed: complete,
      currentScore: s,
    }, () => {
      let docRef = firestore.collection("users").doc(this.state.uid).collection("homework").doc(this.props.homeworkNumber)

      docRef.get().then((doc) => {
        if (doc.exists) {
          if (self.state.score) {
            docRef.update({
              completed: self.state.completed,
              currentScore: self.state.currentScore,
              mcq: self.state.mcq,
              score: self.state.score,
            }).then(function () {
              self.setState({
                currentScore: doc.data().currentScore,
                completed: doc.data().completed,
                mcq: doc.data().mcq,
                score: doc.data().score,
              });
              self.getUserAssignment(self.props.code)
            });
          }
        }
        else {
          docRef.update({
            completed: self.state.completed,
            currentScore: self.state.currentScore,
            mcq: self.state.mcq,
          }).then(function () {
            self.setState({
              currentScore: doc.data().currentScore,
              completed: doc.data().completed,
              mcq: doc.data().mcq,
            });
            self.getUserAssignment(self.props.code)
          });
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    })
  };

  /*
   * Set FRQ state for later use
   */
  setFRQ = (ev) => {
    let self = this;
    self.setState({
      frqResponse: ev,
    })
  };

    setFIB = (ev) => {
        let self = this;
        self.setState({
            fibResponse: ev,
        })
    };


  /*
   * Set the answer history for MSQ
   */
  selectMulti = () => {
    let self = this;
    let tmpHis = self.state.history;
    let ansArr = self.state.answers;

    //Update history array
    for(let i in tmpHis) {
      if(i == self.state.currentQuestion-1)
      {
        tmpHis[i] = "multi"
      }
    }

    //Update answers array
    for(let i in ansArr) {
      if(i == self.state.currentQuestion-1)
      {
        ansArr[i] = self.state.correctAns
      }
    }

    //Set the states
    self.setState({
      answers: ansArr,
      history: tmpHis,
    })
  };

  render() {

    const action = {
      setFRQ: this.setFRQ,
      setFIB: this.setFIB,
      selectMulti: this.selectMulti,
    };

    return (
      <div>
        <Container fluid>
          <Card style={{boxShadow: '8px 8px 3px rgba(0, 0, 0, 0.2)'}}>
            <Row>
              {this.state.type === "MCQ"
                ?
                <MCQ {...action} currentQuestion={this.state.currentQuestion} name={this.state.name} prompt={this.state.prompt}
                     setAns = {this.setAns} finalPage = {this.state.finalPage} oldAns = {this.state.history[this.state.currentQuestion-1]}
                     option1={this.state.option1} option2={this.state.option2} option3={this.state.option3} option4={this.state.option4}/>
                : this.state.type === "FRQ"
                  ?
                  <FRQ {...action} name={this.state.name} currentQuestion={this.state.currentQuestion}
                       prompt = {this.state.prompt} frqResponse = {this.state.frqResponse} finalPage = {this.state.finalPage}/>
                  : this.state.type === "VIDEO"
                    ?
                    <Video name={this.state.name} currentQuestion={this.state.currentQuestion} url = {this.state.url}
                         finalPage = {this.state.finalPage}/>
                    : this.state.type === "SMQ"
                              ?
                              <MSQ currentQuestion={this.state.currentQuestion} name={this.state.name} prompt={this.state.prompt}
                                   setAns = {this.setAns} finalPage = {this.state.finalPage} oldAns = {this.state.history[this.state.currentQuestion-1]}
                                   option1={this.state.option1} option2={this.state.option2} option3={this.state.option3} option4={this.state.option4}/>
                              :
                              <FIB {...action} name={this.state.name} currentQuestion={this.state.currentQuestion}
                                   prompt = {this.state.prompt} fibResponse = {this.state.fibResponse} finalPage = {this.state.finalPage}/>

              }

            </Row>

            {this.state.finalPage
              ?
              <Row>
                <Col xs={{size: 3, offset: 1}}>
                  <div className={"space"}/>
                  <Button onClick={this.decPage}>Last Question</Button>
                </Col>
                <Col xs={4}>
                  <div className={"space"}/>
                  <Button onClick={this.checkCompletion}>Submit Answers</Button>
                </Col>
                {this.state.completed === 2
                  ?
                  <Col xs={4}>
                    <div className={"space"}/>
                    <Nav pills>
                      <RouterLink className="navLinks" to={`/HomePage/${this.state.code}/announcements`}>
                        <NavLink >Return to the classroom page</NavLink>
                      </RouterLink>
                    </Nav>
                  </Col>
                  :
                  <Col>
                    <h4>Not all questions are completed!</h4>
                    <h4>Please answer all questions before continuing.</h4>
                  </Col>
                }
              </Row>
              : this.state.currentQuestion === 1
                ?
                <Row>
                  <Col xs={{size: 5, offset: 1}}>
                    <Button onClick={this.incPage}>Next Question</Button>
                  </Col>
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

export default GenHomework