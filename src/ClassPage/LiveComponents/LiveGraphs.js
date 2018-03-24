import React, { Component } from 'react';

import { Row, Col, Card, CardTitle, CardText } from 'reactstrap';
import { ResponsiveContainer, PieChart, Pie, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class LiveGraphs extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {

    const data1 = [
      {name: 'Question 1', Unanswered: 2, Incorrect: 0, Correct: 0},
      {name: 'Question 2', Unanswered: 2, Incorrect: 0, Correct: 0},
      {name: 'Question 3', Unanswered: 2, Incorrect: 0, Correct: 0},
      {name: 'Question 4', Unanswered: 2, Incorrect: 0, Correct: 0},
    ];

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
                <CardText>{this.props.highFirstName} {this.props.highLastName} {this.props.highestScore}%</CardText>
              </Card>
            </Col>
          </Row>

          <br />

          <Row>
            <Col>
              <Card body outline color="info">
                <CardTitle>Lowest Score</CardTitle>
                <CardText>{this.props.lowFirstName} {this.props.lowLastName} {this.props.lowestScore}%</CardText>
              </Card>
            </Col>
          </Row>
        </Col>


        <Col xs="12" md="2" >
          <b>Not Started / Working / Finished</b>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie isAnimationActive={false} data={this.props.completionGraphMap} dataKey="value" innerRadius={20} outerRadius={40} fill="#21CE99" label/>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </Col>

        <Col sm="12" md="5">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={this.props.answerMap}
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

export default LiveGraphs;
