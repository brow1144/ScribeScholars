import React, { Component } from 'react';
import {Table, Container, Row, Col} from 'reactstrap';

import './InclassStudent.css'

class InclassStudent extends Component {

    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col>
                            <p className={"inclassTitle"}>In-class Assignments</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"makeSpace"}>
                        </Col>
                    </Row>
                    <Row className={"borderC"}>
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
                                    <th>Link</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Practice Question</td>
                                    <td>yes</td>
                                    <td>link</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Practice question2</td>
                                    <td>no</td>
                                    <td>link</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Practice Question3</td>
                                    <td>no</td>
                                    <td>link</td>
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