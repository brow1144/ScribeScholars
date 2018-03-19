import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import {Table, Container, Card, CardHeader, CardTitle, CardText, CardSubtitle, CardBody, Row, Col } from 'reactstrap';

const Tables = (props) => {

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
                    <th>#</th>
                    <th>Assignment</th>
                    <th>Max Score</th>
                    <th>Links</th>
                  </tr>
                  </thead>
                  <tbody>
                    {Object.keys(props.assignment).map((key, index) => {
                        return
                            <div key={key}>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>{props.assignment[index].name}</td>
                                    <td>{props.assignment[index].maxscore}</td>
                                    <td>
                                        <RouterLink to={`practiceQuestion`}>
                                            Link
                                        </RouterLink>
                                    </td>
                                </tr>
                            </div>
                        })
                    }
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>

        </div>
    )
};

export default Tables