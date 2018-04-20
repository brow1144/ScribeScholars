import React, {Component} from 'react';

import {Row, Col} from 'reactstrap';

import { firestore } from "../../base";

import 'react-quill/dist/quill.core.css';
import './FollowUp.css'


import defaultUser from '../../HomePage/defUser.png';

class FollowUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      pic: null,

      newAnswer: '',

      visible: false,
      message: '',

      replies: [{}],
    }
  }

  componentWillMount() {
    this.getName();
  }

  /*
   * Gets the name for the current user
   */
  getName = () => {

    let docRef = firestore.collection("users").doc(this.props.curReply.userID);
    let self = this;

    docRef.get().then(function (doc) {
      if (doc.exists) {
        let name = doc.data().firstName + ' ' + doc.data().lastName;
        self.setState({
          name: name,
        });

      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    })
  };

  render() {

    return (
      <div>

        {this.props.curReply.reply !== ''
          ?
          <div>
            <Row>
              <Col sm='1'/>
              <Col sm='1'>
                {this.props.curReply.userImage
                  ?
                  <img className="userImage"
                       src={this.props.curReply.userImage}
                       alt="userIcon"/>
                  :
                  <img className="userImage"
                       src={defaultUser}
                       alt="userIcon"/>
                }
              </Col>
              {this.props.role === "teacher"
                ?
                <Col sm='10'>
                  <br/>
                  <p className='teacherAnswer'>{this.state.name}'s reply</p>
                  <p className={'followUpAns'}>Teacher reply</p>
                </Col>
                :
                <Col sm='10'>
                  <br/>
                  <p className='teacherAnswer'>{this.state.name}'s reply</p>
                  <p className={'followUpAns'}>Student reply</p>
                </Col>
              }
            </Row>

            <Row>
              <Col sm='1'/>
              <Col sm='11'>
                <hr/>
              </Col>
            </Row>

            <Row>
              <Col sm='1'/>
              <Col sm='11'>
                <div dangerouslySetInnerHTML={{__html: this.props.curReply.reply}}/>
                <br/>
              </Col>
            </Row>
          </div>
          : null

        }

      </div>
    );
  }
}


export default FollowUp;















