import React, { Component } from 'react';

import { Table, Row, Col, Progress, Card, CardTitle, CardText, CardDeck, Jumbotron } from 'reactstrap';
import { ResponsiveContainer, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import './LiveFeed.css';

class LiveFeed extends Component {

  constructor() {
    super();

    this.state = {
    }
  }

  render() {

    const data = [
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



          <Col sm="12" md="2" >
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
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                </Card>
              </Col>
            </Row>

            <br />

            <Row>
              <Col>
                <Card body outline color="info">
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                </Card>
              </Col>
            </Row>
          </Col>



          <Col sm="12" md="8">
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
