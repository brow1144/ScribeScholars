import React, { Component } from 'react';
import { firestore } from "../../base";
import {Container, Row, Col, Input, Label, Form, FormGroup, Button} from 'reactstrap';

import Score from './TeacherScore';
import MC from './TeacherMC';
import Bonus from './TeacherBonus';

import ReactLoading from 'react-loading';

class TeacherGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: {},
      //mcqSubmitted: false,
      //bonusSubmitted: false,
      //correct: false,
      //uid: this.props.uid,
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
      console.log(doc.data());
      self.setState({
        game: doc.data(),
        key: !self.state.key,
      });
    })
  };

  enterGame = () => {
    let gameRef = firestore.collection("classes").doc(this.props.class).collection("games").doc(this.props.lessonNumber);

    gameRef.update({
      lobbyStage: false,
      bonusStage: true,
    });
  };

  bonusToMC = () => {
    let gameRef = firestore.collection("classes").doc(this.props.class).collection("games").doc(this.props.lessonNumber);

    gameRef.update({
      bonusStage: false,
      mcStage: true,
    });
  };

  advanceQuestion = () => {
    let gameRef = firestore.collection("classes").doc(this.props.class).collection("games").doc(this.props.lessonNumber);

    gameRef.get().then(function (doc) {
      let data = doc.data();
      let index = data.questIndex;
      if (index < data.questions.length - 1) {
        gameRef.update({
          questIndex: data.questIndex + 1,
        });
      } else {
        gameRef.update({
          mcStage: false,
          scoreStage: true,
        });
      }
    });
  };

  resetGame = () => {
    let gameRef = firestore.collection("classes").doc(this.props.class).collection("games").doc(this.props.lessonNumber);

    gameRef.update({
      bonusStage: false,
      scoreStage: false,
      mcStage: false,
      lobbyStage: true,
      questIndex: 0,
    });
  };

  render() {
    if (this.state.game.lobbyStage) {
      return (
        <div>
          <Container>
            <Row>
              <Button onClick={this.enterGame}>
                Advance to first Question
              </Button>
            </Row>
          </Container>
        </div>
      )
    } else if (this.state.game.bonusStage) {
      return (
        <Bonus key={this.state.key} game={this.state.game} theClick={this.bonusToMC}/>
      );
    }
    else if (this.state.game.scoreStage) {
      return (
        <Score key={this.state.key} game={this.state.game} theClick={this.resetGame} code={this.props.class}/>
      );
    }
    else if (this.state.game.mcStage) {
      return (
        <MC key={this.state.key} game={this.state.game} theClick={this.advanceQuestion}/>
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

export default TeacherGame