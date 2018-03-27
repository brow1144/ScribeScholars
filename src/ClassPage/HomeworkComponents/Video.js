import React, { Component } from 'react';
import { Col, FormGroup } from 'reactstrap';
import ReactPlayer from 'react-player'

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return(
      <Col sm={{size: 10, offset: 1}} className='player-wrapper centerContent'>
        <FormGroup tag={"fieldset"}>
          <legend className={"RadioTitle"}>{this.props.name}: Question {this.props.currentQuestion}</legend>
          <legend className={"RadioTitle"}>{this.props.prompt}</legend>
          <ReactPlayer
            url={this.props.url}
            className='react-player'
            controls
          />
        </FormGroup>
      </Col>
    );
  }
}

export default Video