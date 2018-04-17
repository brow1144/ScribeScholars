import React, { Component } from 'react';

import {Container, Row, Col, Input, Label, Form, FormGroup, Button} from 'reactstrap';

import { firestore } from "../../base";

class StudentMC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: {},
      mcqSubmitted: false,
      bonusSubmitted: false,
    };

  };

  componentWillMount() {
    this.grabGameDetails();
  };

  grabGameDetails = () => {
    let self = this;
    let gameRef = firestore.collection("classes").doc(this.props.class).collection("games").doc(this.props.lessonNumber)

    gameRef.onSnapshot(function (doc) {
      console.log(doc.data());
      self.setState({game: doc.data()})
    })
  };

  render() {
    if (this.state.game.lobby) {
    return (
      <div>Pre-game lobby</div>
    );
    } else if (this.state.game.bonusStage) {
      return (
        <div>We are on the bonus portion</div>
      );
    }
    else if (this.state.game.scoreStage) {
      return (
        <div>We are now on the score page</div>
      );
    }
    else {
      return (
        <div>We are at the Multiple Choice Portion</div>
      );
    }
  }
}
export default StudentMC