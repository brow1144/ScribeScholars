import React, { Component } from 'react';
import {Table, Container, Row, Col} from 'reactstrap';

import Tables from './Tables';
import './Homework.css'
import {firestore} from "../base";

class Homework extends Component {

    constructor(props) {
        super(props);

        this.state = {
            classCode: props,
            assignment: [{
                name: null,
                maxscore: null,
                //link: null,
            }],
        };
        this.getHomework();

    }

    getHomework = () => {
        let object = [{}];
        let docRef = firestore.collection("classes").doc(this.props.classCode);
        let self = this;

        docRef.get().then(function (doc) {
            if (doc.exists) {
                let data = doc.data();
                for (let i in data.assignments) {
                    if (data.assignments.hasOwnProperty(i)) {
                        object.unshift({
                            name: data.assignments[i].name,
                            maxscore: data.assignments[i].maxscore,
                        });
                        self.setState({
                            assignment: object,
                        })
                    }
                }
            } else {
                console.log("No such document!");
            }

            this.setState({
                assignment: object,
            })

        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

        object.pop();

        self.setState({
            assignment: object
        });
    }


    render() {

        return (
            <div className={"centerMain"}>
                <Container fluid>
                    <Row>
                        <Col className={"makeSpace"}>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className={"homeworkTitle"}>Homework</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"makeSpace"}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <p className={"pText"}>Available Homeworks</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Table>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Assignment</th>
                                    <th>Available</th>
                                    <th>Links</th>
                                </tr>
                                </thead>
                                <tbody>
                                    /*<Tables assignment={this.props.assignment}/>*/
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
