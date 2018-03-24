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

      studentsData: [{
        firstName: "",
        lastName: "",
        uid: "",
      }],

      highUID: "",
      lowUID: "",

      highFirstName: "Loading",
      highLastName: "",
      lowFirstName: "Loading",
      lowLastName: "",
      highestScore: 0,
      lowestScore: 100,

      scoresMap: {},

      classProgress: 0,
      progressMap: {},

      completionMap: {},
      notStarted: 0,
      inProgress: 0,
      completed: 0,
      completionGraphMap: [{}],

      classAverage: 0,
      classMedian: 0,
      numberOfQuestions: 0,
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
            self.getStudentData();
            self.getClassAverage();
            self.getHighLowScore();
            self.getProgress();

          });
        }
      } else {
        console.log("No such document!");
      }
    })
  };

  getStudentData = () => {

    let studentsData = [{}];
    let object = {};
    let self = this;
    self.state.students.forEach(function(element) {
      let dataPerStudent = firestore.collection("users").doc(element);

      dataPerStudent.onSnapshot(function (doc) {
        if (doc.exists) {
          object = {
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            uid: element,
          };
          studentsData.unshift(object);

          self.setState({
            studentsData: studentsData,
          });
        } else {
          console.log("No such document!");
        }
      })
    });

    studentsData.pop();
    self.setState({
      studentsData: studentsData
    });

  };

  getClassAverage = () => {


    let scoresMap = {};
    let completionMap = {};

    let self = this;
    self.state.students.forEach(function(element) {
      let lessonDataPerStudent = firestore.collection("users").doc(element).collection("inClass").doc(self.props.lessonNumber);


      lessonDataPerStudent.onSnapshot(function (doc) {
        if (doc.exists) {

          scoresMap[element] = doc.data().currentScore;
          scoresMap[element] = Math.round(scoresMap[element] * 100) / 100;

          completionMap[element] = doc.data().completed;

          self.setState({
            numberOfQuestions: doc.data().numOfQuestions,
          });

        } else {
          console.log("No such document!");
        }
        self.setState({
          scoresMap: scoresMap,
          completionMap: completionMap,
        }, () => {
          self.calculateAverage();
          self.calculateMedian();
          self.getCompletion();
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
    temp = Math.round(temp * 100) / 100;
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

    this.setState({
      highestScore: array[array.length - 1],
      lowestScore: array[0],
      highUID: this.getKeyByValue(this.state.scoresMap, array[array.length - 1]),
      lowUID: this.getKeyByValue(this.state.scoresMap, array[0]),
    }, () => {
      this.getHighName();
      this.getlowName();
    });

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

    median = Math.round(median * 100) / 100;

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

  getHighLowScore = () => {
    let self = this;
    self.state.students.forEach(function(element) {
      let lessonDataPerStudent = firestore.collection("users").doc(element).collection("inClass").doc(self.props.lessonNumber);


      lessonDataPerStudent.onSnapshot(function (doc) {
        if (doc.exists) {
          if (doc.data().currentScore > self.state.highestScore) {
            let highScore = doc.data().currentScore;
            highScore = Math.round(highScore * 100) / 100;
            self.setState({
              highUID: element,
              highestScore: highScore,
            }, () => {
              //self.getHighName();
            })
          }

          if (doc.data().currentScore < self.state.lowestScore) {
            let lowScore = doc.data().currentScore;
            lowScore = Math.round(lowScore * 100) / 100;
            self.setState({
              lowUID: element,
              lowestScore: lowScore,
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

    })
  };

  getlowName = () => {

    let docRef1 = firestore.collection("users").doc(this.state.lowUID);
    let self = this;

    docRef1.get().then(function (doc) {

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

  getProgress = () => {

    let progressMap = this.state.progressMap;
    let self = this;

    self.state.students.forEach(function(element) {
      let lessonProgressPerStudent = firestore.collection("users").doc(element).collection("inClass").doc(self.props.lessonNumber);

      lessonProgressPerStudent.onSnapshot(function (doc) {
        if (doc.exists) {
          progressMap[element] = (doc.data().currentQuestion / doc.data().numOfQuestions) * 100;
        } else {
          console.log("No such document!");
        }
        self.setState({
          progressMap: progressMap,
        }, () => {
          self.calculateProgress();
        });
      })
    })
  };

  calculateProgress = () => {

    let temp = 0;
    for (let i in this.state.progressMap) {
      temp += this.state.progressMap[i];
    }
    let size = Object.keys(this.state.progressMap).length;
    temp = temp / size;
    //temp *= 100;
    this.setState({
      classProgress: temp,
    });

  };


  render() {

    const lesssonStatsData = {
      classProgress: this.state.classProgress,
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

        <StudentsChart {...studentChartData} />

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
