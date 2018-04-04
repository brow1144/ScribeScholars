import React, { Component } from 'react';

import { Col, Row, Button} from 'reactstrap';

import '../DiscussionBoard/DiscussionBoard.css'

class DiscussionQuestion extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <Row>
        <Col sm='0' md='2'/>
        <Col sm='12' md='8'>
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
              <Button className='exSpace' color='success'>+ New Thread</Button>
            </Col>
          </Row>
          <Row className='questionBox'>
            <Col xs='4' md='1'>
              <img className="userImage"
                   src='https://yt3.ggpht.com/a-/AJLlDp2XDF1qkCbGAr7HiDi6ywCWp3JfwN3vgN6ksA=s900-mo-c-c0xffffffff-rj-k-no'
                   alt="userIcon"/>
            </Col>
            <Col xs='8' md='4'>
              <h3 className='questionText'>
                How to start investing
              </h3>
              <p className="searchSubTitle">
                by Kyle Brown
              </p>
            </Col>
            <Col xs='0' md='2'/>
            <Col xs='11' md='3'>
              <h4 className='hashtag'>
                # Investing
              </h4>
            </Col>
            <Col xs='10' md='1'>
              <Row>
                <p className='response'>
                  Teacher:
                </p>
                <i className="fas fa-check check"/>
              </Row>
              <Row>
                <p className='response'>
                  Student:
                </p>
                <i className="fas fa-times times"/>
              </Row>
            </Col>
            <Col xs='11' md='1'>
              <h4 className='replyNum'>78</h4>
              <p className='replies'>Views</p>
            </Col>
          </Row>
        </Col>
        <Col sm='0' md='2'/>
      </Row>
    );
  }
}


export default DiscussionQuestion;