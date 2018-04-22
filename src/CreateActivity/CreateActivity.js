import React, {Component} from 'react';

import {Container, Row, Col, Input, Label, Form, FormGroup, Button} from 'reactstrap';

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/react-accessible-accordion.css';
import './CreateActivity.css';
import Instruct from './Instruct';
import {firestore} from "../base";
import MCQForm from "./MCQForm";
import FRQForm from "./FRQForm";
import VideoForm from "./VideoForm";
import FIBForm from "./FIBForm";
import SMQForm from "./SMQForm";

class CreateActivity extends Component {
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

    createHomework = (title, descript, dueDate) => {

        let self = this;
        this.flipComp();
        let code = this.getCode();
        //Create new document in "classes" collection
        let classRef;
        if (self.props.assType === "Lesson")
            classRef = firestore.collection("classes").doc(self.props.class).collection("inClass").doc(code);
        else
            classRef = firestore.collection("classes").doc(self.props.class).collection("homework").doc(code);

        self.setState({hwCode: code, title: title});

        classRef.get().then(function (doc) {
            if (doc.exists) {
                self.setNewDoc();
            } else {
                classRef.set({
                    name: title,
                    description: descript,
                    start: dueDate,
                    end: dueDate,
                    available: true,
                }).then(function () {
                    console.log("successfully written!");
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }).catch(function (error) {
            console.log("Error getting document: ", error);
        });
    };

    createQuestion = () => {
        let homeworkRef = firestore.collection("classes").doc("668273").collection("Homework").doc("12345678");

        let self = this;
        let tmpNewQuestion = [{
            correctAns: "option3",
            option1: "Kyle",
            option2: "Walter",
            option3: "Jeremy",
            option4: "Jake",
            prompt: "Which group member is Jeremy?",
            type: "MCQ",
        }];


        if (self.state.questions != null) {
            self.setState({
                questions: self.state.questions.concat(tmpNewQuestion),
            }, () => {
                homeworkRef.update({
                    questions: self.state.questions,
                }).then(function () {
                    console.log("Successfully added a question");

                }).catch(function (error) {
                    console.log("Error updating document: ", error);
                });
            });
        } else {
            self.setState({
                questions: tmpNewQuestion,
            }, () => {
                homeworkRef.update({
                    questions: self.state.questions,
                }).then(function () {
                    console.log("Successfully added a question");

                }).catch(function (error) {
                    console.log("Error updating document: ", error);
                });
            });
        }

    };

    grabQuestions = () => {
        let self = this;

        // the classes' assignment collection reference
        let homeworkRef = firestore.collection("classes").doc("668273").collection("Homework").doc("12345678");
        homeworkRef.get().then(function (doc) {
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

    flipComp = () => {
        this.setState({initialCreate: false,})
    };

    //Generate New Homework code
    getCode = () => {
        let code = "";
        for (let i = 0; i < 8; i++) {
            code += Math.floor(Math.random() * 10);
        }
        return code;
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

    recordQuestion = (quest, index) => {

        let tempArr = this.state.questions;

        tempArr.splice(index, 1, quest);

        let tempTotalPoints = this.state.totalPoints + tempArr[index].points;

        this.setState({
            questions: tempArr,
            totalPoints: tempTotalPoints,
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
                                    currentQuestion: 0,
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
                    /*                    studentRef.get().then(function (doc) {
                                            if (doc.exists) {
                                                self.setNewDoc();
                                            } else {
                                                studentRef.set({
                                                    answerHistory: tempAnsHis,
                                                    class: self.props.class,
                                                    completed: "",
                                                    currentQuestion: 1,
                                                    currentScore: 0,
                                                    maxScore: self.state.questions.length,
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
                                        });*/
                }
            }
        })


    };

    render() {

        return (
            <Container fluid className={"ContainerRules"}>
                <hr style={{marginRight: '-20px', marginLeft: '-20px'}}/>
                <Row className={"Filler"}> </Row>

                {this.state.initialCreate
                    ?
                    <Instruct createHomework={this.createHomework}/>
                    :
                    <div>
                        <Row>
                            <Form style={{marginLeft: '2rem'}} onSubmit={this.onFormSubmit}>
                                <FormGroup row>
                                    <Col xs={7}>
                                        {/*<Label for="exampleSelect">Select a Question Type</Label>*/}
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
                                            <Input bsSize="lg" type="select" name="select" id="exampleSelect" hidden={true}>
                                                <option>Multiple Choice</option>
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
                                                                                 recordQuestion={this.recordQuestion} />
                                                                        :
                                                                        (quest.type === "SMQ")
                                                                            ?
                                                                            <SMQForm question={quest} index={index}
                                                                                     recordQuestion={this.recordQuestion} />
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

export default CreateActivity