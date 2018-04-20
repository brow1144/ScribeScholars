import React, { Component } from 'react';
import { firestore } from "../../base";
import { Table, Row, Col, Button } from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom';

class TeacherScore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topScores: [],
      leastMissed: null,
      mostMissed: null,
      numCorrect: null,
      numIncorrect: null,
    };
  };

  componentWillMount() {
    if (this.props.final) {
      this.createLeaderboard();
      this.setQuestionStats();
    } else
      this.setNumCorrect();
  };

  setNumCorrect = () => {
    let numCorrect = 0;
    let numIncorrect  = 0;

    for (let i in this.props.game.userScores) {
      if (this.props.game.userScores.hasOwnProperty(i)) {
        if (this.props.game.userScores[i].prevCorrect)
          numCorrect++;
        else
          numIncorrect++;
      }
    }

    this.setState({
      numCorrect: numCorrect,
      numIncorrect: numIncorrect,
    });
  };

  setQuestionStats = () => {
    let max = 0;
    let maxIndex = 0;
    let min = 0;
    let minIndex = 0;

    for (let i in this.props.game.questScores) {
      if (this.props.game.questScores.hasOwnProperty(i)) {
        let score = this.props.game.questScores[i];

        if (score < min) {
          min = score;
          minIndex = i;
        } else if (score > max) {
          max = score;
          maxIndex = i;
        }
      }
    }

    this.setState({
      leastMissed: maxIndex,
      mostMissed: minIndex,
    });
  };

  createLeaderboard = () => {
    let totalScores = [];
    let tmpTopScores;
    let topScores = [];

    for (let i in this.props.game.userScores) {
      if (this.props.game.userScores.hasOwnProperty(i)) {
        let userScore = this.props.game.userScores[i];
        totalScores.push({uid: userScore.uid, score: userScore.score});
      }
    }

    totalScores.sort(this.compareValues("score")).reverse();
    tmpTopScores = totalScores.slice(0, 5);

    for (let i in tmpTopScores) {
      let name;
      let self = this;
      let studentRef = firestore.collection("users").doc(tmpTopScores[i].uid);

      studentRef.get().then((doc) => {
        if (doc.exists && doc.data() != null) {
          name = doc.data().firstName + " " + doc.data().lastName;
          topScores.push({name: name, score: tmpTopScores[i].score});

          self.setState({
            topScores: topScores,
          });
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    }
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
    if (this.props.final) {
      return (
        <div>
          <Row>
            <Col>
              <Table>
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
                </thead>
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
              </Table>
            </Col>
          </Row>
          <Row>
            <Col xs={{size: '8', offset: '2'}}>
              <p>Least-Missed Question: {this.props.game.questions[this.state.leastMissed].prompt}</p>
              <p>({(this.props.game.userScores.length) - this.props.game.questScores[this.state.leastMissed]} missed)</p>
              <p>Most-Missed Question: {this.props.game.questions[this.state.mostMissed].prompt}</p>
              <p>({(this.props.game.userScores.length) - this.props.game.questScores[this.state.mostMissed]} missed)</p>
            </Col>
          </Row>
          <Row>
            <Col xs={{size: '8', offset: '2'}}>
              <RouterLink to={"/ScribeScholars/HomePage/" + this.props.code + "/games"}>
                <Button onClick={this.props.endGame} style={{fontSize: '1.25rem'}} color="info">
                  End Game
                </Button>
              </RouterLink>
            </Col>
          </Row>
        </div>
      )
    } else {
      return (
        <div>
          <Row>
            <Col>
              <p>Number correct: {this.state.numCorrect}</p>
              <p>Number incorrect: {this.state.numIncorrect}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={{size: '8', offset: '2'}}>
              <Button onClick={this.props.theClick} style={{fontSize: '1.25rem'}} color="info">
                Next Question
              </Button>
            </Col>
          </Row>
        </div>
      )
    }
  }
}

export default TeacherScore