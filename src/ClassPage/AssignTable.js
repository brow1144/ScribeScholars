import React, { Component } from 'react';

import {Table, Container, Row, Col } from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom'

import { firestore } from '../base.js'

import './Table.css'

class AssignTable extends Component {

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
                </tr>
                </thead>
                {this.props.assignments
                  ?
                  <tbody>
                  {Object.keys(this.props.assignments).map((key, index) => {
                    return <tr key={key}>
                      <td>{this.props.assignments[index].name}</td>
                      <td>{this.props.assignments[index].maxScore}</td>
                      <td>
                        {this.state.role === "teacher" ?
                            <div>
                                <RouterLink
                                    to={`/ScribeScholars/HomePage/${this.props.code}/lessons/liveFeed/${this.props.assignments[index].lessonCode}`}>
                                    Live Feed
                                </RouterLink>
                                <span style={{display: 'inline-block', width: '1.25rem'}}> </span>
                                <RouterLink
                                    to={`/ScribeScholars/HomePage/${this.props.code}/lessons/edit-activity/${this.props.assignments[index].lessonCode}`}>
                                    Edit
                                </RouterLink>
                            </div>
                            :
                            <RouterLink
                                to={`/ScribeScholars/HomePage/${this.props.code}/lessons/${this.props.assignments[index].lessonCode}`}>
                                Take Lesson
                            </RouterLink>
                        }
                      </td>
                    </tr>
                  })}
                  </tbody>
                  :
                  <tbody>
                  </tbody>
                }

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
