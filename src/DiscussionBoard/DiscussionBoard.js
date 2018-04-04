import React, { Component } from 'react';

import { Col, Row, InputGroup, InputGroupAddon, Input, Button} from 'reactstrap';

import DiscussionQuestion from '../DiscussionBoard/DiscussionQuestion';

import '../DiscussionBoard/DiscussionBoard.css'

class DiscussionBoard extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
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
                  <Input placeholder="search" />
                </InputGroup>
              </Col>
              <Col md="1"/>
            </Row>
          </Col>
          <Col xs="0" md="2"/>
        </Row>

        <br/>
        <br/>
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
                <Button className='exSpace' color='success'>+ New Thread</Button>
              </Col>
            </Row>
          </Col>
          <Col xs='0' md='2'/>
        </Row>

        <DiscussionQuestion />
        <DiscussionQuestion />
        <DiscussionQuestion />
        <DiscussionQuestion />
        <DiscussionQuestion />
        <DiscussionQuestion />
        <DiscussionQuestion />
        <DiscussionQuestion />


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