import React, { Component } from 'react';
import {Table, Container, Row, Col, Label } from 'reactstrap';
import { firestore } from "../base";
import { NavLink as RouterLink } from 'react-router-dom'
import './Table.css'

class GradesTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: this.props.uid,
      code: this.props.code,
      gradeData: [],
      doneLoading: false
    };

    let self = this;
    let docRef = firestore.collection("users").doc(this.props.uid).collection("assignments").doc(this.props.code);
    docRef.get().then(function (doc) {

      self.setState({ gradeData: doc.data().grades });

    }).then( function () {

      self.setState({ doneLoading: true });

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }

  render() {

    if(!this.state.doneLoading){
      return (
        <div>
          <Label>
            LOADING
          </Label>
        </div>
        )
    }

    else {
      return (
        <div>
          <Container fluid>
            <Row>
              <Col className={"makeSpace"}>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className={"homeworkTitle"}>Grades</p>
              </Col>
            </Row>
            <Row>
              <Col className={"makeSpace"}>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <Table>
                  <thead>
                  <tr>
                    <th>Assignment</th>
                    <th>Score</th>
                    <th>Max Score</th>
                    <th>Request Regrade</th>
                  </tr>
                  </thead>
                  <tbody>
                  {Object.keys(this.state.gradeData).map((key, index) => {
                    return <tr key={key}>
                      <td>{this.state.gradeData[index].name}</td>
                      <td>{this.state.gradeData[index].score}</td>
                      <td>{this.state.gradeData[index].maxscore}</td>
                      <td>
                        <RouterLink to={`practiceQuestion`}>
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
};

export default GradesTable