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
//import MCQ from './MCQForm';
// import VideoForm from './VideoForm';
// import FRQ from './FRQForm';
import Instruct from './Instruct';

import {firestore} from "../base";
import MCQForm from "./MCQForm";

class CreateActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialCreate: false,
            uid: props.uid,
            role: this.props.role,
            class: this.props.class,
            questions: [],
            typeArray: [],
            question: {},
        };
    }

    createHomework = (title, descript) => {

        let self = this;
        this.flipComp();
        let code = this.getCode();
        //Create new document in "classes" collection
        let classRef = firestore.collection("classes").doc("668273").collection("Homework").doc(code);
        classRef.get().then(function (doc) {
            if (doc.exists) {
                self.setNewDoc();
            } else {
                classRef.set({
                    name: title,
                    description: descript,
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
        console.log(ev.target.select.value);
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
                    type: "MCQ",
                };
                tempArr.push(tempQ);
                break;
            case "Free Response":
                tempQ = {
                    prompt: "",
                    type: "FRQ",
                };
                tempArr.push(tempQ);
                break;
            case "Video Page":
                tempQ = {
                    url: "",
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
                                        <Label for="exampleSelect">Select a Question Type</Label>
                                        <Input bsSize="lg" type="select" name="select" id="exampleSelect">
                                            <option>Multiple Choice</option>
                                            <option>Free Response</option>
                                            <option>Video Page</option>
                                        </Input>
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
                                                    <AccordionItemTitle><h3> Question {index + 1}:</h3></AccordionItemTitle>
                                                    <AccordionItemBody className={"accordBody"}>
                                                        {quest.type === "MCQ"
                                                            ?
                                                            <MCQForm question={quest}/>
                                                            : (quest.type === "FRQ")
                                                                ?
                                                                console.log(2)
                                                                :
                                                                console.log(3)
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
                    </div>
                }
                <Row className={"Filler"}> </Row>
                <Row className={"Filler"}> </Row>

            </Container>
        );


    }
}

export default CreateActivity


/*
<Accordion>
{this.states.questions != null && Object.keys(this.state.questions).map((key, index) => {
    return <AccordionItem key={key}>
        <AccordionItemTitle>
            <h3>
                {this.props.classes[index].class}
            </h3>
        </AccordionItemTitle>
        <AccordionItemBody className={"accordBody"}>
            <div className="inside">
                <Row>
                    <Col sm="12">
                        <Form onSubmit={this.onFormSubmit}>

                            <FormGroup row>
                                <Col xs="7">
                                    <InputGroup size="10">
                                        <InputGroupAddon addonType="prepend">Class Name</InputGroupAddon>
                                        <Input bsSize="md" type="username" name="className" id="exampleClassName" defaultValue={this.props.classes[index].class} />
                                    </InputGroup>

                                </Col>
                            </FormGroup>
                            <Button outline color="success" size={"lg"}>
                                <i className="far fa-save" />
                            </Button>
                            <span className="deleteIcon" onClick={ () => this.toggle(this.props.classes[index].code)}>
                                                <i className="fas fa-trash-alt picIcon"/>
                                              </span>
                        </Form>
                    </Col>
                </Row>
                </div>
        </AccordionItemBody>
    </AccordionItem>
})}
</Accordion>*/
