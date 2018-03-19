import React, {Component} from 'react';
import {Container, Row, Col, Card, CardTitle, CardText, Table, NavLink} from 'reactstrap';
import './StudentGradePage.css';


class StudentGradePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            uid: props.uid,
            //code: props.code,
            code: "668273",
            assignments: null,
            total: 0,
        }
    }

    render() {
        return (
            <Container fluid className={"grade-title"}>

                <Row className={"grade-title"}>
                    <Col>
                        <p> My Grades </p>
                    </Col>
                </Row>

                <Row>
                    <Col className={"grade-text"}>
                        <Row>
                            <Table dark>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Assignment</th>
                                    <th>Score</th>
                                    <th>Max Score</th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Homework 1</td>
                                    <td>14</td>
                                    <td>15</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Midterm</td>
                                    <td>90</td>
                                    <td>100</td>
                                </tr>
                                </tbody>

                            </Table>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col className={"total-title"}>
                        <Row>
                            <Table dark>
                                <thead>
                                <tr>
                                    <th>Total: </th>
                                </tr>
                                </thead>
                            </Table>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default StudentGradePage