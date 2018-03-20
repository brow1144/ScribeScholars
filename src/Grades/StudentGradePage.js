import React, {Component} from 'react';
import {Container, Row, Col, Table} from 'reactstrap';
import { firestore } from '../base.js';
import './StudentGradePage.css';


class StudentGradePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            uid: props.uid,
            //code: props.code,
            code: "668273",
            assignments: null,
            assignmentData: null,
            currentRow: 0,
            total: 0,
        }
        this.getAssignments();
    }

    getAssignments(){
        let self = this;

        let studentRef = firestore.collection("users").doc(self.state.uid);
        studentRef.get().then(function (doc) {
           if(doc.exists){
               if(doc.data().assignments != null){
                   self.setState({
                      assignments: doc.data().assignments,
                   });
                   self.setUpRows();
               }
           }
        }).catch(function (error) {
            console.log("User not found!");
        });
    }

    incrememntCurrentRow(){
        let curRow = this.state.currentRow;
        curRow++;
        this.setState({
            currentRow: curRow,
        });
    }

    setUpRows(){
        let assignmentData = [];
        for(let i = 0; i < this.state.assignments.length; i++){
            let currentAssignment = this.state.assignments[this.state.currentRow];

            assignmentData[this.state.currentRow] = "<tr>" +
                "<th scope='row'>" + (this.state.currentRow + 1) + "</th>" +
                "<td>" + currentAssignment.name + "</td>" +
                "<td>" + currentAssignment.score + "</td>" +
                "<td>" + currentAssignment.maxscore + "</td>" +
                "</tr>";

            this.incrememntCurrentRow();
        }

        this.setState({
           assignmentData: assignmentData,
        });
    }

    printAssignmentData = () => {
        console.log("Reached assignment data");
        if(this.state.assignmentData === null){
            console.log("Assignment data is null");
            return;
        }

        let data = "";
        for(let i = 0; i < this.state.assignmentData.length; i++){
            data += this.state.assignmentData[i];
        }
        console.log(data);
        return data;
    }

    addToAssignmentTable(){
        let table = document.getElementById("assignmentTable");
        let added = document.createElement("div");
        table.appendChild(added);
        added.appendChild(document.createElement("tr"));
        let th = document.createElement("th");
        th.scope = "row";
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
                            <Table dark striped bordered hover style={{width: "80%"}}>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Assignment</th>
                                    <th>Score</th>
                                    <th>Max Score</th>
                                </tr>
                                </thead>

                                <tbody id="assignmentTable">

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