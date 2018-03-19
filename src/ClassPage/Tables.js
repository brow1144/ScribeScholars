import React from 'react'
import {Table, Container, Row, Col } from 'reactstrap';

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

                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>

        </div>
    )
};

export default Tables