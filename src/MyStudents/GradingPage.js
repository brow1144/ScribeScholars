import React, {Component} from 'react';
import {firestore} from "../base";
import { Container, Row, Col } from 'reactstrap';

import './MyStudents.css';
import StudListGrade from "./StudListGrade";

class GradingPage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            students : [{
                name: null,
                email: null,
                key: null,
                currentScore: null,
            }],

            maxScore: null,
            ungradedPoints: null,
            questions: [],
        };
    }

    componentWillMount() {
        this.setAssInfo();
        this.getStudents();
    };

    setAssInfo = () => {
        let self = this;
        this.props.assRef.get().then(function(doc) {
            let ungradedPoints = 0;

            if (doc.exists() && doc.data() != null) {
                for (let i in doc.data().questions) {
                    if (doc.data().questions.hasOwnProperty(i)) {
                        if (doc.data().questions[i].type === "FRQ" || doc.data().questions[i].type === "VIDEO") {
                            ungradedPoints += doc.data().questions[i].points;
                        }
                    }
                }
            }

            self.setState({
                maxScore : doc.data().maxScore,
                ungradedPoints: ungradedPoints,
                questions: doc.data().questions,
            });
        });
    };

    getStudents = () => {
        let object = [{}];
        let self = this;
        let classRef = firestore.collection("classes").doc(this.props.class);

        classRef.get().then(function (doc) {
            if (doc.exists) {
                for (let i in doc.data().students) {
                    if (doc.data().students.hasOwnProperty(i)) {
                        let studRef = firestore.collection("users").doc(doc.data().students[i]);

                        studRef.get().then((studDoc) => {
                            let studAssRef = studRef.collection(self.props.assCol).doc(self.props.assKey);

                            studAssRef.get().then((assDoc) => {
                                if (self.props.assCol === "homework") {
                                    object.unshift({
                                        name: studDoc.data().firstName + " " + studDoc.data().lastName,
                                        email: studDoc.data().email,
                                        key: doc.data().students[i],
                                        score: assDoc.data().score,
                                        answers: assDoc.data().history,
                                    });
                                } else if (self.props.assCol === "inClass") {
                                    object.unshift({
                                        name: studDoc.data().firstName + " " + studDoc.data().lastName,
                                        email: studDoc.data().email,
                                        key: doc.data().students[i],
                                        score: assDoc.data().score,
                                        answers: assDoc.data().history,
                                    });
                                }

                                self.setState({
                                    students: object,
                                });
                            });
                        });
                    }
                }
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

        object.pop();

        self.setState({
            students: object,
        });
    };

    updateScore = (student, score) => {
      console.log(student);
      console.log(score);
        if (isNaN(score) || score < student.score)
            score = student.score;

        if (score > this.state.maxScore)
            score = this.state.maxScore;

        /*firestore.collection("users").doc(student.key).collection(this.props.assCol).doc(this.props.assKey).update({
            score: score,
        });*/
    };

    render() {
        return (
            <div>
                <Container fluid>
                </Container>
                <Container fluid className={"mainPage"}>
                    <Row>
                        <Col className={"mainPage"}>
                            <p>Grading</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StudListGrade code={this.props.class} assKey={this.props.assKey} assCol={this.props.assCol}
                                           maxScore={this.state.maxScore} students={this.state.students} updateScore={this.updateScore}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default GradingPage