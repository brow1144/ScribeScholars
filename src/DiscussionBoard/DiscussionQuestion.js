import React, { Component } from 'react';

import { Col, Row} from 'reactstrap';

import defaultUser from '../HomePage/defUser.png';

import { firestore } from "../base";

import '../DiscussionBoard/DiscussionBoard.css'

import AnswerBox from './Question/AnswerBox';

class DiscussionQuestion extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userImage: '',
      name: '',
      accVisible: false,
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

  handleExpand = (id) => {
    let self = this;
    let docRef = firestore.collection("classes").doc(this.props.classCode).collection("discussionBoard").doc(this.props.discussion.id);

    docRef.onSnapshot(function (doc) {
      if (doc.exists) {
        let views = doc.data().views;
        views[self.props.uid] = self.props.uid;
        docRef.update({views: views})
      }
    });

    this.setState({accVisible: !this.state.accVisible});
  };

  render() {
    return (
      <Row>
        <Col sm='0' md='2'/>
        <Col className='borderClass' sm='12' md='8'>
          <Row onClick={() => {this.handleExpand(this.props.discussion.id)}} className='questionBox'>
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
                  <h5 style={{color: '#21ce99'}}>+</h5>
                  :
                  <h5 style={{color: '#F45531'}}>X</h5>

                }
              </Row>
              <Row>
                <p className='response'>
                  Student:
                </p>

                {this.props.discussion.studentAns !== ''
                  ?
                  <h5 style={{color: '#21ce99'}}>+</h5>
                  :
                  <h5 style={{color: '#F45531'}}>X</h5>
                }
                </Row>
            </Col>
            <Col xs='11' md='1'>
              {this.props.discussion.views !== undefined
                ?
                <h4 className='replyNum'>{Object.keys(this.props.discussion.views).length}</h4>
                :
                <h4 className='replyNum'>Loading</h4>
              }
                <p className='replies'>Views</p>
            </Col>
          </Row>
          {this.state.accVisible === true
            ?
              <AnswerBox userImage={this.state.userImage} role={this.props.role} uid={this.props.uid}
                         classCode={this.props.classCode} discussion={this.props.discussion}/>
            :
            null
          }
        </Col>
        <Col sm='0' md='2'/>
      </Row>
    );
  }
}


export default DiscussionQuestion;