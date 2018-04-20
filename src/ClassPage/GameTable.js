import React, { Component } from 'react';

import {Table, Container, Row, Col, Button } from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom'

import { firestore } from '../base.js'

import './Table.css'

class GameTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      games: [{}],
      phrase: new Array(20),
      role: null,
      avail: null,
    }
  }

  componentWillMount() {
    this.getRole();
  }

  getRole = () => {
    let docRef = firestore.collection("users").doc(this.props.uid);
    let self = this;

    docRef.get().then(function(doc) {
      if (doc.exists) {
        self.setState({
          role: doc.data().role,
          games: self.props.games,
        });
      } else {
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });

  };

  /*
     * Updates firebase with the new availability
     */
  changeAvail = (assignment) => {
    let self = this;
    let user = firestore.collection("classes").doc(this.props.code).collection("inClass").doc(assignment.lessonCode);

    user.get().then((doc) => {
      if (doc.exists) {
        if (assignment.available) {
          assignment.available = false;
          user.update({
            available: false,
          }).then(function () {
            self.setState({
              phrase: "Enable",
            });
          });
        } else {
          assignment.available = true;
          user.update({
            available: true,
          }).then(function () {
            self.setState({
              phrase: "Disable",
            });
          });
        }
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  makeActive = (game) => {
    let gameRef = firestore.collection("classes").doc(this.props.code).collection("games").doc(game.lessonCode);

    gameRef.update({
      active: true,
      lobbyStage: true,
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col className={"makeSpace"}>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className={"homeworkTitle"}>In-class Games</p>
            </Col>
          </Row>
          <Row>
            <Col className={"makeSpace"}>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <p className={"pText"}>Available Games</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Table>
                <thead>
                <tr>
                  <th>Game</th>
                  <th>Links</th>
                </tr>
                </thead>
                {Object.keys(this.state.games).map((key, index) => {
                  return <tbody key={key}>
                  {this.state.games[index].active === false && this.state.role === "student"
                    ?
                    <tr/>
                    :
                    <tr>
                      <td>{this.state.games[index].name}</td>
                      {this.state.role === "teacher" ?
                        <td>
                          <RouterLink style={{display: 'inline-block', width: '1rem'}}
                                      to={`/ScribeScholars/HomePage/${this.props.code}/games/${this.state.games[index].lessonCode}/teacher`}>
                            <Button onClick={() => {this.makeActive(this.state.games[index])}}>Enter Lobby</Button>
                          </RouterLink>
                          <span style={{display: 'inline-block', width: '1rem'}}> </span>
                        </td>
                        :
                        <td>
                          <RouterLink style={{display: 'inline-block', width: '1rem'}}
                                      to={`/ScribeScholars/HomePage/${this.props.code}/games/${this.state.games[index].lessonCode}/student`}>
                            Enter Lobby
                          </RouterLink>
                          <span style={{display: 'inline-block', width: '1rem'}}> </span>
                        </td>
                      }
                    </tr>
                  }
                  </tbody>
                })}
              </Table>
            </Col>
          </Row>
          <Row>
            <Col className={"moreSpace"}>
              {this.state.role === "teacher"
                ?
                <RouterLink to={`/ScribeScholars/HomePage/${this.props.code}/games/create-game`}>
                  Create New Game
                </RouterLink>
                :
                <div/>
              }
            </Col>
          </Row>
          <Row>
            <Col className={"moreSpace"}>
            </Col>
          </Row>
        </Container>

      </div>
    )
  }
}


export default GameTable
