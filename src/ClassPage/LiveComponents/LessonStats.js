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
                <Progress value={this.props.classProgress}>{this.props.classProgress}%</Progress>
              </Card>
              <Card body inverse style={{ backgroundColor: '#030C14', borderWidth: '0.2em', borderColor: '#21CE99' }}>
                <CardTitle>Class Average</CardTitle>
                <CardText>{this.props.classAverage}%</CardText>
              </Card>
              <Card body inverse style={{ backgroundColor: '#030C14', borderWidth: '0.2em', borderColor: '#21CE99' }}>
                <CardTitle>Class Median</CardTitle>
                <CardText>{this.props.classMedian}%</CardText>
              </Card>
              <Card body inverse style={{ backgroundColor: '#030C14', borderWidth: '0.2em', borderColor: '#21CE99' }}>
                <CardTitle>Number of Questions</CardTitle>
                <CardText>{this.props.numberOfQuestions}</CardText>
              </Card>
            </CardDeck>
          </Col>
          <Col xs="1" />
        </Row>
    );
  }
}

export default LessonStats;
