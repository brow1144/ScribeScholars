import React, { Component } from 'react';
import { Col, FormGroup } from 'reactstrap';
import ReactPlayer from 'react-player'

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    if(this.props.finalPage === false) {
      return (
        <Col sm={{size: 10, offset: 1}} className='player-wrapper centerContent'>
          <FormGroup tag={"fieldset"}>
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
    else {
      return (
        <Col sm={{size: 10, offset: 1}}>
          <h3>End of the assignment</h3>
        </Col>
      )
    }
  }
}

export default Video