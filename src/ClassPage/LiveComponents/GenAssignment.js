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
      uid: this.props.uid,

      question: [{
        option1: null,
        option2: null,
        option3: null,
        option4: null,
        prompt: null,
        type: null,
      }],

      lessonNumber: this.props.lessonNumber,

      assignments: [{
        lessonCode: null,
        maxscore: null,
        name: null,
        class: null,
        questions: null,
      }],

      currentScore: null,
      currentQuestion: null,
      completed: null,
      answerHistory: null,
    }
  }

  componentWillMount() {
    this.getAssignments(this.props.class)
    this.getUserAssignment(this.props.class)
    //this.setQuestion()
  }

  /*
   *Decides which question will be picked based on currentQuestion variable
   */
  setQuestion = () => {

    let index = this.state.currentQuestion;
    let assign = this.state.assignments;
    //if(this.state.currentQuestion < assign.questions.size()) {
    console.log(this.state.assignments[0].questions[0]);
    //this.state.question = assign[0].questions(index - 1)

  }


  getAssignments = (classCode) => {

    let object = [{}];

    let self = this;

    let docRef = firestore.collection("classes").doc(classCode).collection("inClass").doc(this.state.lessonNumber);

    docRef.get().then(function (doc) {
      if (doc.exists) {
        object.unshift({
          lessonCode: doc.id,
          maxscore: doc.data().maxscore,
          name: doc.data().name,
          class: classCode,
          questions: doc.data().questions,
        });
        self.setState({
          assignments: object,
        })
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

  object.pop();

  };


  getUserAssignment = () => {

    let self = this;

    let docRef = firestore.collection("users").doc(this.state.uid).collection("inClass").doc(this.state.lessonNumber)

    docRef.get().then((doc) => {
      if (doc.exists) {
        self.setState({
          currentScore: doc.data().currentScore,
          currentQuestion: doc.data().currentQuestion,
          completed: doc.data().completed,
          answerHistory: doc.data().answerHistory,
        });
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

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