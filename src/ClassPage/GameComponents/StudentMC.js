import React, { Component } from 'react';

import {Container, Row, Col, Input, Label, Form, FormGroup, Button, Card, CardBody, CardHeader, CardTitle} from 'reactstrap';

import { firestore } from "../../base";

import Game from './StudentGame';
import Bonus from './StudentBonus';
import Score from './StudentScore';

import ReactLoading from 'react-loading';

class StudentMC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: {},
      mcqSubmitted: false,
      bonusSubmitted: false,
      correct: false,
      uid: this.props.uid,
      class: this.props.class,
      lessonNumber: this.props.lessonNumber,
      key: false,
    };

  };

  componentWillMount() {
    this.grabGameDetails();
  };

  grabGameDetails = () => {
    let self = this;
    let gameRef = firestore.collection("classes").doc(this.props.class).collection("games").doc(this.props.lessonNumber);

    gameRef.onSnapshot(function (doc) {
      self.setState({
        game: doc.data(),
        key: !self.state.key,
      })
    })
  };

  submitBonus = () => {

  };

  submitMCQ = () => {

  };

  render() {
    if (this.state.game.lobbyStage) {
    return (
      <Container fluid>
        <br/>
        <br/>
        <Row>
          <Col xs={{size: 10, offset: 1}} xl={{size: 6, offset: 3}} style={{paddingRight: '4rem'}}>
            <Card style={{boxShadow: '8px 8px 3px rgba(0, 0, 0, 0.2)'}}>
              <CardHeader tag="h2" className={"cardTitleText"}>Game Lobby</CardHeader>
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
        <Row>
          <Col xs={{size: 10, offset: 2}} lg={{size: 6, offset: 3}} xl={{size: 6, offset: 4}}>
            <ReactLoading type={'bars'} width={'26rem'} height={'18rem'} color={'#21CE99'}/>
          </Col>
        </Row>
      </Container>
    );
    } else if (this.state.game.bonusStage) {
      return (
        <Bonus key={this.state.key} game={this.state.game}/>
      );
    }
    else if (this.state.game.scoreStage) {
      return (
        <Score game={this.state.game}/>
        );
    }
    else if (this.state.game.mcStage) {
      return (
        <Game game={this.state.game}/>
        );
    }
    else {
      return(
        <div>
          <br/>
          <br/>
          <Row>
            <Col xs={{size: 4, offset: 4}}>
              <br/>
              <br/>
              <ReactLoading type={'bars'} width={'26rem'} height={'18rem'} color={'#21CE99'}/>
            </Col>
          </Row>
        </div>
      );
    }
  }
}
export default StudentMC