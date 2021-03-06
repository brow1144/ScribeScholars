import React, {Component} from 'react';

import {Row, Col, Button, Alert} from 'reactstrap';

import { firestore } from "../../base";

import 'react-quill/dist/quill.core.css';
import './AnswerBox.css'
import './TeacherAnswer.css'

import AddTeacherAns from '../AddTeacherAns';

import defaultUser from '../../HomePage/defUser.png';

class TeacherAnswer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      teacherAnsImage: '',
      name: '',

      newAnswer: '',

      visible: false,
      message: '',
      createVis: false,
    }
  }

  componentWillMount() {
    this.updateTeacherImage();
  }

  updateTeacherImage = () => {
    if (this.props.discussion.teacherAnsUID !== undefined && this.props.discussion.teacherAnsUID !== null) {

      let docRef = firestore.collection("users").doc(this.props.discussion.teacherAnsUID);
      let self = this;

      docRef.get().then(function (doc) {
        if (doc.exists) {
          let name = doc.data().firstName + ' ' + doc.data().lastName;
          self.setState({
            teacherAnsImage: doc.data().userImage,
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

  addNewTeacherAns = (ev) => {
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
        'teacherAns': this.state.newAnswer,
        'teacherAnsUID': this.props.uid,
      });

      let userRef = firestore.collection("users").doc(this.props.uid);
      userRef.get().then(function (doc) {
        if (doc.exists) {
          let name = doc.data().firstName + ' ' + doc.data().lastName;
          self.setState({
            teacherAnsImage: doc.data().userImage,
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

  updateTeacherAns = (teacherAns) => {
    this.setState({newAnswer: teacherAns});
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
      updateTeacherAns: this.updateTeacherAns,
    };

    return (
      <div>

        {this.props.discussion.teacherAns !== ''
          ?
          <div>
            <Row>
              <Col sm='1'/>
              <Col sm='1'>
                {this.state.teacherAnsImage
                  ?
                  <img className="userImage"
                       src={this.state.teacherAnsImage}
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
                <p className={'teachAns'}>Teacher Answer</p>
              </Col>
            </Row>
            <Row>
              <Col sm='1'/>
              <Col sm='11'><hr/></Col>
            </Row>
            <Row>
              <Col sm='1'/>
              <Col sm='11'>
                <div dangerouslySetInnerHTML={{ __html: this.props.discussion.teacherAns }} />
                <br/>
              </Col>
            </Row>
          </div>
          :
          this.props.role === 'teacher'
            ?
            <div>
              <Row>
                <Col sm='1'/>
                <Col sm='11'>
                  <hr/>
                </Col>
              </Row>
              <Row>
                <Col xs='12' md='1'/>
                <Col xs='12' md='4'>
                  {this.state.createVis
                    ?
                      <p className='teacherAnswer'>Enter a Teacher Answer</p>
                    : null
                  }
                </Col>
                <Col xs='12' md='4'/>
                <Col xs='12' md='2'>
                  {this.state.createVis
                    ?
                    <Button onClick={this.changeVis} className='exSpace' color='success'>Hide Teacher Answer</Button>
                    :
                    <Button onClick={this.changeVis} className='exSpace' color='success'>Create Teacher Answer</Button>
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
                      <AddTeacherAns discussion={this.props.discussion} {...actions}/>
                    </Col>
                    <Col xs='12' md='9'/>
                    <Col xs='12' md='2'>
                      <Button onClick={this.addNewTeacherAns} className='exSpace' color='success'>Submit Teacher Answer</Button>
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
export default TeacherAnswer;
