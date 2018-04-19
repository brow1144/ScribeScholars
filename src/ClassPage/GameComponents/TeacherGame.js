import React, { Component } from 'react';
import { firestore } from "../../base";
import {Container, Row, Col, Button} from 'reactstrap';

import Score from './TeacherScore';
import MC from './TeacherMC';
import Bonus from './TeacherBonus';

class TeacherGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: {},
      key: false,
      gameRef: firestore.collection("classes").doc(this.props.class).collection("games").doc(this.props.lessonNumber),
    };
  };

  componentWillMount() {
    this.grabGameDetails();
  };

  grabGameDetails = () => {
    let self = this;
    this.state.gameRef.onSnapshot(function (doc) {
      self.setState({
        game: doc.data(),
        key: !self.state.key,
      });
    })
  };

  enterGame = () => {
    this.state.gameRef.update({
      lobbyStage: false,
      bonusStage: true,
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  bonusToMC = () => {
    this.state.gameRef.update({
      bonusStage: false,
      mcStage: true,
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  mcToScore = () => {
    this.state.gameRef.update({
      mcStage: false,
      scoreStage: true,
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  scoreToNextQuestion = () => {
    let self = this;
    this.state.gameRef.update({
      questIndex: self.state.game.questIndex + 1,
      scoreStage: false,
      bonusStage: true,
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  resetGame = () => {
    this.state.gameRef.update({

      active: false,
      bonusStage: false,
      scoreStage: false,
      mcStage: false,
      lobbyStage: false,

      questIndex: 0,
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  render() {
    if (this.state.game.lobbyStage) {
      return (
        <div>
          <Container>
            <Row>
              <Col>
                <Button onClick={this.enterGame}>
                  Advance to first Question
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      )
    } else if (this.state.game.bonusStage) {
      return (
        <Bonus key={this.state.key} game={this.state.game} theClick={this.bonusToMC}/>
      );
    } else if (this.state.game.scoreStage) {
      return (
        <Score key={this.state.key} game={this.state.game} code={this.props.class} theClick={this.scoreToNextQuestion}
               endGame={this.resetGame} final={this.state.game.questIndex === this.state.game.questions.length - 1}/>
      );
    } else if (this.state.game.mcStage) {
      return (
        <MC key={this.state.key} game={this.state.game} theClick={this.mcToScore}/>
      );
    } else {
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
        </div>
      );
    }
  }
}

export default TeacherGame