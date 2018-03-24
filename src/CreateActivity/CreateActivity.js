import React, {Component} from 'react';

import { Container, Row, Col } from 'reactstrap';

//import { firestore , storageRef } from "../base";
//import firebase from '../base.js';

import './CreateActivity.css';
import MCQ from './MCQ';
import VideoActivity from './VideoActivity';

import FRQ from './FRQ';
import {firestore} from "../base";
import CreateClass from "../CreateClass/CreateClass";
//import SMQ from './SMQ';

class CreateActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: props.uid,
            role: this.props.role,
            //classCode: this.props.classCode,
            questions: [],
            question: {},
            questionIndex: 0,
        };

        this.createHomework();
    }

    createHomework = () => {
        let self = this;
        let code = this.getCode();
        //Create new document in "classes" collection
        let classRef = firestore.collection("classes").doc("668273").collection("Homework").doc(code);
        classRef.get().then(function(doc) {
            if (doc.exists) {
                self.setNewDoc();
            } else {
                classRef.set({}).then(function() {
                    console.log("successfully written!");
                }).catch(function(error) {
                    console.log(error);
                });
            }
        }).catch(function(error) {
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
                }).then(function() {
                    console.log("Successfully added a question");

                }).catch(function(error) {
                    console.log("Error updating document: ", error);
                });
            });
        } else {
            self.setState({
                questions: tmpNewQuestion,
            }, () => {
                homeworkRef.update({
                    questions: self.state.questions,
                }).then(function() {
                    console.log("Successfully added a question");

                }).catch(function(error) {
                    console.log("Error updating document: ", error);
                });
            });
        }

    };

    grabQuestions = () => {
        let self = this;

        // the classes' assignment collection reference
        let homeworkRef = firestore.collection("classes").doc("668273").collection("Homework").doc("12345678");
        homeworkRef.get().then(function(doc) {
            if (doc.exists) {
                if (doc.data().questions != null) {
                    self.setState({
                        questions: doc.data().questions,
                    });
                }
            } else {
                console.log("user not found");
            }


        }).catch(function(error) {
            console.log("Error getting document: ", error);
        });
    };

    //Generate New Homework code
    getCode = () => {
        let code = "";
        for (let i = 0; i < 8; i++) {
            code += Math.floor(Math.random()*10);
        }
        return code;
    };

    render() {
/*        if (this.state.questions !== [])
            return (
                <Container fluid className={"ContainerRules"}>
                    <Row className={"Filler"}> </Row>
                    <Row className={"BannerRow"}>
                        <Col xs={"12"} sm={"12"} md={"12"} lg={"12"} xl={"12"} className={"BannerCol"}>
                            <h1>Assignment Title Creation:</h1>
                        </Col>
                    </Row>
                    <Row className={"Filler"}> </Row>
                    <Row className={"Filler"}> </Row>

                    {Object.keys(this.state.questions).map((key, index) => {
                        //console.log(this.state.questions[index]);

                        if (this.state.questions[index].type === "MCQ") {
                            return <MCQ question={ this.state.question } />
                        }
                    })
                    }

                    <Row className={"Filler"}> </Row>
                    <Row className={"Filler"}> </Row>

                </Container>
            );
        else*/
            return(
                <Container fluid className={"ContainerRules"}>
                    <Row className={"Filler"}> </Row>
                    <Row className={"BannerRow"}>
                     <Col xs={"12"} sm={"12"} md={"12"} lg={"12"} xl={"12"} className={"BannerCol"}>
                         <h1>Assignment Title Creation:</h1>
                     </Col>
                    </Row>
                    <Row className={"Filler"}> </Row>
                    <Row className={"Filler"}> </Row>

                    <MCQ/>
                    <FRQ/>
                    {/*<VideoActivity/>*/}


                    <Row className={"Filler"}> </Row>
                    <Row className={"Filler"}> </Row>

                </Container>
            );


    }
}

export default CreateActivity