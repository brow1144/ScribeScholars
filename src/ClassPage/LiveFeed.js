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

      highUID: "",
      lowUID: "",

      highFirstName: "Loading",
      highLastName: "",

      lowFirstName: "Loading",
      lowLastName: "",

      highestScore: 0,
      lowestScore: 100,

      scoresMap: {},

      classProgress: null,
      classAverage: 0,
      classMedian: 0,
      numberOfQuestions: 0,

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

    docRef.onSnapshot(function (doc) {
      if (doc.exists) {
        if (doc.data().students != null) {
          self.setState({
            students: doc.data().students,
          }, () => {
            self.getClassAverage();
            self.getHighLowScore();
          });
        }
      } else {
        console.log("No such document!");
      }
    })
  };

  getClassAverage = () => {

    let scoresMap = {};
    let self = this;
    self.state.students.forEach(function(element) {
      let lessonDataPerStudent = firestore.collection("users").doc(element).collection("inClass").doc(self.props.lessonNumber);

      lessonDataPerStudent.onSnapshot(function (doc) {
        if (doc.exists) {
          scoresMap[element] = doc.data().currentScore;
          self.setState({
            numberOfQuestions: doc.data().numOfQuestions,
          });
        } else {
          console.log("No such document!");
        }
        self.setState({
          scoresMap: scoresMap,
        }, () => {
          self.calculateAverage();
          self.calculateMedian();
        });


      })
    })
  };

  calculateAverage = () => {

    let temp = 0;
    for (let i in this.state.scoresMap) {
      temp += this.state.scoresMap[i];
    }
    let size = Object.keys(this.state.scoresMap).length;
    temp = temp / size;
    this.setState({
      classAverage: temp,
    });
  };

  calculateMedian = () => {

    let median = 0;

    let array = [];

    for (let i in this.state.scoresMap) {
      array.unshift(this.state.scoresMap[i]);
    }

    array.sort();

    let size = Object.keys(this.state.scoresMap).length;
    if ((size % 2) !== 0) {
      // Even
      median += array[Math.floor(size / 2)];
    } else {
      // Odd
      median += array[Math.floor((size) / 2)];
      median += array[Math.floor((size / 2)) - 1];
      median = median / 2;
    }

    this.setState({
      classMedian: median,
    });
  };

  getHighLowScore = () => {
    let self = this;
    self.state.students.forEach(function(element) {
      let lessonDataPerStudent = firestore.collection("users").doc(element).collection("inClass").doc(self.props.lessonNumber);

      lessonDataPerStudent.onSnapshot(function (doc) {
        if (doc.exists) {
          if (doc.data().currentScore > self.state.highestScore) {
            self.setState({
              highUID: element,
              highestScore: doc.data().currentScore,
            }, () => {
              //self.getHighName();
            })
          }

          if (doc.data().currentScore < self.state.lowestScore) {
            self.setState({
              lowUID: element,
              lowestScore: doc.data().currentScore,
            }, () => {
              //self.getlowName();
            })
          }
        } else {
          console.log("No such document!");
        }
      })

    })
  };

  getHighName = () => {

    let docRef = firestore.collection("users").doc(this.state.highUID);
    let self = this;

    docRef.onSnapshot(function (doc) {
      if (doc.exists) {
        self.setState({
          highFirstName: doc.data().firstName,
          highLastName: doc.data().lastName,
        });
      } else {
        console.log("No such document!");
      }
    })
  };

  getlowName = () => {

    let docRef1 = firestore.collection("users").doc(this.state.lowUID);
    let self = this;

    docRef1.onSnapshot(function (doc) {
      if (doc.exists) {
        self.setState({
          lowFirstName: doc.data().firstName,
          lowLastName: doc.data().lastName,
        });
      } else {
        console.log("No such document!");
      }
    })
  };


  render() {

    const lesssonStatsData = {
      classAverage: this.state.classAverage,
      classMedian: this.state.classMedian,
      numberOfQuestions: this.state.numberOfQuestions,
    };

    const liveGraphsData = {
      highestScore: this.state.highestScore,
      lowestScore: this.state.lowestScore,

      highFirstName: this.state.highFirstName,
      highLastName: this.state.highLastName,

      lowFirstName: this.state.lowFirstName,
      lowLastName: this.state.lowLastName,
    };

    return (
      <div>
        <hr />
        <br />

        <LessonStats {...lesssonStatsData} />

        <LineBreak />

        <LiveGraphs {...liveGraphsData}  />

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
