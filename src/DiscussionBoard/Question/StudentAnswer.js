import React, {Component} from 'react';

import {Row, Col, Button, Alert} from 'reactstrap';

import { firestore } from "../../base";

import 'react-quill/dist/quill.core.css';
import './AnswerBox.css'
import './StudentAnswer.css'

import AddStudentAns from '../AddStudentAns';

import defaultUser from '../../HomePage/defUser.png';

class StudentAnswer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            studentAnsImage: '',
            name: '',

            newAnswer: '',

            visible: false,
            message: '',

            createVis: false,
        }
    }

    componentWillMount() {
        this.updateStudentImage();
    }

    updateStudentImage = () => {
        if (this.props.discussion.studentAnsUID !== undefined && this.props.discussion.studentAnsUID !== null) {

            let docRef = firestore.collection("users").doc(this.props.discussion.studentAnsUID);
            let self = this;

            docRef.get().then(function (doc) {
                if (doc.exists) {
                    let name = doc.data().firstName + ' ' + doc.data().lastName;
                    self.setState({
                        studentAnsImage: doc.data().userImage,
                        name: name,
                    });

                } else {
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            })
        }
    };

    addNewStudentAns = (ev) => {
        ev.preventDefault();

        if (this.state.newAnswer === '' || this.state.newAnswer === "<p><br></p>") {
            this.setState({
                visible: true,
                message: 'Please fill out an answer!'
            });
        } else {
            let self = this;
            let docRef = firestore.collection("classes").doc(this.props.classCode).collection("discussionBoard").doc(this.props.discussion.id);

            docRef.update({
                'studentAns': this.state.newAnswer,
                'studentAnsUID': this.props.uid,
            });

            let userRef = firestore.collection("users").doc(this.props.uid);
            userRef.get().then(function (doc) {
                if (doc.exists) {
                    let name = doc.data().firstName + ' ' + doc.data().lastName;
                    self.setState({
                        studentAnsImage: doc.data().userImage,
                        name: name,
                    });

                } else {
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
        }
    };

    updateStudentAns = (studentAns) => {
        this.setState({newAnswer: studentAns});
    };

    onDismiss = () => {
        this.setState({visible: false})
    };

  changeVis = () => {
    this.setState({
      createVis: !this.state.createVis,
    })
  };

    render() {

        const actions = {
            updateStudentAns: this.updateStudentAns,
        };

        return (
            <div>

                {this.props.discussion.studentAns !== ''
                    ?
                    <div>
                        <Row>
                            <Col sm='1'/>
                            <Col sm='1'>
                                {this.state.studentAnsImage
                                    ?
                                    <img className="userImage"
                                         src={this.state.studentAnsImage}
                                         alt="userIcon"/>
                                    :
                                    <img className="userImage"
                                         src={defaultUser}
                                         alt="userIcon"/>
                                }
                            </Col>
                            <Col sm='10'>
                                <br/>
                                <p className='teacherAnswer'>{this.state.name}'s Answer</p>
                                <p className={'stuAns'}>Student Answer</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm='1'/>
                            <Col sm='11'><hr/></Col>
                        </Row>

                        <Row>
                            <Col sm='1'/>
                            <Col sm='11'>
                                <div dangerouslySetInnerHTML={{ __html: this.props.discussion.studentAns }} />
                                <br/>
                            </Col>
                        </Row>
                    </div>
                    :
                    this.props.role === 'student'
                        ?
                        <div>
                            <Row>
                                <Col sm='1'/>
                                <Col sm='11'>
                                  {this.state.createVis
                                    ?
                                        <hr/>
                                    :
                                        <br/>
                                  }
                                </Col>
                            </Row>

                            <Row>
                              <Col xs='12' md='1'/>
                              <Col xs='12' md='4'>
                                {this.state.createVis
                                  ?
                                  <p className='teacherAnswer'>Enter a Student Answer</p>
                                  : null
                                }
                              </Col>
                              <Col xs='12' md='4'/>
                              <Col xs='12' md='2'>
                                {this.state.createVis
                                  ?
                                  <Button onClick={this.changeVis} className='exSpace' color='success'>Hide Student
                                    Answer</Button>
                                  :
                                  <Button onClick={this.changeVis} className='exSpace' color='success'>Create Student
                                    Answer</Button>
                                }
                              </Col>
                            </Row>

                          {this.state.createVis
                            ?
                            <div>
                              <Row>
                                <Col xs='12' md='1'/>
                                <Col xs='12' md='11'>
                                  <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                                    {this.state.message}
                                  </Alert>
                                </Col>
                              </Row>

                              <Row>
                                <Col xs='12' md='1'/>
                                <Col xs='12' md='11'>
                                  <AddStudentAns discussion={this.props.discussion} {...actions}/>
                                </Col>
                                <Col xs='12' md='9'/>
                                <Col xs='12' md='2'>
                                  <Button onClick={this.addNewStudentAns} className='exSpace' color='success'>Submit Student Answer</Button>
                                </Col>
                              </Row>
                            </div>
                            : null
                          }

                        </div>
                        : null

                }
            </div>
        );
    }
}


export default StudentAnswer;