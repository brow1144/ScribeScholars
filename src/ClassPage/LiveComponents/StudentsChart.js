import React, { Component } from 'react';

import { Row, Col, Card, CardTitle, Table, Progress } from 'reactstrap';
import { ResponsiveContainer, PieChart, Pie, Tooltip } from 'recharts';

class LineBreak extends Component {

  render() {

    const data = [
      {name: 'A', value: 234},
      {name: 'B', value: 234},
      {name: 'C', value: 300},
      {name: 'D', value: 200},
      {name: 'F', value: 189}
    ];

    return (
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
                <Pie isAnimationActive={false} data={data} dataKey="value" outerRadius={35} fill="#21CE99" label/>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col md="1" />
      </Row>
    );
  }
}

export default LineBreak;
