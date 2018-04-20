// USE FOR MULTIPLE CHOICE PART OF GAME
// TEACHERMC = STUDENTGAME
// TEACHERGAME = STUDENTMC

import React, { Component } from 'react';

import {Jumbotron, InputGroup, InputGroupAddon, Container, Row, Col, Input, Label, Form, FormGroup, Button, Card, CardHeader} from 'reactstrap';

import './GameComps.css';

class TeacherMC extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: this.props.game,
        }
    };

    render() {
        return(
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
                                <p className={"jumboSub"} style={{textAlign: 'center', fontSize: '2rem'}}>Currently accepting answers for multiple choice question.</p>
                            </Col>
                        </Row>
                        <hr/>
                        <br/>
                        <br/>
                        <br/>

                        <Row>
                            <Col xs={5} fluid/>
                            <Col xs={7} fluid>
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
export default TeacherMC