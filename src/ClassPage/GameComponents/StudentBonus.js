import React, { Component } from 'react';

import {Container, Row, Col, Input, Label, Form, FormGroup, Button, InputGroupAddon, InputGroup} from 'reactstrap';


class StudentBonus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: this.props.game,
      inputValue: "",
    }
  };

  recordResponse = () => {
    console.log(this.state.inputValue);
  };

  updateInputValue = (ev) => {
    this.setState({
      inputValue: ev.target.value,
    })
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
              <Input style={{height: '5rem', fontSize: '1.75rem'}} value={this.state.inputValue} onChange={this.updateInputValue}/>
              <InputGroupAddon addonType="append">
                <Button onClick={this.recordResponse} style={{fontSize: '1.25rem'}} color="info">Submit Your Answer!</Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
      </div>
    );

  }
}
export default StudentBonus