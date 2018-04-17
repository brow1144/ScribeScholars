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
      discussions: [],
      origDiscussions: [],
    }
  };

  componentWillMount() {
    this.getDiscussions();
  }

  getDiscussions = () => {
    let self = this;
    let docRef = firestore.collection("classes").doc(this.props.classCode).collection("discussionBoard");

    docRef.onSnapshot(function(querySnapshot) {
      let discussions = [];
      let origDiscussions = [];
      querySnapshot.forEach(function(doc) {
        origDiscussions.unshift(doc.data());
        discussions.unshift(doc.data());
        self.setState({origDiscussions: origDiscussions, discussions: discussions});
      });
      let final = discussions.sort(self.dateCompare);
      self.setState({discussions: final, origDiscussions: final}, () => {self.forceUpdate()});
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

  onDismiss = () => {
    this.setState({visible: false});
  };

  handleSearch = (ev) => {
    let temp = [];

    for (let i in this.state.origDiscussions) {
      let data = this.state.origDiscussions[i];

      if (data.hashtag.toLowerCase().includes(ev.target.value.toLowerCase())) {
        temp.unshift(data);
      }

    }
    this.setState({discussions: temp});
    let final = temp.sort(this.dateCompare);
    this.setState({discussions: final, origDiscussion: final});

  };

  handleRecent = () => {
    let final = this.state.discussions.sort(this.dateCompare);
    this.setState({discussions: final, origDiscussion: final});
  };
  
  handlePopular = () => {
    let final = this.state.discussions.sort(this.popCompare);
    this.setState({discussions: final, origDiscussion: final});
  };

  popCompare = (a, b) => {
    let aData = Object.keys(a.views).length;
    let bData = Object.keys(b.views).length;
    if (aData < bData)
      return 1;
    if (aData > bData)
      return -1;
    return 0;
  };


  dateCompare = (a, b) => {
    if (a.date< b.date)
      return 1;
    if (a.date > b.date)
      return -1;
    return 0;
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
                <h4 onClick={this.handleRecent} className='recent'>Recent</h4>
              </Col>
              <Col className='center' md='2'>
                <h4 onClick={this.handlePopular} className='popular'>Popular</h4>
              </Col>
              <Col md='6'/>
              <Col md='2'>
                <Button onClick={this.addNewDiscussion} className='exSpace' color='success'>+ New Thread</Button>
              </Col>
            </Row>
          </Col>
          <Col xs='0' md='2'/>
        </Row>

        {this.state.discussions.map((key) => {
          console.log(key.title);
          return (
            <DiscussionQuestion uid={this.props.uid} classCode={this.props.classCode}
                                discussion={key} key={key.date}/>
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