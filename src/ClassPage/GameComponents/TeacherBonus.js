import React, { Component } from 'react';
import {Container, Row, Col, Input, Label, Form, FormGroup, Button, InputGroupAddon, InputGroup} from 'reactstrap';

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
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Row>
          <Col xs={12}>
            <h1 style={{
              textAlign: 'center',
              fontSize: '5rem'
            }}> {this.state.game.questions[this.state.game.questIndex].prompt}</h1>
            <p style={{textAlign: 'center', fontSize: '2rem'}}>This is your chance for bonus points!</p>
          </Col>
        </Row>
        <br/>
        <br/>
        <hr/>

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Row>
          <Col xs={{size: '8', offset: '2'}}>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <Button onClick={this.props.theClick} style={{fontSize: '1.25rem'}} color="info">
                  End Bonus
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
      </div>
    );
  }
}
export default TeacherBonus