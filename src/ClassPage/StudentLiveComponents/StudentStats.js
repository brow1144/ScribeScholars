import React, { Component } from 'react';

import { Row, Col, Progress, Card, CardTitle, CardText, CardDeck } from 'reactstrap';


class StudentStats extends Component {

  render() {
    return (
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
              <CardText>
                <i style={{color: '#21CE99'}} className="fas fa-angle-double-up" />
                <br/>
                10%
              </CardText>
            </Card>
          </CardDeck>
        </Col>
        <Col xs="1" />
      </Row>
    );
  }
}

export default StudentStats;
