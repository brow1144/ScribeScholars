import React, { Component } from 'react';

import { Alert, Row, Col, Card, CardTitle, CardText } from 'reactstrap';
import { ResponsiveContainer, PieChart, Pie, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class LineBreak extends Component {

  render() {

    const data = [
      {name: 'Group A', value: 400}, {name: 'Group B', value: 300},
      {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
      {name: 'Group E', value: 278}, {name: 'Group F', value: 189}
    ];

    const data1 = [
      {name: 'Page A', Unanswered: 4000, Incorrect: 2400, Correct: 2400},
      {name: 'Page B', Unanswered: 3000, Incorrect: 1398, Correct: 2210},
      {name: 'Page C', Unanswered: 2000, Incorrect: 9800, Correct: 2290},
      {name: 'Page D', Unanswered: 2780, Incorrect: 3908, Correct: 2000},
      {name: 'Page E', Unanswered: 1890, Incorrect: 4800, Correct: 2181},
      {name: 'Page F', Unanswered: 2390, Incorrect: 3800, Correct: 2500},
      {name: 'Page G', Unanswered: 3490, Incorrect: 4300, Correct: 2100},
      {name: 'Page A', Unanswered: 4000, Incorrect: 2400, Correct: 2400},
      {name: 'Page B', Unanswered: 3000, Incorrect: 1398, Correct: 2210},
      {name: 'Page B', Unanswered: 3000, Incorrect: 1398, Correct: 2210},
    ];

    const data01 =
      [ {name: 'Not Started', value: 1},
        {name: 'In Progress', value: 4},
        {name: 'Completed', value: 6}];

    return (
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
          <b>Not Started / Working / Finished</b>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie isAnimationActive={false} data={data01} dataKey="value" innerRadius={20} outerRadius={40} fill="#21CE99" label/>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </Col>

        <Col sm="12" md="5">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data1}
                      margin={{top: 20, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend />
              <Bar dataKey="Unanswered" stackId="a" fill="#030C14" />
              <Bar dataKey="Incorrect" stackId="a" fill="#F45531" />
              <Bar dataKey="Correct" stackId="a" fill="#21CE99" />
            </BarChart>
          </ResponsiveContainer>
        </Col>

        <Col xs="1" />

      </Row>
    );
  }
}

export default LineBreak;
