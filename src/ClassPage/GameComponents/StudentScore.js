import React, { Component } from 'react';

import {Container, Row, Col, Card, CardBody, CardHeader, CardTitle} from 'reactstrap';


class StudentScore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: this.props.game,
      num: 0,
    }
  };

  componentWillMount() {
    this.createLeaderboard();
  };

  createLeaderboard = () => {
    let totalScores = [];

    for (let i in this.props.game.userScores) {
      if (this.props.game.userScores.hasOwnProperty(i)) {
        let userScore = this.props.game.userScores[i];
        totalScores.push({uid: userScore.uid, score: userScore.score});
      }
    }

    totalScores.sort(this.compareValues("score")).reverse();
    let num;
    for (let i in this.props.game.userScores) {
      if (this.props.game.userScores.hasOwnProperty(i)) {
        if (this.props.game.userScores[i].uid === this.props.uid) {
          num = i;
          break;
        }
      }
    }
    this.setState({num: num})

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
      return(
        <Container fluid>
          <br/>
          <br/>
          <Row>
            <Col xs={{size: 8, offset: 1}} lg={{size: 7, offset: 1}} xl={{size: 6, offset: 2}} style={{paddingRight: '4rem'}}>
              <Card style={{boxShadow: '8px 8px 3px rgba(0, 0, 0, 0.2)'}}>
                <CardHeader tag="h2" className={"cardTitleScore1"}>Your Results:</CardHeader>
                <CardBody>
                  <br/>
                  {this.props.correct
                    ?
                    <CardTitle tag={"p"} className={"cardTextStyle"}>
                      You answered the previous question correctly. Good job!
                    </CardTitle>
                    :
                    <CardTitle tag={"p"} className={"cardTextStyle"}>
                      You answered the previous question incorrectly. You'll get it next time!
                    </CardTitle>
                  }
                  <br/>
                  <hr/>
                  <br/>
                  <CardTitle tag={"p"} className={"cardTextStyle"}>
                    Your current score is {this.state.game.userScores[this.props.userIndex].score} points!
                  </CardTitle>
                  <br/>
{/*                  <hr/>
                  <br/>
                  <CardTitle tag={"p"} className={"cardTextStyle"}>
                    You're doing better than {this.state.num - 1} classmates!
                  </CardTitle>*/}
                  <br/>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <br/>
          <br/>
          <br/>
        </Container>
      );

  }
}
export default StudentScore