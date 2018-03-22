import React, { Component } from 'react';

import { Row, Col, Progress, Card, CardTitle, CardText, CardDeck } from 'reactstrap';

class LessonStats extends Component {

  render() {
    return (
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
                <CardText>{this.props.classAverage}%</CardText>
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
    );
  }
}

export default LessonStats;
