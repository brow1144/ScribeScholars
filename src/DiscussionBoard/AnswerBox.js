import React, {Component} from 'react';

import {Row, Col} from 'reactstrap';

import 'react-quill/dist/quill.core.css';

import '../DiscussionBoard/AnswerBox.css'

class AnswerBox extends Component {

  render() {
    return (
      <div>
        <Row>
          <Col sm='1'/>
          <Col sm='11'>
            <br/>
            <p className='teacherAnswer'>Teacher Answer!</p>
          </Col>
        </Row>

        <Row>
          <Col sm='1'/>
          <Col sm='11'><hr/></Col>
        </Row>

        <Row>
          <Col sm='1'/>
          <Col sm='11'>
            <p>
              <span className="ql-size-huge">So this is the answer: </span>
            </p>
            <p>
              <br/>
            </p>
            <ul>
              <li>Stop being dumb</li>
              <li><code>public static void main(string [] args)</code></li>
            </ul>
          </Col>
        </Row>
      </div>
    );
  }
}


export default AnswerBox;