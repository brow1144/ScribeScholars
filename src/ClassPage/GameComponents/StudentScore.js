import React, { Component } from 'react';

import {Container, Row, Col, Input, Label, Form, FormGroup, Button, Card, CardBody, CardHeader, CardTitle} from 'reactstrap';


class StudentScore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: this.props.game,
    }
  };

  render() {
      return(
        <Container fluid>
          <br/>
          <br/>
          <Row>
            <Col xs={{size: 8, offset: 1}} lg={{size: 7, offset: 1}} xl={{size: 6, offset: 2}} style={{paddingRight: '4rem'}}>
              <Card style={{boxShadow: '8px 8px 3px rgba(0, 0, 0, 0.2)'}}>
                <CardHeader tag="h2" className={"cardTitleScore1"}>Your Results:</CardHeader>
                <CardBody>
                  <br/>
                  {this.props.correct
                    ?
                    <CardTitle tag={"p"} className={"cardTextStyle"}>
                      You Answered the previous question correctly. Good job!
                    </CardTitle>
                    :
                    <CardTitle tag={"p"} className={"cardTextStyle"}>
                      You Answered the previous question incorrectly. You'll get it next time!
                    </CardTitle>
                  }
                  <br/>
                  <hr/>
                  <br/>
                  <CardTitle tag={"p"} className={"cardTextStyle"}>
                    Your current score is {this.state.game.userScores[this.props.userIndex].score} points!
                  </CardTitle>
                  <br/>
                  <hr/>
                  <br/>
                  <CardTitle tag={"p"} className={"cardTextStyle"}>
                    You're doing better than X classmates!
                  </CardTitle>
                  <br/>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      );

  }
}
export default StudentScore