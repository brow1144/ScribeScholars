import React, { Component } from 'react';
import { firestore } from "../../base";
import {Container, Row, Col, Input, Label, Form, FormGroup, Button} from 'reactstrap';

import Score from './TeacherScore';
import MC from './TeacherMC';
import Bonus from './TeacherBonus';

class TeacherScore extends Component {
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

  render() {
    if (this.state.game.lobbyStage) {
      // TODO probably ignore
    } else if (this.state.game.bonusStage) {
      return (
        <Bonus key={this.state.key} game={this.state.game}/>
      );
    }
    else if (this.state.game.scoreStage) {
      return (
        <Score key={this.state.key} game={this.state.game}/>
      );
    }
    else if (this.state.game.mcStage) {
      return (
        <MC key={this.state.key} game={this.state.game}/>
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