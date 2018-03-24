import React, {Component} from 'react';

import { Container, Row, Col } from 'reactstrap';

import './CreateActivity.css';
import MCQ from './MCQForm';
import VideoForm from './VideoForm';
import FRQ from './FRQForm';
import Instruct from './Instruct';

import {firestore} from "../base";

class CreateActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: props.uid,
            role: this.props.role,
            class: this.props.class,
            questions: [],
            question: {},
        };

        //this.createHomework();
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

            return(
                <Container fluid className={"ContainerRules"}>
                    <hr style={{marginRight: '-20px', marginLeft: '-20px'}} />
                    <Row style={{}} className={"Filler"}> </Row>

                    <Instruct/>
                    <Row className={"Filler"}> </Row>
                    <Row className={"Filler"}> </Row>

                </Container>
            );


    }
}

export default CreateActivity