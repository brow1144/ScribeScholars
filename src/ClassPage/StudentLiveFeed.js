import React, { Component } from 'react';

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import { Row, Col, Progress, Card, CardTitle, CardText, CardDeck, Table } from 'reactstrap';

import LineBreak from './LiveComponents/LineBreak';

class StudentLiveFeed extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const data = [
      {name: 'Question 1', ScoreHistory: 100},
      {name: 'Question 2', ScoreHistory: 50},
      {name: 'Question 3', ScoreHistory: 75},
      {name: 'Question 4', ScoreHistory: 80},
      {name: 'Question 5', ScoreHistory: 87},
      {name: 'Question 6', ScoreHistory: 92},
      {name: 'Question 7', ScoreHistory: 93},
    ];

    return (
      <div>
        <hr />
        <br />

        <Row>
          <Col xs="1" />
          <Col xs="10">
            <CardDeck>
              <Card body inverse style={{ backgroundColor: '#030C14', borderWidth: '0.2em', borderColor: '#21CE99' }}>
                <CardTitle>Progress</CardTitle>
                <Progress value="55">55%</Progress>
              </Card>
              <Card body inverse style={{ backgroundColor: '#030C14', borderWidth: '0.2em', borderColor: '#21CE99' }}>
                <CardTitle>Score</CardTitle>
                <CardText>78%</CardText>
              </Card>
              <Card body inverse style={{ backgroundColor: '#030C14', borderWidth: '0.2em', borderColor: '#21CE99' }}>
                <CardTitle>Compared to Class Average</CardTitle>
                <CardText>+10%</CardText>
              </Card>
            </CardDeck>
          </Col>
          <Col xs="1" />
        </Row>

        <LineBreak />

        <Row>
          <Col sm="12" md="8">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}
                         margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="ScoreHistory" stroke="#21CE99" activeDot={{r: 8}}/>
              </LineChart>
            </ResponsiveContainer>
          </Col>
          <Col sm="12" md="4">
            <Table hover>
              <thead>
              <tr>
                <th>#</th>
                <th>Prompt</th>
                <th>Correct / Incorrect</th>
              </tr>
              </thead>

              <tbody>
              <tr>
                <th scope="row">1</th>
                <td>First Question</td>
                <td>Wrong</td>
              </tr>
              </tbody>
              <tbody>
              <tr>
                <th scope="row">1</th>
                <td>First Question</td>
                <td>Wrong</td>
              </tr>
              </tbody>
              <tbody>
              <tr>
                <th scope="row">1</th>
                <td>First Question</td>
                <td>Wrong</td>
              </tr>
              </tbody><tbody>
            <tr>
              <th scope="row">1</th>
              <td>First Question</td>
              <td>Wrong</td>
            </tr>
            </tbody>


            </Table>
          </Col>
        </Row>

      </div>
    );
  }
}

export default StudentLiveFeed;
