import React, { Component } from 'react';

import { Table, Alert, Row, Col, Progress, Card, CardTitle, CardText, CardDeck } from 'reactstrap';
import { ResponsiveContainer, PieChart, Pie, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import './LiveFeed.css';

class LiveFeed extends Component {

  constructor() {
    super();

    this.state = {
    }
  }

  render() {


    const data = [
      {name: 'Group A', value: 400}, {name: 'Group B', value: 300},
      {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
      {name: 'Group E', value: 278}, {name: 'Group F', value: 189}
      ];

    return (
      <div>
        <Row>
          <Col xs="1" />
          <Col xs="10">
            <CardDeck>
              <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                <CardTitle>Class Progress</CardTitle>
                <Progress value="45">45%</Progress>
              </Card>
              <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                <CardTitle>Class Average</CardTitle>
                <CardText>80%</CardText>
              </Card>
              <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                <CardTitle>Class Median</CardTitle>
                <CardText>75%</CardText>
              </Card>
              <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                <CardTitle>Number of Questions</CardTitle>
                <CardText>15</CardText>
            </Card>
            </CardDeck>
          </Col>
          <Col xs="1" />
        </Row>

        <Row>
          <Col xs="1" />
          <Col xs="10">
            <hr />
          </Col>
          <Col xs="" />
        </Row>

        <Row>
          <Col xs="1" />



          <Col sm="12" md="3" >
            <Row>
              <Col>
                <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                  <CardTitle>Stats</CardTitle>
                </Card>
              </Col>
            </Row>

            <br />

            <Row>
              <Col>
                <Card body outline color="info">
                  <CardTitle>Highest Score</CardTitle>
                  <CardText>Kyle Brown: 98%</CardText>
                </Card>
              </Col>
            </Row>

            <br />

            <Row>
              <Col>
                <Card body outline color="info">
                  <CardTitle>Lowest Score</CardTitle>
                  <CardText>Walter 29%</CardText>
                </Card>
              </Col>
            </Row>
          </Col>


          <Col xs="2">

            <Row>
              <Col>
                <Alert color="success">
                  <h4 className="alert-heading">Number of Students Remaining</h4>
                  <p>
                    15
                  </p>
                  <hr />
                  <p className="mb-0">
                    out of 26
                  </p>
                </Alert>
              </Col>
            </Row>

            <Row>
              <Col>
                <b>Remaining Time</b>
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie startAngle={90} endAngle={-60} data={data} outerRadius={40} fill="#8884d8" label/>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Col>
            </Row>
          </Col>

          <Col sm="12" md="5">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Col>


          <Col xs="1" />


        </Row>

        <Row>
          <Col xs="1" />
          <Col xs="10">
            <hr />
          </Col>
          <Col xs="" />
        </Row>

      <Row>
          <Col xs="1" />
          <Col xs="10">
            <Table striped>
              <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Module</th>
                <th>Progress</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Kyle</td>
                <td>Investing</td>
                <td>
                  <div className="text-center">85%</div>
                  <Progress animated color="success" value="85" />
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Walter</td>
                <td>Wealth</td>
                <td>
                  <div className="text-center">15%</div>
                  <Progress animated color="danger" value="15" />
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Jeremy</td>
                <td>Debt</td>
                <td>
                  <div className="text-center">55%</div>
                  <Progress animated color="warning" value="55" />
                </td>
              </tr>
              </tbody>
            </Table>
          </Col>
          <Col xs="1" />
        </Row>
      </div>
    );
  }
}

export default LiveFeed;
