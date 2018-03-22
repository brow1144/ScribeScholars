import React, {Component} from 'react';

import { Container, Row, Col } from 'reactstrap';

//import { firestore , storageRef } from "../base";
//import firebase from '../base.js';

import './CreateActivity.css';
import MCQ from './MCQ';
import VideoActivity from './VideoActivity';

import FRQ from './FRQ';
import {firestore} from "../base";
//import SMQ from './SMQ';

class CreateActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: props.uid,
            role: this.props.role,
            //classCode: props.classCode,
            //selectedAss: props.selectedAss,
            questions: [],
            question: null,
            questionIndex: 0,
        };
        this.createQuestion();
        this.grabQuestions();
    }

    createQuestion = () => {
        let classRef = firestore.collection("classes").doc("668273").collection("Homework").doc("Homework1");

        /*classRef.add({
            this.state.questionIndex: {option1: "1", option2: "2", option3: "3", option4: "4", correctOpt: "option1", prompt: "Hello", type: "MCQ"}
        })*/
 /*       db.collection("cities").add({
            name: "Tokyo",
            country: "Japan"
        })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });*/
    };

    grabQuestions = () => {
        let self = this;

        // the classes' assignment
        let classRef = firestore.collection("classes").doc("668273"); //self.state.classCode);
        classRef.get().then(function(doc) {
            if (doc.exists) {
                if (doc.data().Homework1 != null) {
                    self.setState({
                        questions: doc.data().Homework1,
                    });
                }
            } else {
                console.log("user not found");
            }
        }).catch(function(error) {
            console.log("Error getting document: ", error);
        });
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
                    <VideoActivity/>


                    <Row className={"Filler"}> </Row>
                    <Row className={"Filler"}> </Row>

                </Container>
            );


    }
}

export default CreateActivity