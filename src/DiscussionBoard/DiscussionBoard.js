import React, { Component } from 'react';

import { Col, Row, InputGroup, InputGroupAddon, Input, Button, Alert } from 'reactstrap';

import { firestore } from "../base";

import AddDiscussion from '../DiscussionBoard/AddDiscussion';
import DiscussionQuestion from '../DiscussionBoard/DiscussionQuestion';

import '../DiscussionBoard/DiscussionBoard.css'

class DiscussionBoard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      newQVisible: false,
      visible: false,
      discussionsObj: {'': {}},
      discussions: [],
      originalDiscussions: {'': {}},
    }
  };

  componentWillMount() {
    this.getDiscussions();
  }

  getDiscussions = () => {
    let self = this;
    let docRef = firestore.collection("classes").doc(this.props.classCode).collection("discussionBoard");

    let discussionsObj = {'': {}};
    let originalDiscussions = [];

    docRef.onSnapshot(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        discussionsObj[doc.id] = doc.data();
        originalDiscussions[doc.id] = doc.data();
        Object.keys(discussionsObj).forEach((key) => (key === '') && delete discussionsObj[key]);
        self.setState({discussionsObj: discussionsObj, originalDiscussions: originalDiscussions}, () => {
          let discussions = [];
          for (let i in discussionsObj) {
            discussions.push(discussionsObj[i]);
          }
          let temp = discussions.sort(self.compare);
          self.setState({discussions: temp});
        });

      });
    });
  };

  addNewDiscussion = (ev) => {
    ev.preventDefault();
    this.setState({newQVisible: !this.state.newQVisible});
  };

  successfulNewQuestion = () => {
    this.setState({newQVisible: false});
    this.setState({visible: true});
  };

  compare = (a, b) => {
    if (a.hashtag< b.hashtag)
      return -1;
    if (a.hashtag > b.hashtag)
      return 1;
    return 0;
  };

  onDismiss = () => {
    this.setState({visible: false});
  };

  handleSearch = (ev) => {
    let temp = [];

    for (let i in this.state.originalDiscussions) {
      let data = this.state.originalDiscussions[i];
      if (data.hashtag.toLowerCase().includes(ev.target.value.toLowerCase())) {
        temp.push(data);
      }
    }
    this.setState({discussions: temp});
  };

  render() {

    let discussion = {
      views: 0,
      studentAns: '',
      teacherAns: '',
      uid: this.props.uid,
    };

    return (
      <div>

        <br/>
        <br/>

        <Row>
          <Col xs="0" md="2"/>
          <Col xs="12" md="8">
            <Row className="searchBox">
              <Col md="1"/>
              <Col md="3">
                <h3>
                  Thread Results
                </h3>
                <p className="searchSubTitle">
                  Post a question to have your teacher and peers help you out!
                </p>
              </Col>
              <Col md="2"/>

              <Col md="5">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">#
                  </InputGroupAddon>
                  <Input onChange={this.handleSearch} placeholder="search" />
                </InputGroup>
              </Col>
              <Col md="1"/>
            </Row>
          </Col>
          <Col xs="0" md="2"/>
        </Row>

        <br/>
        <br/>

        {this.state.newQVisible
          ?
          <AddDiscussion successfulNewQuestion={this.successfulNewQuestion} uid={this.props.uid} classCode={this.props.classCode} discussion={discussion}/>
          :
          null
        }

        <Row>
          <Col xs='0' md='2'/>
          <Col xs='12' md='8'>
            <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
              Congratulations! Your question has been submitted successfully!
            </Alert>
          </Col>
          <Col xs='0' md='2'/>
        </Row>

        <br/>
        <br/>

        <Row>
          <Col xs='0' md='2'/>
          <Col xs='12' md='8'>
            <Row>
              <Col className='center' md='2'>
                <h4 className='recent'>Recent</h4>
              </Col>
              <Col className='center' md='2'>
                <h4 className='popular'>Popular</h4>
              </Col>
              <Col className='center' md='2'>
                <h4 className='lastReply'>Last Reply</h4>
              </Col>
              <Col md='4'/>
              <Col md='2'>
                <Button onClick={this.addNewDiscussion} className='exSpace' color='success'>+ New Thread</Button>
              </Col>
            </Row>
          </Col>
          <Col xs='0' md='2'/>
        </Row>

        {this.state.discussions.map((key, index) => {
          return (
            <DiscussionQuestion uid={this.props.uid} classCode={this.props.classCode} discussion={key} key={index}/>
          )
        })}

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    );
  }
}


export default DiscussionBoard;