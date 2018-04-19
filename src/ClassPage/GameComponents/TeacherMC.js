// USE FOR MULTIPLE CHOICE PART OF GAME
// TEACHERMC = STUDENTGAME
// TEACHERGAME = STUDENTMC

import React, { Component } from 'react';

import {Container, Row, Col, Input, Label, Form, FormGroup, Button, Card, CardHeader} from 'reactstrap';

import './GameComps.css';

class TeacherMC extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: this.props.game,
        }
    };

    recordChoice = (ev) => {
        console.log(ev);
        this.props.theClick();
    };

    render() {
        return(
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Row>
                    <Col xs={12}>
                        <h1 style={{textAlign: 'center', fontSize: '5rem'}}> {this.state.game.questions[this.state.game.questIndex].prompt}</h1>
                        <p style={{textAlign: 'center'}}>Now select an option for answer!</p>
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
                <br/>
                <br/>
              <Row>
                <Col xs={{size: '8', offset: '2'}}>
                  <Button onClick={this.props.theClick} style={{fontSize: '1.25rem'}} color="info">
                    End Bonus
                  </Button>
                </Col>
              </Row>
            </div>

        );

    }
}
export default TeacherMC