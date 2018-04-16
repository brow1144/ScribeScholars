import React, {Component} from 'react';

import {Container, Row, Col, Input, Label, Form, FormGroup, Button} from 'reactstrap';

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/react-accessible-accordion.css';
import './EditActivity.css';
import {firestore} from "../base";
import MCQForm from './MCQEdit';
import FRQForm from './FRQEdit';
import SMQForm from './SMQEdit';
import VideoForm from './VideoEdit';
import FIBForm from './FIBEdit';



class EditActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialCreate: true,
      uid: props.uid,
      role: this.props.role,
      class: this.props.class,
      questions: [],
      typeArray: [],
      question: {},
      hwCode: null,
      title: "",
      totalPoints: 0,
      key: true,
    };
  }

  componentWillMount() {
    this.grabQuestions()
  };

  recordQuestion = (quest, index) => {

    let tempArr = this.state.questions;

    tempArr.splice(index, 1, quest);

    let tempTotalPoints = this.state.totalPoints + tempArr[index].points;

    this.setState({
      questions: tempArr,
      totalPoints: tempTotalPoints,
    });
  };

  grabQuestions = () => {
    let self = this;

    // the classes' assignment collection reference
    let assRef;


    if (this.props.assType === "Lesson")
      assRef = firestore.collection("classes").doc(this.props.class).collection("inClass").doc(this.props.lessonNumber);
    else
      assRef = firestore.collection("classes").doc(this.props.class).collection("homework").doc(this.props.lessonNumber);

    assRef.get().then(function (doc) {
      if (doc.exists) {
        if (doc.data().questions != null) {
          self.setState({
            questions: doc.data().questions,
          });
        }
      } else {
        console.log("user not found");
      }


    }).catch(function (error) {
      console.log("Error getting document: ", error);
    });
  };

  onFormSubmit = (ev) => {
    ev.preventDefault();
    let tempArr = this.state.questions;
    let tempQ;
    switch (ev.target.select.value) {
      case "Multiple Choice":
        tempQ = {
          correctAns: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          prompt: "",
          points: "",
          type: "MCQ",
        };
        tempArr.push(tempQ);
        break;
      case "Fill in the Blank":
        tempQ = {
          correctAns: "",
          prompt: "",
          points: "",
          type: "FIB",
        };
        tempArr.push(tempQ);
        break;
      case "Select Multiple":
        tempQ = {
          correctAns: [],
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          prompt: "",
          points: "",
          type: "SMQ",
        };
        tempArr.push(tempQ);
        break;
      case "Free Response":
        tempQ = {
          prompt: "",
          points: "",
          type: "FRQ",
        };
        tempArr.push(tempQ);
        break;
      case "Video Page":
        tempQ = {
          url: "",
          points: "",
          type: "VIDEO",
        };
        tempArr.push(tempQ);
        break;
      default:
        console.log("Error");
    }
    this.setState({
      questions: tempArr,
    });
  };

  publishAss = () => {
    let self = this;
    let homeworkRef;// = firestore.collection("classes").doc(this.props.code).collection("Homework").doc("39489037");
    if (this.props.assType === "Lesson")
      homeworkRef = firestore.collection("classes").doc(self.props.class).collection("inClass").doc(self.props.lessonNumber);
    else
      homeworkRef = firestore.collection("classes").doc(self.props.class).collection("homework").doc(self.props.lessonNumber);

    homeworkRef.update({
      questions: self.state.questions,
      maxScore: self.state.totalPoints,
    }).then(function () {
      console.log("Successfully added a question");

    }).catch(function (error) {
      console.log("Error updating document: ", error);
    });

    let classRef = firestore.collection("classes").doc(self.props.class);

    classRef.get().then(function (doc) {
      if (doc.exists) {
        let tempArr = doc.data().students;

        let tempAnsHis = new Array(self.state.questions.length);
        for (let i = 0; i < tempAnsHis.length; i++) {
          tempAnsHis[i] = 0;
        }

        let tempHist = new Array(self.state.questions.length);
        for (let i = 0; i < tempHist.length; i++) {
          tempHist[i] = "";
        }

        let tempQuests = new Array(self.state.questions.length);
        for (let i = 0; i < tempQuests.length; i++) {
          tempQuests[i] = "2";
        }
        for (let i = 0; i < tempArr.length; i++) {
          let studentRef;
          if (self.props.assType === "Lesson") {
            studentRef = firestore.collection("users").doc(tempArr[i]).collection("inClass").doc(self.props.lessonNumber);
            studentRef.get().then(function (doc) {
              if (doc.exists) {
                studentRef.update({
                  answerHistory: tempAnsHis,
                  class: self.props.class,
                  completed: "",
                  currentQuestion: 1,
                  currentScore: 0,
                  maxScore: self.state.totalPoints,
                  name: self.state.title,
                  numOfQuestions: self.state.questions.length,
                  questions: tempQuests,
                  history: tempHist,

                }).then(function () {
                  console.log("successfully written!");
                }).catch(function (error) {
                  console.log(error);
                });
              } else {
                studentRef.set({
                  answerHistory: tempAnsHis,
                  class: self.props.class,
                  completed: "",
                  currentQuestion: 1,
                  currentScore: 0,
                  maxScore: self.state.totalPoints,
                  name: self.state.title,
                  numOfQuestions: self.state.questions.length,
                  questions: tempQuests,
                  history: tempHist,

                }).then(function () {
                  console.log("successfully written!");
                }).catch(function (error) {
                  console.log(error);
                });
              }
            }).catch(function (error) {
              console.log("Error getting document: ", error);
            });
          }
          else {
            studentRef = firestore.collection("users").doc(tempArr[i]).collection("homework").doc(self.props.lessonNumber);
            studentRef.get().then(function (doc) {
              if (doc.exists) {
                studentRef.update({
                  answers: tempHist,
                  class: self.props.class,
                  completed: 0,
                  currentQuestion: 1,
                  currentScore: 0,
                  mcq: 0,
                  maxScore: self.state.totalPoints,
                  name: self.state.title,
                  numOfQuestions: self.state.questions.length,
                  history: tempHist,

                }).then(function () {
                  console.log("successfully written!");
                }).catch(function (error) {
                  console.log(error);
                })
              } else {
                studentRef.set({
                  answers: tempHist,
                  class: self.props.class,
                  completed: 0,
                  currentQuestion: 1,
                  currentScore: 0,
                  mcq: 0,
                  maxScore: self.state.totalPoints,
                  name: self.state.title,
                  numOfQuestions: self.state.questions.length,
                  history: tempHist,

                }).then(function () {
                  console.log("successfully written!");
                }).catch(function (error) {
                  console.log(error);
                });
              }
            }).catch(function (error) {
              console.log("Error getting document: ", error);
            });
          }
        }
      }
    })
  };

  handleDeleteClick = (index) => {
    let tempArr = this.state.questions;
    tempArr.splice(index, 1);
    this.setState({
      questions: tempArr,
      key: !this.state.key,
    });
  };


  render() {
    return(
      <Container fluid className={"ContainerRules"}>
        <hr style={{marginRight: '-20px', marginLeft: '-20px'}}/>
        <Row className={"Filler"}> </Row>
        <div>
            <Row>
              <Form style={{marginLeft: '2rem'}} onSubmit={this.onFormSubmit}>
                <FormGroup row>
                  <Col xs={7}>
                    <Label for="exampleSelect">Select a Question Type</Label>
                    {this.props.assType === "Homework"
                      ?
                      <Input bsSize="lg" type="select" name="select" id="exampleSelect">
                        <option>Multiple Choice</option>
                        <option>Fill in the Blank</option>
                        <option>Select Multiple</option>
                        <option>Free Response</option>
                        <option>Video Page</option>
                      </Input>
                      :
                      <Input bsSize="lg" type="select" name="select" id="exampleSelect">
                        <option>Multiple Choice</option>
                        <option>Fill in the Blank</option>
                        <option>Select Multiple</option>
                      </Input>
                    }
                  </Col>
                  <Col xs={4}>
                    <br/>
                    <Button color={"info"} size={"lg"}>Add Question</Button>
                  </Col>
                </FormGroup>
              </Form>
            </Row>

            <br/>
            <br/>
            <Col xs={10} lg={8}>
              {
                this.state.questions.length !== 0
                  ?
                  <Accordion>
                    {this.state.questions.map((quest, index) => {
                      return (<AccordionItem key={index}>
                          <AccordionItemTitle><h3> Question {index + 1}:</h3>
                          </AccordionItemTitle>
                          <AccordionItemBody className={"accordBody"}>
                            {quest.type === "MCQ"
                              ?
                              <MCQForm key={this.state.key} question={quest} index={index}
                                       recordQuestion={this.recordQuestion}/>
                              : (quest.type === "FRQ")
                                ?
                                <FRQForm key={this.state.key} question={quest} index={index}
                                         recordQuestion={this.recordQuestion}/>
                                : (quest.type === "VIDEO")
                                  ?
                                  <VideoForm key={this.state.key} question={quest} index={index}
                                             recordQuestion={this.recordQuestion}/>
                                  : (quest.type === "FIB")
                                    ?
                                    <FIBForm key={this.state.key} question={quest} index={index}
                                             recordQuestion={this.recordQuestion}/>
                                    :
                                    (quest.type === "SMQ")
                                      ?
                                      <SMQForm key={this.state.key} question={quest} index={index}
                                               recordQuestion={this.recordQuestion}/>
                                      :
                                      <div/>

                            }
                            <span onClick={() => this.handleDeleteClick(index)} className={"clickableIcon float-right"} style={{fontSize: '2rem', marginTop: '1rem', marginRight: '0.35rem'}}>
                              <i style={{cursor: 'pointer'}} className="fas fa-trash-alt"/>
                            </span>
                          </AccordionItemBody>
                        </AccordionItem>

                      )
                    })}
                  </Accordion>
                  :
                  <div/>
              }
            </Col>
            <br/>
            <Col xs={{size: 4, offset: 3}} lg={{size: 4, offset: 3}}>
              <Button color={"secondary"} size={"lg"} block onClick={this.publishAss}>Publish</Button>
            </Col>
          </div>
        <Row className={"Filler"}> </Row>
        <Row className={"Filler"}> </Row>

      </Container>
    );
  }

}

export default EditActivity