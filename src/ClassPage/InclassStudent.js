import React, { Component } from 'react';

import {Table, Container, Row, Col} from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom'
import { firestore } from "../base";

import './InclassStudent.css'

class InclassStudent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            classCode: props.code,
            assignment: [{
                name: null,
                maxScore: null,
                link: null,
            }],
        };
    }

    getAssignment = () => {
        let docRef = firestore.collection("classes").doc(this.props.classCode);
        let self = this;

        docRef.get().then(function (doc) {
            if (doc.exists) {
                let data = doc.data();
                self.setState({
                    name: data.name,
                    date: data.maxscore,
                    //link: data.link,
                });
            } else {
                self.setState({
                    errorCode: "Class not found",
                    visible: true,
                });
            }
        }).catch(function (error) {
            console.log("Error getting document: ", error);
        });
    }

    render()
        {

        console.log(this.props.code)

        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col className={"makeSpace"}>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className={"inclassTitle"}>In-class Assignments</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"makeSpace"}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <p className={"pText"}>Available Assignments</p>
                        </Col>
                        <Col xs={12}>
                            <Table>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Assignment</th>
                                    <th>Available</th>
                                    <th>LinkS</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Practice Question</td>
                                    <td>yes</td>
                                    <td>
                                        <RouterLink to={`practiceQuestion`}>
                                            Link
                                        </RouterLink>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Practice Question2</td>
                                    <td>no</td>
                                    <td>
                                        <RouterLink to={`${this.props.code}/practiceQuestion2`}>
                                            Link
                                        </RouterLink>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Practice Question3</td>
                                    <td>no</td>
                                    <td>
                                        <RouterLink to={`${this.props.code}/practiceQuestion3`}>
                                            Link
                                        </RouterLink>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default InclassStudent