import React, {Component} from 'react';

import {Row, Col, Progress, Card, CardTitle, CardText, CardDeck} from 'reactstrap';


class StudentStats extends Component {

  render() {
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
              {this.props.aboveAverage ?
                <CardText style={{color: '#21CE99'}}>
                  {/*<i className="fas fa-angle-double-up" style={{color: '#21CE99'}}/>*/}
                  Above
                  <br/>
                  {this.props.comparedToAverage}%
                </CardText>
                :
                <CardText style={{color: '#F45531'}}>
                  {/*<i className="fas fa-angle-double-up" style={{color: '#21CE99'}}/>*/}
                  Below
                  <br/>
                  {this.props.comparedToAverage}%
                </CardText>
              }
            </Card>
          </CardDeck>
        </Col>
        <Col xs="1"/>
      </Row>
    );
  }
}

export default StudentStats;
