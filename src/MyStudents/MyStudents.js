import React, {Component} from 'react';
import {Container, Row, Col, Table} from 'reactstrap';

import './MyStudents.css';
import Graphs from '../Dashboard/Dashboard';
import StudList from '../Dashboard/StudList'
import HomeCards from '../Dashboard/HomeCards'
import InClassCards from '../Dashboard/InClassCards'
import QuizCards from '../Dashboard/QuizCards'
import {firestore} from "../base";


class MyStudents extends Component {

    constructor (props) {
        super(props);

        this.state = {


            students : [{
                name: null,
                email: null,
                gpa: null,
            }],

            homeworks : [{
                id: null,
               name: null,
               max: null
            }],

            inclass : [{
                id: null,
                name: null,
                max: null
            }],

            quizzes : [{
                id: null,
                name: null,
                max: null
            }]
        }

    }

    componentWillMount() {
        this.getHomeworks();
        this.getStudents();
        this.getInClass();
        this.getQuizzes();
    };

    getHomeworks = () => {

        let object = [{}];

        let self = this;


        let colRef = firestore.collection("classes").doc(this.props.code)
            .collection("homework");

        colRef.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots

                object.unshift({
                    id: doc.id,
                    colRef: colRef.id,
                    name: doc.data().name,
                    max: doc.data().questions.length
                });
                self.setState({
                    homeworks: object,
                });
            });

        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

        object.pop();

        self.setState({
            homeworks: object
        });

    };

    getInClass = () => {

        let object = [{}];

        let self = this;


        let colRef = firestore.collection("classes").doc(this.props.code)
            .collection("inClass");

        colRef.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots

                object.unshift({
                    id: doc.id,
                    colRef: colRef.id,
                    name: doc.data().name,
                    max: doc.data().questions.length
                });
                self.setState({
                    inclass: object,
                });
            });

        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

        object.pop();

        self.setState({
            inclass: object
        });

    };

    getQuizzes = () => {

        let object = [{}];

        let self = this;


        let colRef = firestore.collection("classes").doc(this.props.code)
            .collection("quizzes");

        colRef.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots

                object.unshift({
                    id: doc.id,
                    colRef: colRef.id,
                    name: doc.data().name,
                    max: doc.data().questions.length
                });
                self.setState({
                    quizzes: object,
                });
            });

        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

        object.pop();

        self.setState({
            quizzes: object
        });

    };

    getStudents = () => {

        let object = [{}];

        let self = this;


        let docRef = firestore.collection("classes").doc(this.props.code);

        docRef.get().then(function (doc) {
            if (doc.exists) {
                let data = doc.data();
                for (let i in data.students) {

                    if (data.students.hasOwnProperty(i)) {
                        let id = data.students[i];
                        let studRef = firestore.collection("users").doc(id);

                        studRef.get().then(function (doc) {
                            let data = doc.data();
                            if (isNaN(data.gpa)) {
                                console.log(data.firstName + " did not have a valid GPA.");
                                object.unshift({
                                    name: data.firstName + " " + data.lastName,
                                    email: data.email,
                                    gpa: 0,
                                });
                            } else {
                                object.unshift({
                                    name: data.firstName + " " + data.lastName,
                                    email: data.email,
                                    gpa: data.gpa,
                                });
                            }

                            self.setState({
                                students: object,
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



    render() {
        return (
            <div>
                <Container fluid>

                </Container>
                <Container fluid className={"mainPage"}>
                    <Row>
                        <Col className={"mainPage"}>
                            <p>My Students</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"mainPage"}>
                            <Row>
                                <Col className={"mainPage"}>
                                    <h1>Dashboard</h1>
                                </Col>
                            </Row>
                            <Row className="chartAlign">
                                <Graphs lessonNumber={this.props.lessonNumber} code={this.props.code}/>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Col>
                            <h1>Students</h1>
                            <Row>
                                <Col>
                                    <Table striped>
                                        <thead>
                                        <tr>
                                            <th>GPA</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                        </tr>
                                        </thead>

                                        <StudList students={this.state.students}/>

                                    </Table>
                                </Col>
                            </Row>
                        </Col>
                        </Col>
                        <Col>
                        <Col>
                            <h1>Homework</h1>
                            <HomeCards code={this.props.code} homeworks={this.state.homeworks}/>
                        </Col>
                        <Col>
                            <h1>In-Class Lessons</h1>
                            <InClassCards code={this.props.code} inclass={this.state.inclass}/>
                        </Col>
                        <Col>
                            <h1>Quizzes</h1>
                            <QuizCards code={this.props.code} quizzes={this.state.quizzes}/>
                        </Col>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default MyStudents