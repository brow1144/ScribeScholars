import React, { Component } from 'react';

import { Nav, NavLink, Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom'
import {firestore} from "../../base";
import MCQ from "./MCQ";

import "./GenAssignment.css"


class GenAssignment extends Component {

  constructor(props) {
    super(props);

    this.state = {
      questions: null,

      question: [{
        option1: null,
        option2: null,
        option3: null,
        option4: null,
        prompt: null,
        type: null,
      }],

      assignments: this.props.assignments,

      curQuestion: null,
    }
  }

  componentWillMount() {

  }

  grabQuestion = (index) => {
    let self = this;

    // the classes' assignment collection reference
    let homeworkRef = firestore.collection("classes").doc(this.props.code).collection("inClass").doc();
    homeworkRef.get().then(function(doc) {
      if (doc.exists) {
        if (doc.data().questions != null) {
          self.setState({
            question: doc.data().questions(index),
          });
        }
      } else {
        console.log("user not found");
      }


    }).catch(function(error) {
      console.log("Error getting document: ", error);
    });
  };

  updateAssignment = () => {
    /*
    let studentRef = firestore.collection("users").doc(self.state.uid);
    studentRef.get().then(function(doc) {
      if (doc.exists) {
        let data = doc.data();
        tclasses = data.classes;

        for (let j in tclasses) {
          if (tclasses[j].code === code)
            tclasses[j].class = newName;
        }

        teacherRef.update({
          classes: tclasses,
        })
          .then(function() {
            console.log("Document successfully updated!");
          }).catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
        self.props.updateClasses(tclasses);
      } else {
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
*/
  }

  render() {
    return (
      <div className={"center"}>
        <Container fluid >
          <Row>
            <Col>
              <MCQ/>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default GenAssignment