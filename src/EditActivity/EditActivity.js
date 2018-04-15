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
import MCQForm from '../CreateActivity/MCQForm';
import FRQForm from '../CreateActivity/FRQForm';
import SMQForm from '../CreateActivity/SMQForm';
import VideoForm from '../CreateActivity/VideoForm';
import FIBForm from '../CreateActivity/FIBForm';



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
    };
  }

  componentWillMount() {
    this.grabQuestions()
  };

  grabQuestions = () => {
    let self = this;

    // the classes' assignment collection reference
    let assRef;
    console.log(this.props.class);
    console.log(this.props.lessonNumber);

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

  publishAss = () => {
    let self = this;
    let homeworkRef;// = firestore.collection("classes").doc(this.props.code).collection("Homework").doc("39489037");
    if (this.props.assType === "Lesson")
      homeworkRef = firestore.collection("classes").doc(self.props.class).collection("inClass").doc(self.state.hwCode);
    else
      homeworkRef = firestore.collection("classes").doc(self.props.class).collection("homework").doc(self.state.hwCode);

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
            studentRef = firestore.collection("users").doc(tempArr[i]).collection("inClass").doc(self.state.hwCode);
            studentRef.get().then(function (doc) {
              if (doc.exists) {
                self.setNewDoc();
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
            studentRef = firestore.collection("users").doc(tempArr[i]).collection("homework").doc(self.state.hwCode);
            studentRef.get().then(function (doc) {
              if (doc.exists) {
                self.setNewDoc();
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
                              <MCQForm question={quest} index={index}
                                       recordQuestion={this.recordQuestion}/>
                              : (quest.type === "FRQ")
                                ?
                                <FRQForm question={quest} index={index}
                                         recordQuestion={this.recordQuestion}/>
                                : (quest.type === "VIDEO")
                                  ?
                                  <VideoForm question={quest} index={index}
                                             recordQuestion={this.recordQuestion}/>
                                  : (quest.type === "FIB")
                                    ?
                                    <FIBForm question={quest} index={index}
                                             recordQuestion={this.recordQuestion}/>
                                    :
                                    (quest.type === "SMQ")
                                      ?
                                      <SMQForm question={quest} index={index}
                                               recordQuestion={this.recordQuestion}/>
                                      :
                                      <div/>

                            }
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
        }
        <Row className={"Filler"}> </Row>
        <Row className={"Filler"}> </Row>

      </Container>
    );
  }
}

export default EditActivity