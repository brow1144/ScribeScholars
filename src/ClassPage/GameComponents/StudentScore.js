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
                <CardHeader tag="h2" className={"cardTitleText"}>Your Results:</CardHeader>
                <CardBody >
                  <br/>
                  <CardTitle tag={"p"} className={"cardTextStyle"}>
                    This is the waiting page for the game, your teacher is currently waiting for every student to join before we begin.
                  </CardTitle>
                  <br/>
                  <hr/>
                  <br/>
                  <CardTitle tag={"p"} className={"cardTextStyle"}>
                    There are two parts to every question in this game; the bonus point, and the regular point round.
                  </CardTitle>
                  <CardTitle tag={"p"} className={"cardTextStyle"}>
                    The bonus point will a fill in the blank version of the question, all questions are multiple choice but the answers will be hidden for this round.
                    If you abstain from the bonus point portion, or you get it wrong, there will still be the option to earn the normal amount of points in when the answers appear.
                  </CardTitle>
                  <br/>
                  <hr/>
                  <br/>
                  <CardTitle tag={"p"} className={"cardTextStyle"}>
                    The game's pace is controlled by the teacher, so when they decide the bonus round, normal round, or the score viewing is over they'll progress the game for everyone.
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