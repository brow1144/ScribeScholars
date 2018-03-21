import React, { Component } from 'react';

import { Row, Col } from 'reactstrap';

class LineBreak extends Component {

  render() {
    return (
      <Row>
        <Col xs="1" />
        <Col xs="10">
          <hr />
        </Col>
        <Col xs="" />
      </Row>
    );
  }
}

export default LineBreak;
