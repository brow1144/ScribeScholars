import React, { Component } from 'react';

import { Row, Col } from 'reactstrap';

import {firestore} from "../../base";


class GenHomework extends Component {

  constructor(props) {
    super(props);

    this.state = {
      questions: null,

      homeworks: [{
        lessonCode: null,
        maxscore: null,
        name: null,
        class: null,
        questions: null,
      }],

      curQuestion: null,
  }
  }

  grabQuestion = () => {
    let self = this;

    // the classes' assignment collection reference
    let homeworkRef = firestore.collection("classes").doc(this.props.code).collection("Homework").doc("12345678");
    homeworkRef.get().then(function(doc) {
      if (doc.exists) {
        if (doc.data().questions != null) {
          self.setState({
            questions: doc.data().questions,
          });
        }
      } else {
        console.log("user not found");
      }


    }).catch(function(error) {
      console.log("Error getting document: ", error);
    });
  };

  render() {
    return (
      <div>
        <Row>
          <Col>
            <p>Hey its me</p>
          </Col>
        </Row>
      </div>
    )
  }
}

export default GenHomework