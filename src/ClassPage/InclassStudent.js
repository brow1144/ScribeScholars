import React, { Component } from 'react';
import { Table, Container, Row, Col} from 'reactstrap';

import { NavLink as RouterLink } from 'react-router-dom'

import './InclassStudent.css';

class InclassStudent extends Component {

    render() {

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
                                        <RouterLink to={`/HomePage/${this.props.code}/lessons/123456`}>
                                            Link
                                        </RouterLink>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Practice Question2</td>
                                    <td>no</td>
                                    <td>
                                        <RouterLink to={`/HomePage/${this.props.code}/lessons/12345`}>
                                            Link
                                        </RouterLink>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Practice Question3</td>
                                    <td>no</td>
                                    <td>
                                        <RouterLink to={`/HomePage/${this.props.code}/lessons/1234`}>
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