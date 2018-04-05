import React, { Component } from 'react';

import { Col, Row} from 'reactstrap';

import defaultUser from '../HomePage/defUser.png';

import { firestore } from "../base";

import '../DiscussionBoard/DiscussionBoard.css'

class DiscussionQuestion extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userImage: '',
      name: '',
    };
  }

  componentWillMount() {
    if (this.props.discussion.uid !== undefined && this.props.discussion.uid !== null) {

      let docRef = firestore.collection("users").doc(this.props.discussion.uid);
      let self = this;

      docRef.get().then(function (doc) {
        if (doc.exists) {
          let name = doc.data().firstName + ' ' + doc.data().lastName;
          self.setState({
            userImage: doc.data().userImage,
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
      <Row>
        <Col sm='0' md='2'/>
        <Col className='borderClass' sm='12' md='8'>
          <Row className='questionBox'>
            <Col xs='4' md='1'>
              {this.state.userImage
                ?
                <img className="userImage"
                     src={this.state.userImage}
                     alt="userIcon"/>
                :
                <img className="userImage"
                     src={defaultUser}
                     alt="userIcon"/>
              }
            </Col>
            <Col xs='8' md='4'>
              <h3 className='questionText'>
                {this.props.discussion.title}
              </h3>
              <p className="searchSubTitle">
                by {this.state.name}
              </p>
            </Col>
            <Col xs='0' md='2'/>
            <Col xs='11' md='3'>
              <h4 className='hashtag'>
                # {this.props.discussion.hashtag}
              </h4>
            </Col>
            <Col xs='10' md='1'>
              <Row>
                <p className='response'>
                  Teacher:
                </p>
                {this.props.discussion.teacherAns !== ''
                  ?
                  <i className="fas fa-check check"/>
                  :
                  <i className="fas fa-times times"/>
                }              </Row>
              <Row>
                <p className='response'>
                  Student:
                </p>
                {this.props.discussion.studentAns !== ''
                  ?
                  <i className="fas fa-check check"/>
                  :
                  <i className="fas fa-times times"/>
                }              </Row>
            </Col>
            <Col xs='11' md='1'>
              <h4 className='replyNum'>{this.props.discussion.views}</h4>
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