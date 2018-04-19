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
                <Row style={{height: '5rem', borderRadius: '25px'}}>
                    <Col xs={{size: '8', offset: '2'}} style={{borderRadius: '25px'}}>
                        <Card onClick={() => {this.recordChoice("option1")}} style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                            <CardHeader tag="h4" style={{textAlign: 'center'}} className={"cardTitleHov"}>{this.state.game.questions[this.state.game.questIndex].option1}</CardHeader>
                        </Card>
                    </Col>
                </Row>
                <br/>
                <br/>
                <br/>
                <Row style={{height: '5rem', borderRadius: '25px'}}>
                    <Col xs={{size: '8', offset: '2'}} style={{borderRadius: '25px'}}>
                        <Card onClick={() => {this.recordChoice("option2")}} style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                            <CardHeader tag="h4" style={{textAlign: 'center'}} className={"cardTitleHov2"}>{this.state.game.questions[this.state.game.questIndex].option2}</CardHeader>
                        </Card>
                    </Col>
                </Row>
                <br/>
                <br/>
                <br/>
                <Row style={{height: '5rem', borderRadius: '25px'}}>
                    <Col xs={{size: '8', offset: '2'}} style={{borderRadius: '25px'}}>
                        <Card onClick={() => {this.recordChoice("option3")}} style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                            <CardHeader tag="h4" style={{textAlign: 'center'}} className={"cardTitleHov3"}>{this.state.game.questions[this.state.game.questIndex].option3}</CardHeader>
                        </Card>
                    </Col>
                </Row>
                <br/>
                <br/>
                <br/>
                <Row style={{height: '5rem', borderRadius: '25px'}}>
                    <Col xs={{size: '8', offset: '2'}} style={{borderRadius: '25px'}}>
                        <Card onClick={() => {this.recordChoice("option4")}} style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                            <CardHeader tag="h4" style={{textAlign: 'center'}} className={"cardTitleHov4"}>{this.state.game.questions[this.state.game.questIndex].option4}</CardHeader>
                        </Card>
                    </Col>
                </Row>
            </div>

        );

    }
}
export default TeacherMC