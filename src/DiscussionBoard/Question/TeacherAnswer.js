import React, {Component} from 'react';

import {Row, Col} from 'reactstrap';

import { firestore } from "../../base";

import 'react-quill/dist/quill.core.css';
import './AnswerBox.css'

import defaultUser from '../../HomePage/defUser.png';

class AnswerBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      teacherAnsImage: '',
      teacherAnsName: '',
    }
  }

  componentWillMount() {

    if (this.props.discussion.teacherAnsUID !== undefined && this.props.discussion.teacherAnsUID !== null) {

      let docRef = firestore.collection("users").doc(this.props.discussion.teacherAnsUID);
      let self = this;

      docRef.get().then(function (doc) {
        if (doc.exists) {
          let name = doc.data().firstName + ' ' + doc.data().lastName;
          self.setState({
            teacherAnsImage: doc.data().userImage,
            name: name,
          });

        } else {
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      })
    }

  }

  render() {
    return (
      <div>

        {this.props.discussion.teacherAns !== ''
          ?
          <div>
            <Row>
              <Col sm='1'/>
              <Col sm='1'>
                {this.state.teacherAnsImage
                  ?
                  <img className="userImage"
                       src={this.state.teacherAnsImage}
                       alt="userIcon"/>
                  :
                  <img className="userImage"
                       src={defaultUser}
                       alt="userIcon"/>
                }
              </Col>
              <Col sm='10'>
                <br/>
                <p className='teacherAnswer'>{this.state.name}'s Answer!</p>
              </Col>
            </Row>

            <Row>
              <Col sm='1'/>
              <Col sm='11'><hr/></Col>
            </Row>

            <Row>
              <Col sm='1'/>
              <Col sm='11'>
                <div dangerouslySetInnerHTML={{ __html: this.props.discussion.teacherAns }} />
                <br/>
              </Col>
            </Row>
          </div>
          :

          <div>
            <Row>
              <Col sm='1'/>
              <Col sm='11'>
                <hr/>
                <p>Add teacher answer!</p>
              </Col>
            </Row>

          </div>

        }
      </div>
    );
  }
}


export default AnswerBox;















