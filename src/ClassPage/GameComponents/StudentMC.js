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
      game: {

      },
      mcqFlip: false,
      bonusFlip: false,
      correct: false,
      score: 0,
      uid: this.props.uid,
      class: this.props.class,
      lessonNumber: this.props.lessonNumber,
      key: false,
      currentScore: 0,
      userIndex: null,
    };

  };

  componentWillMount() {
    this.grabGameDetails();
  };

  grabGameDetails = () => {
    let self = this;
    let gameRef = firestore.collection("classes").doc(this.props.class).collection("games").doc(this.props.lessonNumber);

    let changeScore = false;
    gameRef.onSnapshot(function (doc) {
      for (let i in doc.data().userScores) {
        if (doc.data().userScores[i].uid === self.state.uid) {
          changeScore = doc.data().userScores[i].score;
          self.setState({userIndex: i});
          break;
        }
      }
      if (changeScore >= self.state.score)
        self.setState({
          game: doc.data(),
          key: !self.state.key,
          score: changeScore,
        });
      else
        self.setState({
          game: doc.data(),
          key: !self.state.key,
        });
      if (doc.data().scoreStage)
        self.setState({
          mcqFlip: false,
          bonusFlip: false,
        })
    })
  };

  submitBonus = (resp) => {
    resp = resp.toUpperCase();
    let currentScore = this.state.score;
/*    for (let i in this.state.game.userScores) {
      if (this.state.game.userScores[i].uid === this.state.uid) {
        currentScore = this.state.game.userScores[i].score;
        break;
      }
    }*/
    if (resp === this.state.game.questions[this.state.game.questIndex].strAns.toUpperCase()) {
      currentScore += 3;
      this.setState({
        bonusFlip: true,
        score: currentScore,
        correct: true,
      }, () => {this.updateFirebase();});
    }
    else {
      this.setState({
        bonusFlip: true,
        score: currentScore,
        correct: false,
      }, () => {this.updateFirebase();});
    }
  };

  submitMCQ = (resp) => {
    resp = resp.toUpperCase();
    let currentScore = this.state.score;

    if (resp === this.state.game.questions[this.state.game.questIndex].strAns.toUpperCase()) {
      currentScore += 1;
      this.setState({
        mcqFlip: true,
        score: currentScore,
        correct: true,
      }, () => {this.updateFirebase();});
    }
    else {
      this.setState({
        bonusFlip: true,
        score: currentScore,
        correct: false,
      }, () => {this.updateFirebase();});
    }
  };

  updateFirebase = () => {
    let self = this;
    let gameRef = firestore.collection("classes").doc(this.props.class).collection("games").doc(this.props.lessonNumber);

    let arr = self.state.game;
    arr.userScores[self.state.userIndex].score = self.state.score;
    arr.userScores[self.state.userIndex].prevCorrect = self.state.correct;

    gameRef.update({
      userScores: arr.userScores,
    }).catch()

  };

  render() {
    if (!this.state.game.active) {
      return(
        <Row>
          <Col xs={12}>
            <h1 style={{
              textAlign: 'center',
              fontSize: '5rem'
            }}> Game No Longer In Session</h1>
          </Col>
        </Row>
      );
    }
    if (this.state.game.lobbyStage) {
    return (
      <Container fluid>
        <br/>
        <br/>
        <Row>
          <Col xs={{size: 8, offset: 1}} lg={{size: 7, offset: 1}} xl={{size: 6, offset: 2}} style={{paddingRight: '4rem'}}>
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
                  If you abstain from the bonus point portion, there will still be the option to earn the normal amount of points in when the answers appear. Be careful! You can't answer the multiple choice portion if you get the bonus wrong
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
          <Col xs={{size: 2, offset: 2}} lg={{size: 3, offset: 3}} xl={{size: 1, offset: 4}}>
            <ReactLoading type={'bars'} width={250} height={150} color={'#21CE99'}/>
          </Col>
        </Row>
        <br/>
        <br/>
        <br/>
      </Container>
    );
    } else if (this.state.game.bonusStage) {
      return (
        <Bonus key={this.state.key} bonus={this.state.bonusFlip} submit={this.submitBonus} game={this.state.game}/>
      );
    }
    else if (this.state.game.scoreStage) {
      return (
        <Score key={this.state.key} game={this.state.game} correct={this.state.correct} userIndex={this.state.userIndex}/>
        );
    }
    else if (this.state.game.mcStage) {
      return (
        <Game key={this.state.key} flip={this.state.mcqFlip} bonus={this.state.bonusFlip} submit={this.submitMCQ}
              game={this.state.game}/>
      );
    }
    else {
      return(
        <div>
          <br/>
          <br/>
          <Row>
            <Col xs={{size: 4, offset: 1}} lg={{size: 4, offset: 4}}>
              <br/>
              <br/>
              <div style={{margin: 'auto', width: '50%'}}>
              <ReactLoading type={'bars'} width={250} height={100} color={'#21CE99'}/>
              </div>
            </Col>
          </Row>
          <br/>
          <br/>
          <br/>
        </div>
      );
    }
  }
}
export default StudentMC