import React, {Component} from 'react'
import {FormGroup, Input, Row, Col, Button, Table, Label} from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom';

import './StudListGrade.css'

class StudListGrade extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expandedRows: [],
        };
    }

    handleRowClick = (uid) => {
        if (this.props.ungradedPoints === 0)
            return;

        let newExpandedRows = [];

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
            <tr key={student.key} className="mainRow">
                <td onClick={() => this.handleRowClick(student.key)} className="nameCell">{student.name}</td>
                <td>{student.score}</td>
                <td>{this.props.ungradedPoints}</td>
                <td>
                    <FormGroup>
                        <Row>
                            <Col xs={4}/>
                            <Col xs={4}>
                                <Input onChange={(score) => this.props.updateScore(student, parseInt(score.target.value, 10))}
                                    type="number" defaultValue={student.score}/>
                            </Col>
                        </Row>
                    </FormGroup>
                </td>
            </tr>
        ];

        if (this.state.expandedRows.includes(student.key)) {
            itemRows.push(
                <tr key={"expanded-head-" + student.key}>
                    <th>Question</th>
                    <th>Points Possible</th>
                    <th>Question Prompt</th>
                    <th>Student's Answer</th>
                </tr>
            );

            for (let i in this.props.questions) {
                if (this.props.questions.hasOwnProperty(i)) {
                    if (this.props.questions.type === "FRQ" || this.props.questions[i].type === "VIDEO") {
                        itemRows.push(
                            <tr key={"expanded-" + i + "-" + student.key} className="subRow">
                                <td>Question {i}</td>
                                <td>{this.props.questions[i].points}</td>
                                <td>{this.props.questions[i].prompt}</td>
                                <td>{student.answers[i]}</td>
                            </tr>
                      );
                    }
                }
            }
        }

        return itemRows;
    };

    render() {
        let allItemRows = [];

        this.props.students.forEach((student) => {
            let studentRow = this.renderItem(student);
            allItemRows = allItemRows.concat(studentRow);
        });

        return (
            <Col>
                <h1>Students</h1>
                <Row>
                    <Col>
                        <Table striped>
                            <thead>
                                <tr className="mainRow">
                                    <th>Name</th>
                                    <th>Current Score</th>
                                    <th>Ungraded Points</th>
                                    <th>Grade (out of {this.props.maxScore})</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allItemRows}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ size: 2, offset: 8 }} className="curveLabel">
                        <Label>Curve (adjust max score):</Label>
                    </Col>
                    {this.props.maxScore != null
                        ?
                        <Col xs={{size: 2}}>
                            <Input onChange={(score) => this.props.curveGrade(parseInt(score.target.value, 10))}
                                type="number" defaultValue={this.props.maxScore}/>
                        </Col>
                        :
                        <Col/>
                    }
                </Row>
                <br/>
                <Row>
                    <Col xs={0} md={8}/>
                    <Col xs={12} md={2}>
                        <Button onClick={this.props.returnToDashboard}>Return to Dashboard</Button>
                    </Col>
                    <Col xs={0} md={2}/>
                </Row>
            </Col>
        )
    };
}

//                        <RouterLink to={"/ScribeScholars/HomePage/" + this.props.code + "/myStudents"}>
export default StudListGrade