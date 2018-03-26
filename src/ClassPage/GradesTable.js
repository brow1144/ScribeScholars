import React, { Component } from 'react';
import {Table, Container, Row, Col, Label, Button } from 'reactstrap';
import { firestore } from "../base";
import Modal from 'react-modal';
import './Table.css'

class GradesTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: this.props.uid,
      code: this.props.code,
      score: 0,
      max_score: 0,
      gradeData: [],
      regrade_open: false,
      doneLoading: false
    };

    let self = this;
    let docRef = firestore.collection("users").doc(this.props.uid).collection("assignments").doc(this.props.code);
    docRef.get().then(function (doc) {

      self.setState({ gradeData: doc.data().grades });

    }).then( function () {

      for(let i = 0; i < self.state.gradeData.length; i++){
        self.addScore(self.state.gradeData[i].score, self.state.gradeData[i].maxscore);
      }

      self.setState({ doneLoading: true });

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }

  openRegrade = () => {
    let self = this;
    self.setState({ regrade_open: true });
  }

  closeRegrade = () => {
    let self = this;
    self.setState({ regrade_open: false });
  }

  addScore = (score, maxscore) => {
    let self = this;
    let sc = +self.state.score;
    let m_sc = +self.state.max_score;

    sc += +score;
    m_sc += +maxscore;

    self.setState({
      score: sc,
      max_score: m_sc,
    });
  };

  render() {

    if(!this.state.doneLoading){
      return (
        <div>
          <Label>
            LOADING
          </Label>
        </div>
        )
    }

    else {
      return (
        <div>
          <Container fluid>
            <Row>
              <Col className={"makeSpace"}>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className={"homeworkTitle"}>Grades</p>
              </Col>
            </Row>
            <Row>
              <Col className={"makeSpace"}>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <Table>
                  <thead>
                  <tr>
                    <th>Assignment</th>
                    <th>Score</th>
                    <th>Max Score</th>
                    <th>Regrades</th>
                  </tr>
                  </thead>
                  <tbody>
                  {Object.keys(this.state.gradeData).map((key, index) => {
                    return <tr key={key}>
                      <td>{this.state.gradeData[index].name}</td>
                      <td>{this.state.gradeData[index].score}</td>
                      <td>{this.state.gradeData[index].maxscore}</td>
                      <td>
                        <Button onClick={this.openRegrade}
                                style={{backgroundColor: 'white', color: '#21CE99'}}>
                          Request Regrade
                        </Button>
                      </td>
                    </tr>
                  })
                  }
                  </tbody>
                </Table>
              </Col>
            </Row>

            <Row>
              <Col>
                <Modal
                  style={"modal-content"}
                  onRequestClose={this.closeRegrade}
                  isOpen={this.state.regrade_open}>
                  <h2 className={"homeworkTitle"}>
                    Request Regrade
                  </h2>
                </Modal>
              </Col>
            </Row>

            <Row>
              <Col className={"moreSpace"}>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <Table>
                  <thead>
                  <tr>
                    <th>Total: {this.state.score}/{this.state.max_score}</th>
                  </tr>
                  </thead>
                </Table>
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
};

export default GradesTable