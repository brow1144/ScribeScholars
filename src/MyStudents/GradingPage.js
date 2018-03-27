import React, {Component} from 'react';
import {Container, Row, Col, Table, Button} from 'reactstrap';

import './MyStudents.css';
import {firestore} from "../base";
import StudListGrade from "./StudListGrade";


class GradingPage extends Component {

    constructor (props) {
        super(props);

        this.state = {
            students : [{
                name: null,
                email: null,
                key: null,
                currentScore: null
            }],

            maxScore : 0
        };


    }

    componentWillMount() {
        this.getStudents();
        this.setMaxScore();
    };


    getStudents = () => {

        let object = [{}];

        let self = this;


        let docRef = firestore.collection("classes").doc(this.props.class);

        docRef.get().then(function (doc) {
            if (doc.exists) {
                let data = doc.data();
                for (let i in data.students) {

                    if (data.students.hasOwnProperty(i)) {
                        let id = data.students[i];
                        let studRef = firestore.collection("users").doc(id);

                        studRef.get().then(function (doc) {
                            let data = doc.data();

                            let curScore = 1;


                            studRef.collection(self.props.assCol).doc(self.props.assKey).get().then(function (deepDoc) {
                               curScore = deepDoc.data().currentScore;
                                object.unshift({
                                    name: data.firstName + " " + data.lastName,
                                    email: data.email,
                                    key: id,
                                    currentScore : curScore
                                });

                                self.setState({
                                    students: object,
                                });
                            }, () => {

                            });





                        });
                    }
                }
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

        object.pop();

        self.setState({
            students: object
        });

    };

    setMaxScore = () => {
        let assRef = this.props.assRef;
        let self = this;
        assRef.get().then(function (doc) {
            self.setState({
                maxScore : doc.data().questions.length
            })
        });
    };

    updateGrades = (student, collection, document, score ) => {
        if (score === "") {
            score = "0";
        }
        firestore.collection("users").doc(student).collection(collection).doc(document).update({
            currentScore: score
        })
    };

    getCurrScore = (student, collection, document) => {
        let score;
        firestore.collection("users").doc(student).collection(collection).doc(document).get().then(function (doc) {
            score = doc.data().currentScore;
            console.log(score)
        }, () => {
            console.log(score)
            return score;
        });


    };





    render() {

        const actions = {
            updateGrades: this.updateGrades,
            getCurrScore: this.getCurrScore
        };

        return (
            <div>
                <Container fluid>

                </Container>
                <Container fluid className={"mainPage"}>
                    <Row>
                        <Col className={"mainPage"}>
                            <p>Grading </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StudListGrade code={this.props.class} assKey={this.props.assKey} assCol={this.props.assCol} maxScore={this.state.maxScore} students={this.state.students} {...actions}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default GradingPage