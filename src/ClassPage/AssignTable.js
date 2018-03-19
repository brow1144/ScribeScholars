import React from 'react'
import {Table, Container, Row, Col } from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom'
import './Table.css'

const AssignTable = (props) => {

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
                <th>Max Score</th>
                <th>Links</th>
              </tr>
              </thead>
              {props.assignments
                ?
                <tbody>
                {Object.keys(props.assignments).map((key, index) => {
                  return<tr key={key}>
                    <td>{props.assignments[index].name}</td>
                    <td>{props.assignments[index].maxscore}</td>
                    <td>
                      <RouterLink to={`/HomePage/${this.props.code}/lessons/12345`}>
                        Link
                      </RouterLink>
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
          </Col>
        </Row>
        <Row>
          <Col className={"moreSpace"}>
          </Col>
        </Row>
      </Container>

    </div>
  )
};

export default AssignTable