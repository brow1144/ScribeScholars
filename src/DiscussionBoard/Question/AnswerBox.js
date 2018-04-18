import React, {Component} from 'react';

import {Row, Col, Button} from 'reactstrap';

import 'react-quill/dist/quill.core.css';
import './AnswerBox.css'

import TeacherAnswer from './TeacherAnswer';
import StudentAnswer from './StudentAnswer';
import FollowUp from './FollowUp';
import AddFollowUp from '../AddFollowUp';
import {firestore} from "../../base";

class AnswerBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      buttonVis: false,
      discussion: {},
      replies: [{
        userID: null,
        reply: null,
        userImage: null,
      }],

      image: null,
      buttonVis: false,
    }
  }

  componentWillMount() {
    this.updateImage();
    this.getReplies();
  }

  updateImage = () => {

    let docRef = firestore.collection("users").doc(this.props.uid);
    let self = this;

    docRef.get().then(function (doc) {
      if (doc.exists) {
        self.setState({
          image: doc.data().userImage,
        }, () => {
          console.log("The image " + self.state.image)
        });

      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    })

  };

  getReplies = () => {
    let object = [{}];

    let self = this;

    let docRef = firestore.collection("classes").doc(this.props.classCode).collection("discussionBoard").doc(this.props.discussion.id).collection("replies");

    docRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        object.unshift({
          userID: doc.data().userID,
          reply: doc.data().reply,
          userImage: doc.data().userImage,
        });
        self.setState({
          replies: object,
          discussion: self.props.discussion,
        })
      })
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

    object.pop();

    self.setState({
      replies: object
    });
  };

  setVis = () => {
    this.setState({
        buttonVis: !this.state.buttonVis,
    })
  };

  render() {
    const actions = {
      // setVis: this.setVis,
      getReplies: this.getReplies,
    };

    return (
      <div>

        <br/>

        <Row>
          <Col sm='1'/>
          <Col className='answerBoxBackground' sm='11'>
            <div dangerouslySetInnerHTML={{ __html: this.props.discussion.body }} />
            <br/>
          </Col>
        </Row>
              <TeacherAnswer role={this.props.role} uid={this.props.uid} classCode={this.props.classCode}
                             discussion={this.props.discussion}/>
              <StudentAnswer role={this.props.role} uid={this.props.uid} classCode={this.props.classCode}
                             discussion={this.props.discussion}/>
        <br/>
        <Row>
          <Col xs='1'/>
          <Col>
            <h2>Follow up</h2>
          </Col>
        </Row>
        <Row>
          <Col xs='12' md='9'/>
          <Col xs='12' md='2'>
            <Button onClick={this.setVis} className='exSpace' color='success'>Create Follow Up</Button>
          </Col>
        </Row>
        {this.state.buttonVis === true
          ?
           <AddFollowUp image={this.state.image} role={this.props.role} uid={this.props.uid}
                        classCode={this.props.classCode} discussion={this.props.discussion}
                        buttonVis={this.state.buttonVis} replies={this.state.replies} {...actions}/>
          : null
        }
        {this.state.replies.map((key, index) => {
          return (
            <FollowUp image={this.state.image} role={this.props.role} uid={this.props.uid}
                      classCode={this.props.classCode} curReply={this.state.replies[index]} index={index}
                      buttonVis={this.state.buttonVis} theKey={key}/>
          )
        })}
      </div>
    );
  }
}


export default AnswerBox;