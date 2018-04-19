import React, { Component } from 'react';
import { firestore } from "../../base";
import { Table, Row, Col, Button } from 'reactstrap';

class TeacherScore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topScores: [],
    };
  };

  componentWillMount() {
    this.createLeaderboard();
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

    totalScores.sort(this.compareValues("score"));
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
            {this.props.game.questIndex === this.props.game.questions.length - 1
              ?
              <Button onClick={this.props.theClick} style={{fontSize: '1.25rem'}} color="info">
                End Game
              </Button>
              :
              <Button onClick={this.props.theClick} style={{fontSize: '1.25rem'}} color="info">
                Next Question
              </Button>
            }
          </Col>
        </Row>
      </div>
    )
  }
}

export default TeacherScore