import React, { Component } from 'react';

import { Row, Col, Progress, Card, CardTitle, CardText, CardDeck } from 'reactstrap';


class StudentStats extends Component {

  render() {
    if (this.props.aboveAverage) {
      return (
        <Row>
          <Col xs="1"/>
          <Col xs="10">
            <CardDeck>
              <Card body inverse style={{backgroundColor: '#030C14', borderWidth: '0.2em', borderColor: '#21CE99'}}>
                <CardTitle>Progress</CardTitle>
                <Progress value={this.props.progress}>{this.props.progress}%</Progress>
              </Card>
              <Card body inverse style={{backgroundColor: '#030C14', borderWidth: '0.2em', borderColor: '#21CE99'}}>
                <CardTitle>Score</CardTitle>
                <CardText>{this.props.score}%</CardText>
              </Card>
              <Card body inverse style={{backgroundColor: '#030C14', borderWidth: '0.2em', borderColor: '#21CE99'}}>
                <CardTitle>Compared to Class Average</CardTitle>
                <CardText style={{color: '#21CE99'}}>
                  Above
                  {/*<i className="fas fa-angle-double-up" style={{color: '#21CE99'}}/>*/}
                  <br/>
                  {this.props.comparedToAverage}%
                </CardText>
              </Card>
            </CardDeck>
          </Col>
          <Col xs="1"/>
        </Row>
      );
    } else {
      return (
        <Row>
          <Col xs="1" />
          <Col xs="10">
            <CardDeck>
              <Card body inverse style={{ backgroundColor: '#030C14', borderWidth: '0.2em', borderColor: '#21CE99' }}>
                <CardTitle>Progress</CardTitle>
                <Progress value={this.props.progress}>{this.props.progress}%</Progress>
              </Card>
              <Card body inverse style={{ backgroundColor: '#030C14', borderWidth: '0.2em', borderColor: '#21CE99' }}>
                <CardTitle>Score</CardTitle>
                <CardText>{this.props.score}%</CardText>
              </Card>
              <Card body inverse style={{backgroundColor: '#030C14', borderWidth: '0.2em', borderColor: '#21CE99'}}>
                <CardTitle>Compared to Class Average</CardTitle>
                <CardText style={{color: '#F45531'}}>
                  Below
                  {/*<i className="fas fa-angle-down" style={{color: '#F45531'}} />*/}
                  <br/>
                  {this.props.comparedToAverage}%
                </CardText>
              </Card>
            </CardDeck>
          </Col>
          <Col xs="1" />
        </Row>
      );
    }
  }
}

export default StudentStats;
