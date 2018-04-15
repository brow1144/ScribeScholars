import React, {Component} from 'react';
import {Table, Button, Container, Row, Col, Input} from 'reactstrap';
import {NavLink as RouterLink} from 'react-router-dom';
import Modal from 'react-modal';
import './Table.css'
import { firestore } from '../base.js'


class HomeworkTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
          homeworks: [{}],
            role: null,
            phrase: new Array(100),
            avail: null,
          modalAssignment: null,
          modalOpen: false,
          doneLoading: false,
        }
    }

    componentWillMount() {
        this.getRole();
    }

    /*
     * Gets the role the the homeworks as a state
     */
    getRole = () => {
        let docRef = firestore.collection("users").doc(this.props.uid);
        let self = this;

        docRef.get().then(function(doc) {
            if (doc.exists) {
                self.setState({
                    role: doc.data().role,
                    homeworks: self.props.homeworks,
                }, () => {

                  for (let i = 0; i < self.state.homeworks.length; i++) {
                    self.state.phrase[i] = "";
                  }
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
  changeAvail = (homework) => {
    let self = this;
    let user = firestore.collection("classes").doc(this.props.code).collection("homework").doc(homework.lessonCode);

    user.get().then((doc) => {
      if (doc.exists) {
        if (homework.available) {
          homework.available = false;
          user.update({
            available: false,
          }).then(function () {
            self.setState({
              phrase: "Enable",
            });
          });
        } else {
          homework.available = true;
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

  getAssignment = (homework) => {
    let self = this;
    let homeworkRef = firestore.collection("classes").doc(this.props.code).collection("homework").doc(homework.lessonCode);

    homeworkRef.get().then((doc) => {
      if (doc.exists) {
        self.setState({
          modalAssignment: doc.data(),
        });
      }
    }).then(function() {
      self.setState({
        doneLoading: true,
      });
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  openModal = (homework) => {
      this.getAssignment(homework);
      this.setState({
          modalOpen: true
      });
  };

  closeModal = () => {
    this.setState({
      modalAssignment: null,
      modalOpen: false,
      doneLoading: false,
    });
  };

  getModalContent(){
    if (this.state.modalOpen && this.state.modalAssignment != null && this.state.doneLoading){
      return (
        <Modal
          className={"modalStyle"}
          onRequestClose={this.closeModal}
          isOpen={this.state.modalOpen}
          ariaHideApp={false}>

          <h2 className={"homeworkTitle"}>
            Viewing Assignment Details
          </h2>
          <h2>Assignment: {this.state.modalAssignment.name}</h2>
          <h2>Max Score: {this.state.modalAssignment.maxScore}</h2>
          <h2>Deadline: {this.state.modalAssignment.due}</h2>

          <div className={"makeSpace"}/>

        </Modal>
      );
    }
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
                            <p className={"homeworkTitle"}>Homework</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"makeSpace"}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <p className={"pText"}>Available Homeworks</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Table>
                                <thead>
                                <tr>
                                    <th>Assignment</th>
                                    <th>Points Possible</th>
                                    <th>Links</th>
                                  {this.state.role === "teacher"
                                    ?
                                    <th>Enable/Disable</th>
                                    :
                                    <th/>
                                  }
                                  {this.state.role === "teacher"
                                    ?
                                    <th>View Assignment Details</th>
                                    :
                                    <th/>
                                  }
                                </tr>
                                </thead>
                              {Object.keys(this.state.homeworks).map((key, index) => {
                                return <tbody key={key}>
                                  {this.state.homeworks[index].available === false && this.state.role === "student"
                                    ?
                                    <tr/>
                                    :
                                    <tr>
                                      <td>{this.state.homeworks[index].name}</td>
                                      <td>{this.state.homeworks[index].maxScore}</td>
                                      <td>
                                        {this.state.homeworks[index].available
                                          ?
                                          <RouterLink
                                            to={`/ScribeScholars/HomePage/${this.props.code}/homework/${this.state.homeworks[index].lessonCode}`}>
                                            Available
                                          </RouterLink>
                                          :
                                          <RouterLink
                                            to={`/ScribeScholars/HomePage/${this.props.code}/homework/${this.state.homeworks[index].lessonCode}`}>
                                            Unavailable
                                          </RouterLink>
                                        }
                                      </td>
                                      {this.state.role === "teacher"
                                        ?
                                        <td>
                                          {this.state.homeworks[index].available
                                            ?
                                            <Button
                                              onClick={() => this.changeAvail(this.state.homeworks[index])}>Disable</Button>
                                            :
                                            <Button
                                              onClick={() => this.changeAvail(this.state.homeworks[index])}>Enable</Button>
                                          }
                                        </td>
                                        :
                                        <td/>
                                      }
                                      {this.state.role === "teacher"
                                        ?
                                        <td>
                                          <Button onClick={() => this.openModal(this.state.homeworks[index])}>View</Button>
                                        </td>
                                        :
                                        <td/>
                                      }
                                    </tr>
                                  }
                                </tbody>
                              })
                              }
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"moreSpace"}>
                            {this.state.role === "teacher"
                                ?
                                <RouterLink to={`/ScribeScholars/HomePage/${this.props.code}/homework/create-activity`}>
                                    Create New Class Homework
                                </RouterLink>
                                :
                                <div/>
                            }
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                          {this.getModalContent()}
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

export default HomeworkTable