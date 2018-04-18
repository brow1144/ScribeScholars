import React, { Component } from 'react';
import { firestore } from "../../base";
import {Container, Row, Col, Input, Label, Form, FormGroup, Button} from 'reactstrap';

class TeacherScore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: {},
      mcqSubmitted: false,
      bonusSubmitted: false,

      topScores: [],
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
      self.setState({game: doc.data()});
      self.createLeaderboard();
    })
  };

  getTopScores = () => {
    this.state.game.questScores.sort();



  };

  getName = (uid) => {
    let name;
    let studentRef = firestore.collection("users").doc(uid);

    studentRef.get().then((doc) => {
      if (doc.exists && doc.data() != null) {
        name = doc.data().firstName + " " + doc.data().lastName;
        return name;
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  createLeaderboard = () => {
    let totalScores = [];
    let tmpTopScores;
    let topScores = [];

    for (let i in this.state.game.userScores) {
      if (this.state.game.userScores.hasOwnProperty(i)) {
        let userScore = this.state.game.userScores[i];
        totalScores.push({uid: userScore.uid, score: userScore.score});
      }
    }

    totalScores.sort(this.compareValues("score"));
    tmpTopScores = totalScores.slice(0, 5);

    for (let i in tmpTopScores) {
      let userScore = tmpTopScores[i];
      topScores.push({name: this.getName(userScore.uid), score: userScore.score});
    }

    self.setState({
      topScores: topScores,
    });
  };

  // custom sorting function
  compareValues(key) {
    return function (a, b) {
      // check that input is valid
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key))
        return 0;

      let val1 = a[key];
      let val2 = b[key];

      let comparison = 0;

      if (val1 > val2)
        comparison = 1;
      else if (val1 < val2)
        comparison = -1;

      return comparison;
    };
  }

  render() {
    return (
      <tbody>
      {Object.keys(this.state.topScores).map((key, index) => {
        return (
          <tr key={key}>
            <td>{this.state.topScores[index].name}</td>
            <td>{this.state.topScores[index].score}</td>
          </tr>
        )
      })
      }
      </tbody>
    )
  }
}

export default TeacherScore