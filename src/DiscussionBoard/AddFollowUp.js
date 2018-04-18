import React, {Component} from 'react';

import { Row, Col, InputGroup, Button, Alert} from 'reactstrap';

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
      image: null,
    }
  }
  componentWillMount() {
    this.getReply();
    console.log('AddFollow Up Is loading!')
  }

  getReply = () => {
    this.setState ({
      replies: this.props.replies,
    })

  };

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
      let self = this;
      let obj = {
        reply: self.state.newAnswer,
        replyID: self.props.uid,
        userImage: self.props.image,
      };
      console.log(obj);

      let size = this.props.replies.length;

      if (size === null) {
        size = 0;
      }

      // Set firebase TODO make it randomly make a document, its hard coded

      firestore.collection("classes").doc(this.props.classCode)
        .collection("discussionBoard").doc(this.props.discussion.id)
        .collection("replies")
        .doc(String(size)).set(obj);

      self.setState({
        newAnswer: "",
      });
      this.props.setVis();
      this.props.getReplies();
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















