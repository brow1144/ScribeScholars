import React, {Component} from 'react';
import {Label, FormGroup, Form, Table, Button, Container, Row, Col, Input} from 'reactstrap';
import {NavLink as RouterLink} from 'react-router-dom';
import Modal from 'react-modal';
import './Table.css'
import { firestore } from '../base.js'
import FIBForm from "../CreateActivity/FIBForm";


class HomeworkTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
          homeworks: [{}],
            role: null,
            phrase: new Array(100),
            avail: null,

          modalAssignment: null,
          modalCode: null,
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

  getAssignmentForModal = (code) => {
    let self = this;
    let homeworkRef = firestore.collection("classes").doc(this.props.code).collection("homework").doc(code);

    homeworkRef.get().then((doc) => {
      if (doc.exists) {
        self.setState({
          modalCode: code,
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

  openModal = (code) => {
      this.getAssignmentForModal(code);
      this.setState({
          modalOpen: true
      });
  };

  closeModal = () => {
    this.setState({
      modalAssignment: null,
      modalCode: null,
      modalOpen: false,
      doneLoading: false,
    });
  };

  updateDeadline = (ev) => {
    ev.preventDefault();

    if(this.state.modalAssignment != null && this.state.modalOpen){
      let self = this;
      let deadline = ev.target.date.value + " " + ev.target.time.value;
      let homeworkRef = firestore.collection("classes").doc(this.props.code).collection("homework").doc(this.state.modalCode);

      homeworkRef.get().then((doc) => {
        if (doc.exists) {
          homeworkRef.update({
            due: deadline,
          }).then(function () {
            self.getAssignmentForModal(self.state.modalCode);
            self.forceUpdate();
          });
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    }
  };

  getModalContent(){
    if (this.state.modalOpen && this.state.modalAssignment != null && this.state.doneLoading){
      let deadline = new Date(this.state.modalAssignment.due);
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
          <h2>Deadline: {deadline.toString()}</h2>

          <div className={"makeSpace"}/>

          <h2> Update Deadline:</h2>
          <Form onSubmit={(ev) => this.updateDeadline(ev)}>
            <FormGroup row>
              <Col sm={2}>
                <Input bsSize="lg" type="date" name="date" id="date"/>
              </Col>
              <Col sm={2}>
                <Input bsSize="lg" type="time" name="time" id="time"/>
              </Col>
            </FormGroup>
            <Button type='submit'>Update</Button>
          </Form>

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
                                          <Button onClick={() => this.openModal(this.state.homeworks[index].lessonCode)}>View</Button>
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