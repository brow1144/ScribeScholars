import React, {Component} from 'react';
import {Container, Row, Col, Card, CardTitle, CardText, Table, NavLink} from 'reactstrap';

import './MyStudents.css';


class MyStudents extends Component {
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
                        <Col>
                            <h1>Assignments</h1>
                            <Row className={"assPad"}>
                                <Col>
                                    <NavLink href="#">
                                        <Card body className="text-center">
                                            <CardTitle className={"assTitle"}>

                                                Homework 3

                                            </CardTitle>
                                            <CardText className={"assText"}>Read Chapter 3</CardText>
                                        </Card>
                                    </NavLink>
                                </Col>
                            </Row>
                            <Row className={"assPad"}>
                                <Col>
                                    <NavLink href="#">
                                        <Card body className="text-center">
                                            <CardTitle className={"assTitle"}>

                                                Homework 2

                                            </CardTitle>
                                            <CardText className={"assText"}>Read Chapter 2</CardText>
                                        </Card>
                                    </NavLink>
                                </Col>
                            </Row>
                            <Row className={"assPad"}>
                                <Col>
                                    <NavLink href="#">
                                        <Card body className="text-center">
                                            <CardTitle className={"assTitle"}>

                                                Homework 1

                                            </CardTitle>
                                            <CardText className={"assText"}>Read Chapter 1</CardText>
                                        </Card>
                                    </NavLink>
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
                                            <td>
                                                <button className="link">
                                                    Putput
                                                </button>
                                            </td>
                                            <td>3.8</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>
                                                <button className="link">
                                                    Coons
                                                </button>
                                            </td>
                                            <td>3.799999999</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Riley</td>
                                            <td>
                                                <button className="link">
                                                    Robot
                                                </button>
                                            </td>
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
}

export default MyStudents