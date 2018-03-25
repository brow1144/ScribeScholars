import React, {Component} from 'react';

import {Col, Row, Alert} from 'reactstrap';

class FailingStudent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      students: [],

      visible: true,
    };
  }

  onDismiss = () => {
    this.setState({visible: false});
  };

  render() {

    return (
      <Row>
        <Col sm='0' md='1'/>
        <Col sm='12' md='10'>
          <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
            {this.props.failingNames} isn't doing well! You may want to check on them!
          </Alert>
        </Col>
        <Col sm='0' md='1'/>
      </Row>
    );
  }
}

export default FailingStudent;

