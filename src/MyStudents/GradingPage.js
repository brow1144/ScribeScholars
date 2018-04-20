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
                score: null,
                answers: [],
            }],

            maxScore: null,
            oldMaxScore: null,
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
        let assRef = firestore.collection("classes").doc(this.props.code).collection(this.props.assCol).doc(this.props.assKey);

        assRef.get().then(function(doc) {
            let ungradedPoints = 0;

            if (doc.exists && doc.data() != null) {
                for (let i in doc.data().questions) {
                    if (doc.data().questions.hasOwnProperty(i)) {
                        if (doc.data().questions[i].type === "FRQ")
                            ungradedPoints += doc.data().questions[i].points;
                    }
                }
            }

            self.setState({
                maxScore : doc.data().maxScore,
                oldMaxScore: doc.data().oldMaxScore,
                ungradedPoints: ungradedPoints,
                questions: doc.data().questions,
            });
        });
    };

    getStudents = () => {
        let object = [{}];
        let self = this;
        let classRef = firestore.collection("classes").doc(this.props.code);

        classRef.get().then(function (doc) {
            if (doc.exists) {
                for (let i in doc.data().students) {
                    if (doc.data().students.hasOwnProperty(i)) {
                        let studRef = firestore.collection("users").doc(doc.data().students[i]);

                        studRef.get().then((studDoc) => {
                            let studAssRef = studRef.collection(self.props.assCol).doc(self.props.assKey);

                            studAssRef.get().then((assDoc) => {
                                if (assDoc.exists) {
                                  object.unshift({
                                    name: studDoc.data().firstName + " " + studDoc.data().lastName,
                                    email: studDoc.data().email,
                                    key: doc.data().students[i],
                                    score: assDoc.data().score,
                                    answers: assDoc.data().history,
                                  });

                                  self.setState({
                                    students: object,
                                  });
                                }
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

    curveGrade = (newMaxScore) => {
        if (isNaN(newMaxScore) || newMaxScore <= 0)
          return;

        let self = this;

        for (let i in this.state.students) {
            if (this.state.students.hasOwnProperty(i)) {
                let assignmentRef = firestore.collection("users").doc(this.state.students[i].key)
                  .collection(this.props.assCol).doc(this.props.assKey);

                if (self.state.oldMaxScore != null) {
                  assignmentRef.update({
                    maxScore: newMaxScore,
                  }).catch((error) => {
                    console.log("Error getting document:", error);
                  });
                } else {
                  assignmentRef.update({
                    oldMaxScore: self.state.maxScore,
                    maxScore: newMaxScore,
                  }).catch((error) => {
                    console.log("Error getting document:", error);
                  });
                }
            }
        }

        let classAssignmentRef = firestore.collection("classes").doc(this.props.code)
          .collection(this.props.assCol).doc(this.props.assKey);

        if (self.state.oldMaxScore != null) {
          classAssignmentRef.update({
            maxScore: newMaxScore,
          }).catch((error) => {
            console.log("Error getting document:", error);
          });
        } else {
          classAssignmentRef.update({
            oldMaxScore: self.state.maxScore,
            maxScore: newMaxScore,
          }).catch((error) => {
            console.log("Error getting document:", error);
          });
        }
    };

    updateScore = (student, score) => {
        if (isNaN(score) || score < 0)
            return;

        if (score > this.state.maxScore)
            score = this.state.maxScore;

        firestore.collection("users").doc(student.key).collection(this.props.assCol).doc(this.props.assKey).update({
            score: score,
        });
    };

    render() {
        return (
            <div>
                <Container fluid>
                </Container>
                <Container fluid className={"mainPage"}>
                    <Row>
                        <Col className={"mainPage"}>
                            <p>Currently Grading: {this.props.assignment.name}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StudListGrade assKey={this.props.assKey} assCol={this.props.assCol}
                                           maxScore={this.state.maxScore} students={this.state.students} ungradedPoints={this.state.ungradedPoints}
                                           questions={this.state.questions} updateScore={this.updateScore} curveGrade={this.curveGrade}
                                           returnToDashboard={this.props.returnToDashboard}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default GradingPage