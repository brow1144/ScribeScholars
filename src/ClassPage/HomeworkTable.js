import React, {Component} from 'react';
import {Table, Container, Row, Col} from 'reactstrap';
import {NavLink as RouterLink} from 'react-router-dom'
import './Table.css'
import { firestore } from '../base.js'


class HomeworkTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            role: null,
        }
    }

    componentWillMount() {
        this.getRole();
    }
    getRole = () => {
        let docRef = firestore.collection("users").doc(this.props.uid);
        let self = this;

        docRef.get().then(function(doc) {
            if (doc.exists) {
                self.setState({
                    role: doc.data().role,
                });
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

    };

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
                                    <th>Assignment</th>
                                    <th>Points Possible</th>
                                    <th>Links</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.keys(this.props.homeworks).map((key, index) => {
                                    return <tr key={key}>
                                        <td>{this.props.homeworks[index].name}</td>
                                        <td>{this.props.homeworks[index].maxScore}</td>
                                        <td>
                                            <RouterLink
                                                to={`/ScribeScholars/HomePage/${this.props.code}/homework/${this.props.homeworks[index].lessonCode}`}>
                                                Link
                                            </RouterLink>
                                        </td>
                                    </tr>
                                })
                                }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"moreSpace"}>
                            {this.state.role === "teacher"
                                ?
                                <RouterLink to={`/ScribeScholars/HomePage/${this.props.code}/homework/create-activity`}>
                                    Create New Class Homework
                                </RouterLink>
                                :
                                <div/>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"moreSpace"}>
                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default HomeworkTable