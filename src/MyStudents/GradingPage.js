import React, {Component} from 'react';
import {Container, Row, Col, Table} from 'reactstrap';

import './MyStudents.css';
import {firestore} from "../base";
import StudListGrade from "./StudListGrade";


class GradingPage extends Component {

    constructor (props) {
        super(props);

        this.state = {
            students : [{
                name: null,
                email: null
            }],
        }
    }

    componentWillMount() {
        this.getStudents();
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
                            object.unshift({
                                name: data.firstName + " " + data.lastName,
                                email: data.email
                            });
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
                            <p>Grading </p>
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
                                                <th>Rank</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Grade</th>
                                            </tr>
                                            </thead>

                                            <StudListGrade students={this.state.students}/>

                                        </Table>
                                    </Col>
                                </Row>
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default GradingPage