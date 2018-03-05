import React, { Component } from 'react';
import { Container, Row, Col , Card, CardTitle, CardText, Table } from 'reactstrap';

import './MyStudents.css';


class MyStudents extends Component {
    render() {
        return(
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
                        <Col>
                            <h1>Assignments</h1>
                            <Row className={"assPad"}>
                                <Col>
                                    <Card body className="text-center">
                                        <CardTitle className={"assTitle"}>Homework 1</CardTitle>
                                        <CardText className={"assText"}>Read Chapter 1</CardText>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className={"assPad"}>
                                <Col>
                                    <Card body className="text-center assPad">
                                        <CardTitle className={"assTitle"}>Homework 2</CardTitle>
                                        <CardText className={"assText"}>Read Chapter 2</CardText>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className={"assPad"}>
                                <Col>
                                    <Card body className="text-center assPad">
                                        <CardTitle className={"assTitle"}>Homework 3</CardTitle>
                                        <CardText className={"assText"}>Read Chapter 3</CardText>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <h1>Students</h1>
                            <Row>
                                <Col>
                                    <Table striped>
                                        <thead>
                                        <tr>
                                            <th>Rank</th>
                                            <th>Name</th>
                                            <th>Username</th>
                                            <th>GPA</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Jeremy</td>
                                            <td>Putput</td>
                                            <td>3.8</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Coons</td>
                                            <td>3.799999999</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Riley</td>
                                            <td>Robot</td>
                                            <td>3.4</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
        }
} export default MyStudents