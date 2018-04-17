import React, {Component} from 'react';

import {Row, Col, Button, Alert} from 'reactstrap';

import { firestore } from "../../base";

import 'react-quill/dist/quill.core.css';
import './FollowUp.css'

import AddTeacherAns from '../AddTeacherAns';

import defaultUser from '../../HomePage/defUser.png';

class FollowUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ansImage: '',
      name: '',

      newAnswer: '',

      visible: false,
      message: '',

      replies: [{}],
    }
  }

  componentWillMount() {
    this.getName();
  }

  /*
   * Gets the name for the current user
   */
  getName = () => {

    let docRef = firestore.collection("users").doc(this.props.uid);
    let self = this;

    docRef.get().then(function (doc) {
      if (doc.exists) {
        let name = doc.data().firstName + ' ' + doc.data().lastName;
        self.setState({
          name: name,
        });

      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    })
  };

  addNewReply = (ev) => {
    ev.preventDefault();

    if (this.state.newAnswer === '' || this.state.newAnswer === "<p><br></p>") {
      this.setState({
        visible: true,
        message: 'Please fill out an answer!'
      });
    } else {
      let object = [{}];
      let self = this;
      let docRef = firestore.collection("classes").doc(this.props.classCode).collection("discussionBoard").collection("replies").doc(this.props.index);

      // TODO fix this so it updates the collection
      object.unshift({
        'reply': this.state.newAnswer,
        'replyID': this.props.uid,
      });

      // TODO figure out pictures, make each reply contain one
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

  updateReply = (ans) => {
    this.setState({newAnswer: ans});
  };

  onDismiss = () => {
    this.setState({visible: false})
  };

  render() {

    const actions = {
      updateReply: this.updateReply,
    };

    return (
      <div>

        {this.props.curReply.reply !== ''
          ?
          <div>
            <Row>
              <Col sm='1'/>
              <Col sm='1'>
                {this.props.userImage
                  ?
                  <img className="userImage"
                       src={this.props.userImage}
                       alt="userIcon"/>
                  :
                  <img className="userImage"
                       src={defaultUser}
                       alt="userIcon"/>
                }
              </Col>
              {this.props.role === "teacher"
                ?
                <Col sm='10'>
                  <br/>
                  <p className='teacherAnswer'>{this.state.name}'s reply</p>
                  <p className={'followUpAns'}>Teacher reply</p>
                </Col>
                :
                <Col sm='10'>
                  <br/>
                  <p className='teacherAnswer'>{this.state.name}'s reply</p>
                  <p className={'followUpAns'}>Student reply</p>
                </Col>
              }
            </Row>

            <Row>
              <Col sm='1'/>
              <Col sm='11'>
                <hr/>
              </Col>
            </Row>

            <Row>
              <Col sm='1'/>
              <Col sm='11'>
                <div dangerouslySetInnerHTML={{__html: this.props.curReply.reply}}/>
                <br/>
              </Col>
            </Row>
          </div>
          : null
        }

        {this.state.buttonVis
          ?
          <div>
            <Row>
              <Col sm='1'/>
              <Col sm='11'>
                <hr/>
              </Col>
            </Row>

            <Row>
              <Col xs='12' md='9'/>
              <Col xs='12' md='2'>
                <Button onClick={this.addNewReply} className='exSpace' color='success'>Submit Follow Up</Button>
              </Col>
            </Row>

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

                {/*This is where the AddFollowUp goes*/}
              </Col>
            </Row>

          </div>
          : null
        }

      </div>
    );
  }
}


export default FollowUp;















