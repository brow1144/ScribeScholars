import React, {Component} from 'react';

import {Row, Col} from 'reactstrap';

import 'react-quill/dist/quill.core.css';
import './AnswerBox.css'

import TeacherAnswer from './TeacherAnswer';

class AnswerBox extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div>

        <br/>

        <Row>
          <Col sm='1'/>
          <Col className='answerBoxBackground' sm='11'>
            <div dangerouslySetInnerHTML={{ __html: this.props.discussion.body }} />
            <br/>
          </Col>
        </Row>

        <TeacherAnswer discussion={this.props.discussion}/>
      </div>
    );
  }
}


export default AnswerBox;