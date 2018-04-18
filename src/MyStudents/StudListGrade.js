import React, {Component} from 'react'
import {FormGroup, Input, Row, Col, Button, Table, Collapse} from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom';

import './StudListGrade.css'

class StudListGrade extends Component {
//const StudListGrade = (props) => {
    /*return (
        <Col>
            <h1>Students</h1>
            <Row>
                <Col>
                    <Table striped>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Current Score</th>
                            <th>Ungraded Points</th>
                            <th>Grade (out of {props.maxScore})</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(props.students).map((key, index) => {
                            return (
                                <tr key={key}>
                                    <td>{props.students[index].name}</td>
                                    <td>{props.students[index].score}</td>
                                    <td>{props.ungradedPoints}</td>
                                    <td>
                                        <FormGroup>
                                            <Row>
                                                <Col xs={4}/>
                                                <Col xs={4}>
                                                    <Input onChange={(score) => props.updateScore(props.students[index], parseInt(score.target.value))}
                                                           type="number"/>
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </td>
                                </tr>
                            )
                        })
                        }
                        <tr>
                            <td/>
                            <td/>
                          <td>Curve (adjust max score) {props.maxScore}</td>
                          <td>
                            <FormGroup>
                              <Row>
                                <Col xs={4}/>
                                <Col xs={4}>
                                  <Input onChange={(score) => props.curveGrade(parseInt(score.target.value))}
                                         type="number" defaultValue={props.maxScore}/>
                                </Col>
                              </Row>
                            </FormGroup>
                          </td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col xs={0} md={8}/>
                <Col xs={12} md={2}>
                    <RouterLink to={"/ScribeScholars/HomePage/" + props.code + "/myStudents"}>
                        <Button>Return to Dashboard</Button>
                    </RouterLink>
                </Col>
                <Col xs={0} md={2}/>
            </Row>
        </Col>
    )*/
    constructor(props) {
        super(props);

        this.state = {
            expandedRows: [],
        };
    }

    handleRowClick = (uid) => {
        let newExpandedRows = [];
        console.log(this.state.expandedRows);
        if (this.state.expandedRows.includes(uid))
            newExpandedRows = this.state.expandedRows.filter((id) => id !== uid);
        else
            newExpandedRows = this.state.expandedRows.concat(uid);

        this.setState({
            expandedRows: newExpandedRows,
        });
    };

    renderItem = (student) => {
        let itemRows = [
            <tr onClick={() => this.handleRowClick(student.key)} key={student.key} className="mainRow">
                <td>{student.name}</td>
                <td>{student.score}</td>
                <td>{this.props.ungradedPoints}</td>
                <td>
                    <FormGroup>
                        <Row>
                            <Col xs={4}/>
                            <Col xs={4}>
                                <Input onChange={(score) => this.props.updateScore(student, parseInt(score.target.value))}
                                    type="number"/>
                            </Col>
                        </Row>
                    </FormGroup>
                </td>
            </tr>
        ];

        if (this.state.expandedRows.includes(student.key)) {
            itemRows.push(
                <tr key={"row-expanded-" + student.key} className="subRow">
                    <td>Hello there</td>
                    <td>{this.props.questions[0].points}</td>
                    <td>{this.props.questions[0].type}</td>
                    <td>{student.answers[0]}</td>
                </tr>
            );
          itemRows.push(
            <tr key={"row-expanded-" + student.key}>
              <td>Hello there</td>
              <td>{this.props.questions[1].points}</td>
              <td>{this.props.questions[1].type}</td>
              <td>{student.answers[1]}</td>
            </tr>
          );
          itemRows.push(
            <tr key={"row-expanded-" + student.key}>
              <td>Hello there</td>
              <td>{this.props.questions[2].points}</td>
              <td>{this.props.questions[2].type}</td>
              <td>{student.answers[2]}</td>
            </tr>
          );
        }

        return itemRows;
    };

    render() {
        let allItemRows = [];

        this.props.students.forEach((student) => {
            let perItemRows = this.renderItem(student);
            allItemRows = allItemRows.concat(perItemRows);
        });

        return (
            <Col>
                <h1>Students</h1>
                <Row>
                    <Col>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Current Score</th>
                                    <th>Ungraded Points</th>
                                    <th>Grade (out of {this.props.maxScore})</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allItemRows}
                                <tr>
                                    <td/>
                                    <td/>
                                    <td>Curve (adjust max score) {this.props.maxScore}</td>
                                    <td>
                                        <FormGroup>
                                            <Row>
                                                <Col xs={4}/>
                                                <Col xs={4}>
                                                    <Input onChange={(score) => this.props.curveGrade(parseInt(score.target.value))}
                                                        type="number" defaultValue={this.props.maxScore}/>
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col xs={0} md={8}/>
                    <Col xs={12} md={2}>
                        <RouterLink to={"/ScribeScholars/HomePage/" + this.props.code + "/myStudents"}>
                            <Button>Return to Dashboard</Button>
                        </RouterLink>
                    </Col>
                    <Col xs={0} md={2}/>
                </Row>
            </Col>
        )
    };
}

export default StudListGrade