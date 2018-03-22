import React, { Component } from 'react';

import LessonStats from './LiveComponents/LessonStats';
import LineBreak from './LiveComponents/LineBreak';
import LiveGraphs from './LiveComponents/LiveGraphs';
import StudentsChart from './LiveComponents/StudentsChart';

import { firestore } from "../base";

import './LiveFeed.css';

class LiveFeed extends Component {

  constructor(props) {
    super(props);

    this.state = {
      students: [],

      scores: [],

      classProgress: null,
      classAverage: 0,
      classMedian: 0,
      numberOfQuestions: 0,

      highestScore: null,
      lowestScore: null,

      notStarted: null,
      inProgress: null,
      Completed: null,
    };
  }

  componentWillMount() {
    this.getStudentsInClass();
  }

  getStudentsInClass = () => {
    let docRef = firestore.collection("classes").doc(this.props.class);
    let self = this;

    docRef.get().then(function (doc) {
      if (doc.exists) {
        if (doc.data().students != null) {
          self.setState({
            students: doc.data().students,
          }, () => {
            self.getClassAverage();
          });
        }
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    })
  };

  getClassAverage = () => {

    let scores = [];
    let self = this;
    // for (let i in this.state.students) {
    self.state.students.forEach(function(element) {
      let lessonDataPerStudent = firestore.collection("users").doc(element).collection("inClass").doc(self.props.lessonNumber);

      console.log(element);

      lessonDataPerStudent.get().then(function (doc) {
        if (doc.exists) {
          scores.unshift(doc.data().currentScore);
          self.setState({
            numberOfQuestions: doc.data().numOfQuestions,
          });
        } else {
          console.log("No such document!");
        }
        self.setState({
          scores: scores,
        }, () => {
          self.calculateAverage();
          self.calculateMedian();
        });


      }).catch(function (error) {
        console.log("Error getting document:", error);
      })
    })
  };

  calculateAverage = () => {

    console.log("average: " + this.state.scores.length);
    let temp = 0;
    for (let i in this.state.scores) {
      temp += this.state.scores[i];
    }
    temp = temp / this.state.scores.length;
    this.setState({
      classAverage: temp,
    });
  };

  calculateMedian = () => {
    console.log("median: " + this.state.scores.length);

    let median = 0;
    let array = this.state.scores;
    array.sort();

    if ((this.state.scores.length % 2) !== 0) {
      // Even
      median += array[Math.floor(this.state.scores.length / 2)];
    } else {
      // Odd
      median += array[Math.floor(this.state.scores.length / 2)];
      median += array[Math.floor((this.state.scores.length / 2)) - 1];
      median = median / 2;
    }

    this.setState({
      classMedian: median,
    });
  };

  render() {

    const lesssonStatsData = {
      classAverage: this.state.classAverage,
      classMedian: this.state.classMedian,
      numberOfQuestions: this.state.numberOfQuestions,
    };

    return (
      <div>
        <hr />
        <br />

        <LessonStats {...lesssonStatsData} />

        <LineBreak />

        <LiveGraphs />

        <LineBreak />

        <StudentsChart />

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

      </div>
    );
  }
}

export default LiveFeed;
