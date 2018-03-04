import React, { Component } from 'react';
import {Table, Container, Row, Col} from 'reactstrap';

import './Homework.css'

class Homework extends Component {


    render() {

        return (
            <div className={"centerMain"}>
                <Container fluid className={"borderC"}>
                    <Row>
                        <Col>
                            <p className={"homeworkTitle"}>Homework</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"makeSpace"}>
                        </Col>
                    </Row>
                    <Row className={"borderC"}>
                        <Col xs={12}>
                            <p className={"pText"}>Assignments</p>
                        </Col>
                        <Col xs={12}>
                            <Table>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Assignment</th>
                                    <th>Date Due</th>
                                    <th>Links</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Homework 1</td>
                                    <td>3/7/18</td>
                                    <td><a href={'./HomePage'}>Link</a></td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Homework 2</td>
                                    <td>3/7/18</td>
                                    <td><a href={'./HomePage'}>Link</a></td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Homework 3</td>
                                    <td>3/7/18</td>
                                    <td><a href={'./Settings/Settings'}>Link</a></td>
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

export default Homework
