import React, { Component } from 'react';

import { Container, Row, Col, Card, CardTitle, Button, CardHeader, CardBody, FormGroup, Form, Label, Input } from 'reactstrap';

import '../CreateActivity/Instruct.css';

class GameInstruct extends Component {

  render() {
    return(
      <Container fluid>
        <br/>
        <br/>
        <Row>
          <Col xs={12} lg={12} style={{paddingRight: '4rem'}}>
            <Card style={{boxShadow: '8px 8px 3px rgba(0, 0, 0, 0.2)'}}>
              <CardHeader tag="h2" className={"cardTitleText"}>Instructions</CardHeader>
              <CardBody >
                <br/>
                <CardTitle tag={"p"} className={"cardTextStyle"}>
                  On this page you will select the name for this game and add any number of multiple choice questions. When you are finished adding questions, please click "Publish Game".
                </CardTitle>
                <br/>
                <hr/>
                <br/>
                <CardTitle tag={"p"} className={"cardTextStyle"}>
                  Add Description of how to play game.
                </CardTitle>
                <br/>
                <hr/>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Container>

    );
  }
}

export default GameInstruct