import React from 'react'
import {Table, Container, Row, Col } from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom'
import './Table.css'

const HomeworkTable = (props) => {

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
                <th>Max Score</th>
                <th>Links</th>
              </tr>
              </thead>
              <tbody>
              {Object.keys(props.homeworks).map((key, index) => {
                return<tr key={key}>
                  <td>{props.homeworks[index].name}</td>
                  <td>{props.homeworks[index].maxscore}</td>
                  <td>
                    <RouterLink to={`/HomePage/${props.code}/homework/${props.homeworks[index].lessonCode}`}>
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
};

export default HomeworkTable