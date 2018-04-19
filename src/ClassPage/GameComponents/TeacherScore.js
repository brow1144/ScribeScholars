import React, { Component } from 'react';
import { firestore } from "../../base";
import {Container, Row, Col, Input, Label, Form, FormGroup, Button} from 'reactstrap';

import { NavLink as RouterLink } from 'react-router-dom'

class TeacherScore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topScores: [],
    };
  };

  componentWillMount() {
    //this.grabGameDetails();
      this.createLeaderboard();
  };


  getTopScores = () => {
    this.props.game.questScores.sort();
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
    let self = this;
    let totalScores = [];
    let tmpTopScores;
    let topScores = [];

    for (let i in this.props.game.userScores) {
      if (this.props.game.userScores.hasOwnProperty(i)) {
        let userScore = this.props.game.userScores[i];
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
      <RouterLink style={{display: 'inline-block', width: '1rem'}}
                  to={`/ScribeScholars/HomePage/${this.props.code}/games`}>
          <Button onClick={this.props.theClick}>Enter Lobby</Button>
      </RouterLink>
      </tbody>
    )
  }
}

export default TeacherScore