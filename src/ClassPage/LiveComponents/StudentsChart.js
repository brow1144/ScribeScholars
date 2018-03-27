import React, { Component } from 'react';

import { Row, Col, Card, CardTitle, Table } from 'reactstrap';
import { ResponsiveContainer, PieChart, Pie, Tooltip } from 'recharts';

import TableElement from './TableElement';

class StudentsChart extends Component {

  render() {

    const tableElementData = {
      studentsData: this.props.studentsData,
      progressMap: this.props.progressMap,
      scoresMap: this.props.scoresMap,
    };

    return (
      <Row>

        <Col md="1" />
        <Col xs="12" md="6">
          <Table hover>
            <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Current Score</th>
              <th>Progress</th>
            </tr>
            </thead>

              {Object.keys(this.props.studentsData).map((key, index) => {
                return (
                  <TableElement {...tableElementData} key={key} index={index}/>
                )
              })}

          </Table>
        </Col>


        <Col xs="12" md="4">
          <Card body outline color="info">
            <CardTitle>Grade Distribution</CardTitle>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie isAnimationActive={false} data={this.props.gradeMap} dataKey="value" outerRadius={35} fill="#21CE99" label/>
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

export default StudentsChart;
