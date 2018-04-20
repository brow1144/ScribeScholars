import React, { Component } from 'react';
import {Jumbotron, Container, Row, Col, Input, Label, Form, FormGroup, Button, InputGroupAddon, InputGroup} from 'reactstrap';

class TeacherBonus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: this.props.game,
    }
  };

  render() {
    return (
        <div>
      <Container>
          <Jumbotron>
        <br/>
        <p className={"jumboMini"}>Current Question:</p>
        <hr/>
        <br/>
        <Row>
          <Col xs={12}>
            <h1 className={"jumboTitle"} style={{
              textAlign: 'center',
              fontSize: '5rem'
            }}> {this.state.game.questions[this.state.game.questIndex].prompt}</h1>
            <p className={"jumboSub"} style={{textAlign: 'center', fontSize: '2rem'}}>This is your chance for bonus points!</p>
          </Col>
        </Row>
        <hr/>
              <br/>
              <br/>
              <br/>

              <Row>
            <Col xs={4} fluid/>
          <Col xs={8} fluid>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <Button className={"buttBack"} onClick={this.props.theClick} style={{fontSize: '1.25rem'}}>
                  End Bonus
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
          </Jumbotron>
      </Container>
        </div>
    );
  }
}
export default TeacherBonus