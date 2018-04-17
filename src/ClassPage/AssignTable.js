import React, { Component } from 'react';

import {Table, Container, Row, Col, Button } from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom'

import { firestore } from '../base.js'

import './Table.css'

class AssignTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      assignments: [{}],
      phrase: new Array(20),
      role: null,
      avail: null,
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
          assignments: self.props.assignments,
        });
      } else {
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });

  };

  /*
     * Updates firebase with the new availability
     */
  changeAvail = (assignment) => {
    let self = this;
    let user = firestore.collection("classes").doc(this.props.code).collection("inClass").doc(assignment.lessonCode);

    user.get().then((doc) => {
      if (doc.exists) {
        if (assignment.available) {
          assignment.available = false;
          user.update({
            available: false,
          }).then(function () {
            self.setState({
              phrase: "Enable",
            });
          });
        } else {
          assignment.available = true;
          user.update({
            available: true,
          }).then(function () {
            self.setState({
              phrase: "Disable",
            });
          });
        }
      }
    }).catch((error) => {
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
              <p className={"homeworkTitle"}>In-class Assignments</p>
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
          </Row>
          <Row>
            <Col xs={12}>
              <Table>
                <thead>
                <tr>
                  <th>Assignment</th>
                  <th>Points Possible</th>
                  <th>Links</th>
                  {this.state.role === "teacher"
                    ?
                    <th>Enable/Disable</th>
                    :
                    <th/>
                  }
                </tr>
                </thead>
                {Object.keys(this.state.assignments).map((key, index) => {
                  return <tbody key={key}>
                  {this.state.assignments[index].available === false && this.state.role === "student"
                    ?
                    <tr/>
                    :
                    <tr>
                      <td>{this.state.assignments[index].name}</td>
                      <td>{this.state.assignments[index].maxScore}</td>

                      {this.state.role === "teacher" ?
                        <td>
                          <RouterLink style={{display: 'inline-block', width: '1rem'}}
                            to={`/ScribeScholars/HomePage/${this.props.code}/lessons/liveFeed/${this.state.assignments[index].lessonCode}`}>
                            Live Feed
                          </RouterLink>
                          <span style={{display: 'inline-block', width: '1rem'}}> </span>
                          {this.state.assignments[index].available
                            ?
                            <p>Open</p>

                            :
                            <p>Closed</p>
                          }
                          <RouterLink
                            to={`/ScribeScholars/HomePage/${this.props.code}/lessons/edit-activity/${this.state.assignments[index].lessonCode}`}>
                            Edit
                          </RouterLink>
                        </td>
                        :
                        <td>
                        {this.state.assignments[index].available
                          ?
                          <RouterLink
                            to={`/ScribeScholars/HomePage/${this.props.code}/lessons/${this.state.assignments[index].lessonCode}`}>
                            Open
                          </RouterLink>
                          :
                          <p>Closed</p>
                        }
                        </td>
                      }

                      {this.state.role === "teacher"
                        ?
                        <td>
                          {this.state.assignments[index].available
                            ?
                            <Button
                              onClick={() => this.changeAvail(this.state.assignments[index])}>Disable</Button>
                            :
                            <Button
                              onClick={() => this.changeAvail(this.state.assignments[index])}>Enable</Button>
                          }
                        </td>
                        :
                        <td/>
                      }
                    </tr>
                  }
                  </tbody>
                })}
              </Table>
            </Col>
          </Row>
          <Row>
            <Col className={"moreSpace"}>
                {this.state.role === "teacher"
                    ?
                    <RouterLink to={`/ScribeScholars/HomePage/${this.props.code}/lesson/create-activity`}>
                        Create New In Class Lesson
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


export default AssignTable
