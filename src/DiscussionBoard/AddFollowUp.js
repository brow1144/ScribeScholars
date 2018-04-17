import React, {Component} from 'react';

import { Row, Col, InputGroup, Form, InputGroupAddon, Input, Button, Alert} from 'reactstrap';

import { firestore } from "../base";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';

import './AddFollowUp.css';

class AddFollowUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',

      newAnswer: '',

      visible: false,
      message: '',

      replies: [{}],
    }
  }

  /*
   * Puts the reply into firebase
   */
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
        'userImage': this.props.userImage,
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

  /*
   * Handles the button pressing
   */
  handleChange = (content) => {
    this.updateReply(content);
  };

  /*
   * Sets the new reply
   */
  updateReply = (ans) => {
    this.setState({newAnswer: ans});
  };

  onDismiss = () => {
    this.setState({visible: false})
  };

  render() {
    const modules = {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline'],
          ['blockquote', 'code'],

          [{ 'list': 'ordered'}, { 'list': 'bullet' }],

          [{ 'size': ['small', false, 'large', 'huge'] }],

          [{ 'color': [] }, { 'background': [] }],
          [{ 'font': [] }],
          [{ 'align': [] }],

          ['image', 'video'],
        ],
      },
    };

    const formats = [
      'bold', 'italic', 'underline',
      'blockquote', 'code',
      'list', 'bullet',
      'size',
      'color', 'background', 'font', 'align',
      'image', 'video',
    ];

    return (
      <div>
        <Row>
          <Col sm='1'/>
          <Col sm='11'>
            <hr/>
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
          <Col xs='12'>
            <InputGroup className='txt'>
              <div className='wrapper'>
                <div id="toolbar">
                </div>
                <ReactQuill
                  className='text-area'
                  onChange={this.handleChange}
                  placeholder={this.props.text}
                  modules={modules}
                  formats={formats}
                  theme={"snow"} />
              </div>
            </InputGroup>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col xs='12' md='9'/>
          <Col xs='12' md='2'>
            <Button onClick={this.addNewReply} className='exSpace' color='success'>Submit Follow Up</Button>
          </Col>
        </Row>
      </div>
    );
  }
}


export default AddFollowUp;















