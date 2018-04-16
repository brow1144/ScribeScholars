import React, { Component } from 'react';

import { Row, Col, InputGroup, Form, InputGroupAddon, Input, Button, Alert} from 'reactstrap';

import { firestore } from "../base";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';

import '../DiscussionBoard/AddDiscussion.css';

class AddDiscussion extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      errorMessage: '',
      userImage: '',
      name: '',
      title: 'Please enter a short discussion title',
      hashtag: 'Topic',
      text: '',
    };
  }

  componentWillMount() {
    if (this.props.discussion.uid !== undefined && this.props.discussion.uid !== null) {

      let docRef = firestore.collection("users").doc(this.props.discussion.uid);
      let self = this;

      docRef.get().then(function (doc) {
        if (doc.exists) {
          let name = doc.data().firstName + ' ' + doc.data().lastName;
          self.setState({
            userImage: doc.data().userImage,
            name: name,
          });

        } else {
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      })
    }
  }

  addQuestion = (ev) => {
    ev.preventDefault();
    let title = ev.target.title.value;
    let hashtag = ev.target.hashtag.value;

    if (title === '' && hashtag !== '' && this.state.text !== '') {
      this.setState({errorMessage: 'You forgot to enter a title!'});
      this.setState({ visible: true });
    } else if (title !== '' && hashtag === '' && this.state.text !== '') {
      this.setState({errorMessage: 'You forgot to enter a topic!'});
      this.setState({ visible: true });
    } else if (title !== '' && hashtag !== '' && this.state.text === '') {
      this.setState({errorMessage: 'You forgot to enter a message body!'});
      this.setState({ visible: true });
    } else if (title === '' || hashtag === '' || this.state.text === '') {
      this.setState({errorMessage: 'You forgot to enter multiple form fields!'});
      this.setState({ visible: true });
    } else {
      this.setState({visible: false});

      let code = this.getCode();

      let self = this;

      let classRef = firestore.collection("classes").doc(this.props.classCode).collection('discussionBoard').doc(code);

      classRef.get().then(function (doc) {
        if (!doc.exists) {
          classRef.set({
            title: title,
            hashtag: hashtag,
            body: self.state.text,
            studentAns: '',
            teacherAns: '',
            views: 0,
            uid: self.props.uid,
            id: code,
          }).then(function () {
            self.props.successfulNewQuestion();
          }).catch(function (error) {
            console.log(error);
          });
        }
      }).catch(function (error) {
        console.log("Error getting document: ", error);
      });
    }
  };

  //Generate New Homework code
  getCode = () => {
    let code = "";
    for (let i = 0; i < 9; i++) {
      code += Math.floor(Math.random() * 10);
    }
    return code;
  };

  onDismiss = () => {
    this.setState({ visible: false });
  };

  titleChange = (ev) => {
    this.setState({title: ev.target.value});
  };

  hashtagChange = (ev) => {
    this.setState({hashtag: ev.target.value});
  };

  handleChange = (content) => {
    this.setState({text: content});
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
      <Row>
        <Col xs='0' md='2'/>
        <Col className='newQuestion' xs='12' md='8'>
          <br/>
          <h2 className='createDiscussion'>Create Discussion</h2>
          <hr/>

          <Row className='questionBox'>
            <Col xs='4' md='1'>
              <img className="userImage"
                   src={this.state.userImage}
                   alt="userIcon"/>
            </Col>
            <Col xs='8' md='5'>
              <h3 className='questionText'>
                {this.state.title}
              </h3>
              <p className="searchSubTitle">
                by {this.state.name}
              </p>
            </Col>
            <Col xs='0' md='1'/>
            <Col xs='11' md='3'>
              <h4 className='hashtag'>
                # {this.state.hashtag}
              </h4>
            </Col>
            <Col xs='10' md='1'>
              <Row>
                <p className='response'>
                  Teacher:
                </p>
                {this.props.discussion.teacherAns !== ''
                ?
                  <i className="fas fa-check check"/>
                  :
                  <i className="fas fa-times times"/>
                }
              </Row>
              <Row>
                <p className='response'>
                  Student:
                </p>
                {this.props.discussion.studentAns !== ''
                ?
                  <i className="fas fa-check check"/>
                  :
                  <i className="fas fa-times times"/>
                }
              </Row>
            </Col>
            <Col xs='11' md='1'>
              <h4 className='replyNum'>0</h4>
              <p className='replies'>Views</p>
            </Col>
          </Row>

          <hr/>

          <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
            {this.state.errorMessage}
          </Alert>

          <Form onSubmit={this.addQuestion}>
            <Row>
              <Col xs='8'>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Title</InputGroupAddon>
                  <Input onChange={this.titleChange} name='title' placeholder="Please enter a short discussion title" />
                </InputGroup>
              </Col>
              <Col xs='4'>
              <InputGroup>
                <InputGroupAddon addonType="prepend">#</InputGroupAddon>
                <Input onChange={this.hashtagChange} name='hashtag' placeholder="Please enter a one word topic" />
              </InputGroup>
              </Col>
            </Row>
            <br/>
            <Row>
              <Col xs='12'>
                <InputGroup>
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

            <Button className='buttonSpace' outline color='success'>Submit Discussion</Button>

          </Form>
          <br/>
        </Col>
        <Col xs='12' md='2'/>
      </Row>
    );
  }
}


export default AddDiscussion;