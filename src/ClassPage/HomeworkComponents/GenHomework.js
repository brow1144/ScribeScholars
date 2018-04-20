import React, { Component } from 'react';

import { Nav, Container, Row, Col, Button, Card, CardHeader, CardBody, CardTitle} from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom'
import {firestore} from "../../base";

import MCQ from "../LiveComponents/MCQ";
import FRQ from "./FRQ";
import Video from "./Video";
import MSQ from "./MSQ";
import FIB from "./FIB";

import "./GenHomework.css"

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
      frqResponse: "",

      homeworkNumber: this.props.homeworkNumber,

      descript: null,
      name: null,
      code: null,
      questions: null,

      score: null,
      mcq: null,
      maxScore: null,
      numOfQuestions: null,
      currentScore: null,
      currentQuestion: null,
      completed: null,
      history: [],
      answers: [],

      multiple: null,
      multiHist: [],

      typeArr: [],
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

    let docRef = firestore.collection("users").doc(this.state.uid).collection("homework").doc(this.props.homeworkNumber);

    docRef.get().then((doc) => {
      if (doc.exists) {
        self.setState({
          maxScore: doc.data().maxScore,
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

      let fill = self.state.history[this.state.currentQuestion-1].split(" ");

      // Initialize array for storing the multiple select history
      for (let x = 0; x < 4; x++)
        self.state.multiHist[x] = "";

      // Make multihistory fill up from the correctAns
      for (let x = 0; x < 4; x++) {
        let index = Number(fill[x]);
        if (fill[x] !== "")
          self.state.multiHist[index-1] = fill[x];
      }
    }
    else if (quest.type === "FIB") {
      self.setState({
        frqResponse: self.state.history[self.state.currentQuestion - 1],
        correctAns: quest.correctAns,
        prompt: quest.prompt,
        type: quest.type,
      })
    }


    // Put current question type into the array
    for (let x = 0; x < self.state.numOfQuestions; x++) {
      // Fill our array with the question types
      self.state.typeArr[x] = self.state.questions[x].type;
    }
  };

  /*
 * Increment the page and send the history to fire base
 */
  incPage = () => {
    let self = this;

    let user = firestore.collection("users").doc(this.state.uid).collection("homework").doc(this.state.homeworkNumber)

    if(!(self.state.type === "MCQ") && !(self.state.type === "SMQ")) {
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
        else if (doc.data().currentQuestion + 1 === self.state.numOfQuestions + 1) {
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
      if(!(self.state.type === "MCQ") && !(self.state.type === "SMQ")) {
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
  setAns = (answer) => {

    let self = this;
    let tmpHis = self.state.history;
    let ansArr = self.state.answers;

    //Update history array
    for(let i in tmpHis) {
      // CHANGED EQUALS
      if(Number(i) === self.state.currentQuestion-1)
      {
        tmpHis[i] = answer
      }
    }

    //Update answers array
    for(let i in ansArr) {
      // CHANGED EQUALS
      if(Number(i) === self.state.currentQuestion-1)
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
      // CHANGED EQUALS
      if(Number(i) === self.state.currentQuestion-1)
      {
        if(self.state.type === "Video")
          tmpHis[i] = "Video";
        else if(self.state.type === "FRQ")
          tmpHis[i] = self.state.frqResponse;
        else if(self.state.type === "FIB")
          tmpHis[i] = self.state.frqResponse;
      }
    }

    //Update answers array
    for (let i in ansArr) {
      // CHANGED EQUALS
      if (Number(i) === self.state.currentQuestion-1)
      {
        if (self.state.type === "FIB") {
          ansArr[i] = self.state.correctAns
        }
        else
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

    // Loops over the type array and calcs the grades for MCQ, SMQ, and Fill in the Blank
    for (let i in self.state.typeArr) {
      if (self.state.typeArr[i] === "MCQ") {
        // Check to see that the question is answered
        if (tmpHis[i] !== "") {
          mcqQuestion += 1;
          if (ansArr[i] === tmpHis[i]) {
            s += this.state.questions[i].points;
          }
        }
      } else if (self.state.typeArr[i] === "SMQ") {
        if (tmpHis[i] !== "") {
          mcqQuestion += 1;
          // Get an array of the student's and the correct answers
          let studentAns = self.state.history[i].split(" ");
          let correctAnswer = self.state.answers[i].split(", ");

          let tmpScore = 0;
          // Loop over the answer array and check the answers
          for (let k = 0; k < correctAnswer.length; k ++) {

            if (studentAns[k] !== correctAnswer[k]) {
              // If one of them doesn't match, break
              tmpScore = 0;
              break;
            }
            else
              tmpScore = 1;
          }
          // Check if the tmpScore is set and if it is add a point
          if (tmpScore) {
            s += this.state.questions[i].points;
          }
        }
      } else if (self.state.typeArr[i] === "FIB") {
        // This if checks that the question is answered
        if (tmpHis[i] !== "") {
          mcqQuestion += 1;
          if (ansArr[i].toUpperCase() === tmpHis[i].toUpperCase()) {
            s += this.state.questions[i].points;
          }
        }
      }
    }


    // Check to see if homework is done
    if(mcqQuestion) {
      complete = 2;
      self.setState({
        score: s,
      });
    }

    //Set the states
    self.setState({
      mcq: mcqQuestion,
      completed: complete,
      currentScore: s,
    }, () => {
      let docRef = firestore.collection("users").doc(this.state.uid).collection("homework").doc(this.props.homeworkNumber);

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

  /*
   * Sets the fill in the blank variable
   */
  setFIB = (ev) => {
    let self = this;
    self.setState({
      frqResponse: ev,
    })
  };


  /*
   * Set the answer history for MSQ using a compressed answer string
   * Also figure out how to check this new string to pre-select answers for history
   */
  selectMulti = (num) => {
    let self = this;
    let tmpHis = self.state.history;
    let ansArr = self.state.answers;
    let mult = self.state.multiHist;

    let tmp = Number(num);
    let str = "";


    //Set the current multiHistory array to the new variable
    for (let i in mult) {
      // CHANGED EQUALS
      if (Number(i) === tmp-1)
      {
        if (mult[i] === "") {
          mult[i] = num;
        }
        else
          mult[i] = "";
      }

      // Makes a string out of the variables selected
      // CHANGED EQUALS
      if (mult[i] !== "") {
        str += mult[i] + " ";
      }
    }

    //Convert multihistory to a string smashed together


    //Update history array
    for(let i in tmpHis) {
      // CHANGED EQUALS
      if(Number(i) === self.state.currentQuestion-1)
      {
        tmpHis[i] = str;
      }
    }

    //Update answers array
    for(let i in ansArr) {
      // CHANGED EQUALS
      if(Number(i) === self.state.currentQuestion-1)
      {
        ansArr[i] = self.state.correctAns
      }
    }

    //Set the states
    self.setState({
      answers: ansArr,
      history: tmpHis,
      multiHist: mult,
    })
  };

  render() {

    const action = {
      setFRQ: this.setFRQ,
      setFIB: this.setFIB,
      selectMulti: this.selectMulti,
      setAns: this.setAns,
    };

    const data = {
      currentQuestion: this.state.currentQuestion,
      name: this.state.name,
      prompt: this.state.prompt,
      finalPage: this.state.finalPage,
      oldAns: this.state.history[this.state.currentQuestion-1],
      option1: this.state.option1,
      option2: this.state.option2,
      option3: this.state.option3,
      option4: this.state.option4,
      frqResponse: this.state.frqResponse,
      url: this.state.url,
      multiHist: this.state.multiHist,
    };

    return (
      <div>
        {!this.state.finalPage
          ?
          <Container fluid>
            <Row>
              <Col xs={1} lg={4}/>
              <Col xs={10} lg={4}>
                <Card style={{
                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                  margin: 'auto',
                }}>
                  <CardHeader tag="h2">{this.state.name}: Question {this.state.currentQuestion}</CardHeader>
                  <Row>
                    <Col xs={1}/>
                    {this.state.type === "MCQ"
                      ?
                      <MCQ {...action} {...data}/>
                      : this.state.type === "FRQ"
                        ?
                        <FRQ {...action} {...data}/>
                        : this.state.type === "VIDEO"
                          ?
                          <Video {...action} {...data}/>
                          : this.state.type === "SMQ"
                            ?
                            <MSQ {...action} {...data}/>
                            :
                            <FIB {...action} {...data}/>

                    }
                    <Col xs={1}/>
                  </Row>
                  <br/>
                  {this.state.currentQuestion === 1
                    ?
                    <Row>
                      <Col xs={{size: 1, offset: 1}} lg={{size: 5, offset: 1}}>
                        <Button onClick={this.incPage}>Next Question</Button>
                      </Col>
                    </Row>
                    :
                    <Row>
                      <Col xs={{size: 2, offset: 1}} lg={{size: 5, offset: 1}}>
                        <Button onClick={this.decPage}>Last Question</Button>
                      </Col>
                      <Col xs={{size: 2, offset: 3}} lg={{size: 3, offset: 1}}>
                        <Button onClick={this.incPage}>Next Question</Button>
                      </Col>
                    </Row>
                  }
                  <br/>
                </Card>
              </Col>
              <Col xs={1} lg={4}/>
            </Row>
          </Container>
          :
          <Container>
            <Row>
              <Col xs={0} lg={0}/>
              <Col xs={12} lg={12}>
                {/*TODO set the card width based on screen size, small screens need to be wayy bigger*/}
                <Card style={{
                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                  margin: 'auto',
                }}>
                  <CardHeader tag="h3" className={"titleCar"}>End of the Assignment</CardHeader>
                  {this.state.completed !== 2
                    ?
                    <CardBody>
                      <CardTitle tag={"p"} className={"cardTextStyle"}>
                        Not all questions are completed! Answer all questions before continuing
                      </CardTitle>
                    </CardBody>
                    : null
                  }
                  <Row>
                    <Col xs={2} md={{size: 2, offset: 1}}>
                      <div className={"space"}/>
                      <Button onClick={this.decPage}>Last Question</Button>
                    </Col>
                    <Col xs={{size: 3, offset: 1}}>
                      <div className={"space"}/>
                      <Button onClick={this.checkCompletion}>Submit Answers</Button>
                    </Col>
                    {this.state.completed === 2
                      ?
                      <Col xs={4}>
                        <div className={"space"}/>
                        <Nav pills>
                          <RouterLink className="navLinks" to={`/ScribeScholars/HomePage/${this.state.code}/homework`}>
                            <Button>Return to the classroom page</Button>
                          </RouterLink>
                        </Nav>
                      </Col>
                      : null
                    }
                  </Row>
                  <br/>
                </Card>
              </Col>
              <Col xs={0} lg={0}/>
            </Row>
          </Container>
        }

        }
      </div>
    )
  }
}

export default GenHomework