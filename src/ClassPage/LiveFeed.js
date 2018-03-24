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

      highFirstName: "",
      highLastName: "",

      lowFirstName: "",
      lowLastName: "",

      highestScore: 0,
      lowestScore: 0,

      completionMap: {},
      notStarted: 0,
      inProgress: 0,
      completed: 0,
      completionGraphMap: [{}],

      letterGradeMap: [{}],

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

    docRef.get().then(function (doc) {
      if (doc.exists) {
        if (doc.data().students != null) {
          self.setState({
            students: doc.data().students,
          }, () => {
            self.getClassAverage();
            self.getHighLowScore();
            //self.getUserNames();
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
    self.state.students.forEach(function(element) {
      let lessonDataPerStudent = firestore.collection("users").doc(element).collection("inClass").doc(self.props.lessonNumber);

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
          lowestScore: scores[0],
          lowUID: element,
        }, () => {
          self.calculateAverage();
          self.calculateMedian();
          self.getCompletion();
          self.getLetterGrades();
        });
      })
    })
  };

  calculateAverage = () => {

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

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  getCompletion = () => {

    let notStarted = 0;
    let inProgress = 0;
    let completed = 0;

    for (let i in this.state.completionMap) {

      if (this.state.completionMap[i] === "0") {
        notStarted++;
      } else if (this.state.completionMap[i] === "1") {
        inProgress++;
      } else if (this.state.completionMap[i] === "2") {
        completed++;
      }
    }

    let object = [{}];

    if (notStarted !== 0) {
      object.unshift({"name": "Not Started", "value": notStarted});
    }

    if (inProgress !== 0) {
      object.unshift({"name": "In Progress", "value": inProgress});
    }

    if (completed !== 0) {
      object.unshift({"name": "Completed", "value": completed});
    }


    this.setState({
      notStarted: notStarted,
      inProgress: inProgress,
      completed: completed,
      completionGraphMap: object,
    })

  };

  getLetterGrades = () => {

    let A = 0;
    let B = 0;
    let C = 0;
    let D = 0;
    let F = 0;

    for (let i in this.state.scoresMap) {

      if (this.state.scoresMap[i] >= 0 && this.state.scoresMap[i] < 60) {
        // F
      } else if (this.state.scoresMap[i] >= 60 && this.state.scoresMap[i] < 63) {
        // D -
      } else if (this.state.scoresMap[i] >= 63 && this.state.scoresMap[i] < 67) {
        // D
      } else if (this.state.scoresMap[i] >= 67 && this.state.scoresMap[i] < 70) {
        // D +
      } else if (this.state.scoresMap[i] >= 70 && this.state.scoresMap[i] < 80) {
        // C -
      } else if (this.state.scoresMap[i] >= 80 && this.state.scoresMap[i] < 90) {
        // C
      } else if (this.state.scoresMap[i] >= 90 && this.state.scoresMap[i] <= 100) {
        // C +
      } else if (this.state.scoresMap[i] >= 90 && this.state.scoresMap[i] <= 100) {
        // B -
      } else if (this.state.scoresMap[i] >= 90 && this.state.scoresMap[i] <= 100) {
        // B
      } else if (this.state.scoresMap[i] >= 90 && this.state.scoresMap[i] <= 100) {
        // B +
      } else if (this.state.scoresMap[i] >= 90 && this.state.scoresMap[i] <= 100) {
        // A -
      } else if (this.state.scoresMap[i] >= 90 && this.state.scoresMap[i] <= 100) {
        // A
      }
    }

  };

  getHighLowScore = () => {
    let self = this;
    self.state.students.forEach(function(element) {
      let lessonDataPerStudent = firestore.collection("users").doc(element).collection("inClass").doc(self.props.lessonNumber);

      lessonDataPerStudent.get().then(function (doc) {
        if (doc.exists) {
          if (doc.data().currentScore > self.state.highestScore) {
            self.setState({
              highUID: element,
              highestScore: doc.data().currentScore,
            })
          } else if (doc.data().currentScore < self.state.lowestScore) {
            self.setState({
              lowUID: element,
              lowestScore: doc.data().currentScore,
            })
          }
          self.getUserNames();
        } else {
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      })
    })
  };

  getUserNames = () => {

    let docRef = firestore.collection("users").doc(this.state.highUID);
    let self = this;

    docRef.get().then(function (doc) {
      if (doc.exists) {
        self.setState({
          highFirstName: doc.data().firstName,
          highLastName: doc.data().lastName,
        });
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

    let docRef1 = firestore.collection("users").doc(this.state.lowUID);

    docRef1.get().then(function (doc) {
      if (doc.exists) {
        self.setState({
          lowFirstName: doc.data().firstName,
          lowLastName: doc.data().lastName,
        });
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
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
      completionMap: this.state.completionMap,

      notStarted: this.state.notStarted,
      inProgress: this.state.inProgress,
      completed: this.state.completed,
      completionGraphMap: this.state.completionGraphMap,
    };

    const studentChartData = {
      studentsData: this.state.studentsData,
      progressMap: this.state.progressMap,
      scoresMap: this.state.scoresMap,
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
