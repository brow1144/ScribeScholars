import React, {Component} from 'react';

import { firestore } from "../base";

import {Row} from 'reactstrap';

import LineBreak from './LiveComponents/LineBreak';
import StudentStats from './StudentLiveComponents/StudentStats';
import StudentGraph from './StudentLiveComponents/StudentGraph';
import StudentTable from './StudentLiveComponents/StudentTable';

class StudentLiveFeed extends Component {

  constructor(props) {
    super(props);

    this.state = {

      students: [],
      studentsData: {},

      scoresMap: {},

      classProgress: 0,
      progress: 0,

      average: 0,
      numberOfQuestions: 0,

      aboveAverage: true,
      comparedToAverage: 0,

      answerMap: {},

      promptObj: [{}],
      promptArr: [],

      scoreHistory: [],

      historyGraph: [{}],

    }
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
            self.getProgress();
            self.getQuestionProgress();
            self.getPrompts();
            self.getScoreHistory();
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

    let self = this;
    self.state.students.forEach(function(element) {
      let lessonDataPerStudent = firestore.collection("users").doc(element).collection("inClass").doc(self.props.lessonNumber);


      lessonDataPerStudent.onSnapshot(function (doc) {
        if (doc.exists) {

          scoresMap[element] = doc.data().currentScore;
          scoresMap[element] = Math.round(scoresMap[element] * 100) / 100;

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
    }, () => {
      if (this.state.classAverage >= this.state.scoresMap[this.props.studUid]) {
        this.setState({
          aboveAverage: false,
          comparedToAverage: Math.round((this.state.classAverage - this.state.scoresMap[this.props.studUid]) * 100) / 100,
        })
      } else if (this.state.classAverage <= this.state.scoresMap[this.props.studUid]) {
        this.setState({
          aboveAverage: true,
          comparedToAverage: Math.round((this.state.scoresMap[this.props.studUid] - this.state.classAverage) * 100) / 100,
        })
      }

    });
  };

  getProgress = () => {

    let progress = this.state.progress;
    let self = this;

    let lessonProgressPerStudent = firestore.collection("users").doc(self.props.studUid).collection("inClass").doc(self.props.lessonNumber);

    lessonProgressPerStudent.onSnapshot(function (doc) {
        if (doc.exists) {
          progress = (doc.data().currentQuestion / doc.data().numOfQuestions) * 100;
        } else {
          console.log("No such document!");
        }
        self.setState({
          progress: progress,
        });
      }
    )
  };

  getQuestionProgress = () => {

    let self = this;
    let lessonDataPerStudent = firestore.collection("users").doc(self.props.studUid).collection("inClass").doc(self.props.lessonNumber);

    let object = {
      questions: [],
    };

    lessonDataPerStudent.onSnapshot(function (doc) {
      if (doc.exists) {
        object.questions = doc.data().questions;
      } else {
        console.log("No such document!");
      }
      self.setState({
        answerMap: object,
      })
    })
  };

  getPrompts = () => {

    let temp = [{}];
    let self = this;
    let lessonDataPerStudent = firestore.collection("classes").doc(self.props.class).collection("inClass").doc(self.props.lessonNumber);

    lessonDataPerStudent.onSnapshot(function (doc) {
      if (doc.exists) {

        temp = doc.data().questions;

      } else {
        console.log("No such document!");
      }
      self.setState({
        promptObj: temp,
      }, () => {
        self.walkPrompts();
      })
    })
  };

  walkPrompts = () => {
    let temp = [];
    for (let i in this.state.promptObj) {
      let data = this.state.promptObj[i];
      temp.unshift(data.prompt);
    }
    this.setState({
      promptArr: temp,
    });
  };

  getScoreHistory = () => {

    let temp = [];
    let self = this;
    let lessonDataPerStudent = firestore.collection("users").doc(self.props.studUid).collection("inClass").doc(self.props.lessonNumber);

    lessonDataPerStudent.onSnapshot(function (doc) {
      if (doc.exists) {

        temp = doc.data().answerHistory;

      } else {
        console.log("No such document!");
      }
      self.setState({
        scoreHistory: temp,
      }, () => {
        self.getGraphData();
      })
    })
  };

  getGraphData = () => {

    let temp = [{}];

    let j = 1;
    for (let i in this.state.scoreHistory) {

      let obj = {};
      let data = this.state.scoreHistory[i];

      obj.name = `Question ${j}`;
      obj.ScoreHistory = data;

      temp.push(obj);
      j++;
    }

    temp.shift();
    this.setState({
      historyGraph: temp
    });

  };


  render() {

    const stats = {
      progress: this.state.progress,
      score: this.state.scoresMap[this.props.studUid],
      aboveAverage: this.state.aboveAverage,
      comparedToAverage: this.state.comparedToAverage
    };

    const graphData = {
      historyGraph: this.state.historyGraph,
    };

    const tableData = {
      numberOfQuestions: this.state.numberOfQuestions,
      answerMap: this.state.answerMap.questions,
      promptArr: this.state.promptArr,
    };

    return (
      <div>
        <hr/>
        <br/>

        <StudentStats {...stats} />

        <LineBreak/>

        <Row>
          <StudentGraph {...graphData} />
          <StudentTable {...tableData}/>
        </Row>

      </div>
    );
  }
}

export default StudentLiveFeed;
