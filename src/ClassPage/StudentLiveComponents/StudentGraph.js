import React, { Component } from 'react';

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import { Col } from 'reactstrap';

class StudentGraph extends Component {

  render() {

    // const data = [
    //   {name: 'Question 1', ScoreHistory: 100},
    //   {name: 'Question 2', ScoreHistory: 50},
    //   {name: 'Question 3', ScoreHistory: 75},
    //   {name: 'Question 4', ScoreHistory: 80},
    //   {name: 'Question 5', ScoreHistory: 87},
    //   {name: 'Question 6', ScoreHistory: 92},
    //   {name: 'Question 7', ScoreHistory: 93},
    // ];

    return (
      <Col sm="12" md="8">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={this.props.historyGraph}
                     margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="name"/>
            <YAxis domain={[0, 100]}/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="ScoreHistory" stroke="#21CE99" activeDot={{r: 8}}/>
          </LineChart>
        </ResponsiveContainer>
      </Col>
    );
  }
}

export default StudentGraph;
