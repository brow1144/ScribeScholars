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

    const data1 = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    ];

    return (
      <div>
        <hr/>
        <br/>
        <Row>
          <Col xs="1" />
          <Col xs="10">
            <CardDeck>
              <Card body inverse style={{ backgroundColor: '#030C14', borderWidth: '0.2em', borderColor: '#21CE99' }}>
                <CardTitle>Class Progress</CardTitle>
                <Progress value="45">45%</Progress>
              </Card>
              <Card body inverse style={{ backgroundColor: '#030C14', borderWidth: '0.2em', borderColor: '#21CE99' }}>
                <CardTitle>Class Average</CardTitle>
                <CardText>80%</CardText>
              </Card>
              <Card body inverse style={{ backgroundColor: '#030C14', borderWidth: '0.2em', borderColor: '#21CE99' }}>
                <CardTitle>Class Median</CardTitle>
                <CardText>75%</CardText>
              </Card>
              <Card body inverse style={{ backgroundColor: '#030C14', borderWidth: '0.2em', borderColor: '#21CE99' }}>
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
                <Card body inverse style={{ backgroundColor: '#030C14', borderWidth: '0.2em', borderColor: '#21CE99' }}>
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


          <Col xs="12" md="2" >

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
                    <Pie startAngle={90} endAngle={-60} data={data} dataKey="value" outerRadius={40} fill="#F45531" label/>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Col>
            </Row>
          </Col>

          <Col sm="12" md="5">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data1}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />f
                <Bar dataKey="pv" fill="#21CE99" />
                <Bar dataKey="uv" fill="#030C14" />
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
        <Col md="1" />
        <Col xs="12" md="6">
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
        <Col xs="12" md="4">
          <Card body outline color="info">
            <CardTitle>Grade Distribution</CardTitle>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={data} dataKey="value" outerRadius={35} fill="#21CE99" label/>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col md="1" />
      </Row>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

      </div>
    );
  }
}

export default LiveFeed;
