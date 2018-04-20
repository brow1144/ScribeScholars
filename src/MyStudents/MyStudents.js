import React, {Component} from 'react';
import {Container, Row, Col, Table, Button} from 'reactstrap';
import {XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';
import {firestore} from "../base";

import './MyStudents.css';
import GradingPage from "./GradingPage";
import Graphs from '../Dashboard/Dashboard'
import StudList from '../Dashboard/StudList'
import HomeCards from '../Dashboard/HomeCards'
import InClassCards from '../Dashboard/InClassCards'
//import QuizCards from '../Dashboard/QuizCards'

class MyStudents extends Component {
  constructor(props) {
    super(props);

    this.state = {

      students: [{
        name: null,
        email: null,
        gpa: null,
      }],

      homeworks: [{
        id: null,
        name: null,
        maxScore: null
      }],

      inclass: [{
        id: null,
        name: null,
        maxScore: null
      }],

      /*quizzes: [{
        id: null,
        name: null,
        maxScore: null
      }],*/

      uid: this.props.uid,
      code: this.props.code,

      myAssignments: [],  // all the user's assignments from this class
      myScore: null,  // user's score on current assignment

      classAssignments: [],   // assignments in the class
      studentsList: [],   // all students in the class
      allAssignments: [],   // all assignments from every student

      assignmentGrades: [],   // individual grades for each assignment

      graphVisible: false,

      inClassWeight: null,
      homeworkWeight: null,

      page: "dashboard",
      activeAss: null,


      avgGpa: null,
      passFail: [],
      gpaDis: [],
    }
  }

  componentWillMount() {
    this.getClassInfo();
    this.getHomeworks();
    this.getInClass();
    //this.getQuizzes();
  };

  // get assignments and students for a particular class
  getClassInfo = () => {
    let self = this;
    let classRef = firestore.collection("classes").doc(this.state.code);

    classRef.get().then((doc) => {
      if (doc.exists) {
        if (doc.data().students != null) {
          self.setState({
            studentsList: doc.data().students,
            inClassWeight: doc.data().inClassWeight / 100,
            homeworkWeight: doc.data().homeworkWeight / 100,
          });

          self.getClassAssignmentsOfType("homework");
          //self.getClassAssignmentsOfType("quizzes");
          //self.getClassAssignmentsOfType("tests");
          self.getClassAssignmentsOfType("inClass");

          self.getAllAssignments();
        }
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  getClassAssignmentsOfType = (type) => {
    let self = this;

    firestore.collection("classes").doc(this.state.code).collection(type).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        self.setState({
          classAssignments: self.state.classAssignments.concat({data: doc.data(), type: type}),
        });
      });
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  getAssignmentsOfType = (uid, type) => {
    let self = this;

    firestore.collection("users").doc(uid).collection(type).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.data().class === self.state.code && doc.data().score != null) {
          self.setState({
            allAssignments: self.state.allAssignments.concat({data: doc.data(), uid: uid, type: type}),
          });
        }
      });
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  // get user's assignment from class list of assignments
  getStudentAssignment = (uid, assignment) => {
    for (let i in this.state.allAssignments) {
      if (this.state.allAssignments.hasOwnProperty(i)) {
        if (this.state.allAssignments[i].uid === uid && this.state.allAssignments[i].data.name === assignment.data.name)
          return this.state.allAssignments[i];
      }
    }
  };

  getAllAssignments = () => {
    let self = this;
    for (let i in this.state.studentsList) {
      if (this.state.studentsList.hasOwnProperty(i)) {
        self.getAssignmentsOfType(self.state.studentsList[i], "homework");
        //self.getAssignmentsOfType(self.state.studentsList[i], "quizzes");
        //self.getAssignmentsOfType(self.state.studentsList[i], "tests");
        self.getAssignmentsOfType(self.state.studentsList[i], "inClass");

        let studentRef = firestore.collection("users").doc(this.state.studentsList[i]);
        studentRef.get().then(() => {
          if (parseInt(i, 10) === self.state.studentsList.length - 1)
            self.getStudents();
        }).catch(function (error) {
          console.log("Error getting document:", error);
        });
      }
    }
  };

  // get overall grade in class
  getGrade = (uid) => {
    let inClassTotal = 0;
    let homeworkTotal = 0;
    let inClassMax = 0;
    let homeworkMax = 0;

    for (let i in this.state.allAssignments) {
      if (this.state.allAssignments.hasOwnProperty(i)) {
        if (this.state.allAssignments[i].uid === uid && this.state.allAssignments[i].data.score != null) {
          if (this.state.allAssignments[i].type === "inClass") {
            inClassTotal += this.state.allAssignments[i].data.score;
            inClassMax += this.state.allAssignments[i].data.maxScore;
          } else if (this.state.allAssignments[i].type === "homework") {
            homeworkTotal += this.state.allAssignments[i].data.score;
            homeworkMax += this.state.allAssignments[i].data.maxScore;
          }
        }
      }
    }

    let grade;

    if (inClassMax !== 0 && homeworkMax !== 0)
      grade = ((inClassTotal / inClassMax) * this.state.inClassWeight + (homeworkTotal / homeworkMax) * this.state.homeworkWeight) * 100;
    else if (inClassMax !== 0)
      grade = (inClassTotal / inClassMax) * 100;
    else if (homeworkMax !== 0)
      grade = (homeworkTotal / homeworkMax) * 100;

    if (grade % 1 !== 0)
      grade = Math.round(grade * 100) / 100;

    return grade;
  };

  // build data for assignmentGrades
  buildAssignmentGradesGraph = (uid) => {
    let tmpAssignmentGrades = [];

    for (let i in this.state.classAssignments) {
      if (this.state.classAssignments.hasOwnProperty(i)) {
        let assignment = this.getStudentAssignment(uid, this.state.classAssignments[i]);

        if (assignment != null && assignment.data.score != null) {
          let name = assignment.data.name;
          let grade = (assignment.data.score / assignment.data.maxScore) * 100;
          let avg = this.getAverageScore(this.state.classAssignments[i], true);
          let med = this.getMedianScore(this.state.classAssignments[i], true);

          if (grade % 1 !== 0)
            grade = Math.round(grade * 100) / 100;

          tmpAssignmentGrades = tmpAssignmentGrades.concat({name: name, grade: grade, average: avg, median: med});
        }
      }
    }

    this.setState({
      assignmentGrades: tmpAssignmentGrades,
    });
  };

  // calculate average score for an assignment
  getAverageScore = (assignment, percentage) => {
    let total = 0;
    let numStudents = 0;

    for (let i in this.state.allAssignments) {
      if (this.state.allAssignments.hasOwnProperty(i)) {
        if (this.state.allAssignments[i].data.name === assignment.data.name) {
          total += this.state.allAssignments[i].data.score;
          numStudents++;
        }
      }
    }

    if (numStudents === 0)
      return "--";

    if (percentage) {   // return score as a percentage
      let grade = ((total / numStudents) / assignment.data.maxScore) * 100;

      if (grade % 1 !== 0)
        grade = Math.round(grade * 100) / 100;

      return grade;
    } else {  // return score
      let score = total / numStudents;

      if (score % 1 !== 0)
        score = Math.round(score * 100) / 100;

      return score;
    }
  };

  // get median score for an assignment
  getMedianScore = (assignment, percentage) => {
    let tmpScores = [];
    let median = 0;

    for (let i in this.state.allAssignments) {
      if (this.state.allAssignments.hasOwnProperty(i)) {
        if (this.state.allAssignments[i].data.name === assignment.data.name)
          tmpScores = tmpScores.concat(this.state.allAssignments[i].data.score);
      }
    }

    if (tmpScores === undefined || tmpScores.length === 0)
      return "--";

    tmpScores.sort();

    let size = tmpScores.length;
    if ((size % 2) !== 0)   // odd
      median += tmpScores[Math.floor(size / 2)];
    else {  // even
      median += tmpScores[Math.floor(size / 2)];
      median += tmpScores[Math.floor(size / 2) - 1];

      median = median / 2;
    }

    if (percentage) {   // return score as a percentage
      let grade = (median / assignment.data.maxScore) * 100;

      if (grade % 1 !== 0)
        grade = Math.round(grade * 100) / 100;

      return grade;
    } else {  // return score
      let score = median;

      if (score % 1 !== 0)
        score = Math.round(score * 100) / 100;

      return score;
    }
  };

  getHomeworks = () => {
    let object = [{}];

    let self = this;

    let colRef = firestore.collection("classes").doc(this.props.code).collection("homework");

    colRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        object.unshift({
          id: doc.id,
          colRef: colRef.id,
          name: doc.data().name,
          maxScore: doc.data().maxScore,
        });
        self.setState({
          homeworks: object,
        });
      });
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

    object.pop();

    self.setState({
      homeworks: object
    });
  };

  getInClass = () => {
    let object = [{}];

    let self = this;

    let colRef = firestore.collection("classes").doc(this.props.code).collection("inClass");

    colRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        object.unshift({
          id: doc.id,
          colRef: colRef.id,
          name: doc.data().name,
          maxScore: doc.data().maxScore,
        });
        self.setState({
          inclass: object,
        });
      });
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

    object.pop();

    self.setState({
      inclass: object
    });
  };

  /*getQuizzes = () => {
    let object = [{}];

    let self = this;

    let colRef = firestore.collection("classes").doc(this.props.code).collection("quizzes");

    colRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        object.unshift({
          id: doc.id,
          colRef: colRef.id,
          name: doc.data().name,
          maxScore: doc.data().maxScore
        });
        self.setState({

            students: object

          quizzes: object,

        });
      });
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

    object.pop();

    self.setState({
      quizzes: object
    });
  };*/

  getStudents = () => {
    let object = [];

    let self = this;

    let docRef = firestore.collection("classes").doc(this.props.code);

    docRef.get().then(function (doc) {
      if (doc.exists) {
        let data = doc.data();

        for (let i in data.students) {
          if (data.students.hasOwnProperty(i)) {
            let id = data.students[i];

            let studRef = firestore.collection("users").doc(id);

            studRef.get().then(function (studDoc) {
              let studData = studDoc.data();

              object.unshift({
                name: studData.firstName + " " + studData.lastName,
                email: studData.email,
                uid: id,
                grade: self.getGrade(id),
              });

              self.setState({
                students: object,
              }, () => {
                // TODO sort here maybe?
                self.getDashboardInfo();
              });
            });
          }
        }
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  };

  // custom sorting function for the graphs
  compareValues(key) {
    return function (a, b) {
      // check that input is valid
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key))
        return 0;

      let val1 = a[key];
      let val2 = b[key];

      let comparison = 0;

      if (val1 > val2)
        comparison = 1;
      else if (val1 < val2)
        comparison = -1;

      return comparison;
    };
  }

  showGraph = (uid) => {
    this.setState({
      graphVisible: true,
    });

    this.buildAssignmentGradesGraph(uid);
  };

  hideGraph = () => {
    this.setState({
      graphVisible: false,
    });
  };

  returnToDashboard = () => {
    this.setState({
      activeAss: null,
      page: "dashboard",
    });
  };

  goToAssignment = (assignment) => {
    this.setState({
      activeAss: assignment,
      page: "grading",
    })
  };

  getDashboardInfo = () => {
    let totalGrade = 0;

    for (let i in this.state.students) {
      if (this.state.students.hasOwnProperty(i))
        totalGrade += this.state.students[i].grade;
    }

    let avgGpa = totalGrade / this.state.students.length;

    let object;
    let passing = 0;
    let failing = 0;
    let temp = 0;
    let pfArr = [];
    let gpadArr = [];

    let toFour = 0;
    //let fourHead = "3.0+";
    let toThree = 0;
    //let threeHead = "2.0+";
    let toTwo = 0;
    //let twoHead = "1.0+";
    let toD = 0;
    //let oneHead = "0.0+";
    let toOne = 0;
    //let oneHead = "0.0+";

    for (let i in this.state.students) {
      let thisGpa = this.state.students[i].grade;

      if (thisGpa >= 89.5) {
        toFour++;
      } else if (thisGpa >= 79.5) {
        toThree++;
      } else if (thisGpa >= 69.5) {
        toTwo++;
      } else if (thisGpa >= 59.5) {
        toD++;
      }
      else {
        toOne++;
      }

      if (thisGpa < 59.5) {
        failing++;
      } else {
        passing++;
      }

      temp += thisGpa;
    }


    //let size = this.props.students.length;
    //temp = temp / size;
    //temp = Math.round(temp * 100) / 100;

    //FOR PASS FAIL
    object = {
      name : "Failing",
      value : failing
    };

    pfArr.unshift(object);

    object = {
      name : "Passing",
      value : passing
    };
    pfArr.unshift(object);
    //END OF PASS FAIL

    //FOR GPA DIS
    object = {
      name : "A",
      value : toFour
    };

    gpadArr.unshift(object);

    object = {
      name : "B",
      value : toThree
    };
    gpadArr.unshift(object);

    object = {
      name : "C",
      value : toTwo
    };

    gpadArr.unshift(object);

    object = {
      name : "D",
      value : toD
    };

    gpadArr.unshift(object);

    object = {
      name : "F",
      value : toOne
    };
    gpadArr.unshift(object);
    //END OF GPA DIS

    this.setState({
      avgGpa: avgGpa,//done
      passFail : pfArr,
      gpaDis : gpadArr
    });
  };

  render() {
    this.state.students.sort(this.compareValues("grade")).reverse();

    if (this.state.page === "dashboard") {
      return (
        <div>
          <Container fluid>

          </Container>
          <Container fluid >
            <Row>
              <Col className={"mainPage"}>
                <p>My Students</p>
              </Col>
            </Row>
            <Row>
              <Col className={"mainPage"}>
                <Row>
                  <Col className={"mainPage"}>
                    <h1>Dashboard</h1>
                  </Col>
                </Row>
                <Row className="chartAlign">
                  <Graphs gpaDis={this.state.gpaDis} passFail={this.state.passFail} avgGpa={this.state.avgGpa}/>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Col>
                  <div className="mainPage">
                    <h1>Students</h1>
                  </div>
                  <Row>
                    <Col>
                      {this.state.graphVisible
                        ?
                        <Row>
                          <Col xs={{size: 1, offset: 0}}>
                            <Button onClick={this.hideGraph}>
                              <i className="fas fa-arrow-left graphIcon"/>
                            </Button>
                          </Col>
                          <Col xs={12} className="graph">
                            <ResponsiveContainer width="100%" height={300}>
                              <BarChart data={this.state.assignmentGrades}
                                        margin={{top: 30, right: 30, left: 30, bottom: 30}}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip className="graph"/>
                                <Legend verticalAlign="top" height={36}/>
                                <Bar dataKey="grade" fill="#21CE99"/>
                                <Bar dataKey="average" fill="#bf8bff"/>
                                <Bar dataKey="median" fill="#f1cbff"/>
                              </BarChart>
                            </ResponsiveContainer>
                          </Col>
                          <Col>
                          </Col>
                        </Row>
                        :
                        <Table striped>
                          <thead>
                          <tr>
                            <th>Rank</th>
                            <th>Grade</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th/>
                          </tr>
                          </thead>

                          <StudList students={this.state.students} assignments={this.state.allAssignments} showGraph={this.showGraph}/>

                        </Table>
                      }
                    </Col>
                  </Row>
                </Col>
              </Col>
              <Col className="mainPage">
                <Col>
                  <h1>Homework</h1>
                  <HomeCards code={this.props.code} homeworks={this.state.homeworks} goToAssignment={this.goToAssignment}/>
                </Col>
                <Col>
                  <h1>In-Class Lessons</h1>
                  <InClassCards code={this.props.code} inclass={this.state.inclass} goToAssignment={this.goToAssignment}/>
                </Col>
              </Col>
            </Row>
          </Container>
        </div>
      )
    } else if (this.state.page === "grading") {
      return (
        <GradingPage code={this.props.code} assignment={this.state.activeAss} assCol={this.state.activeAss.colRef}
                     assKey={this.state.activeAss.id} returnToDashboard={this.returnToDashboard}/>
      )
    }
  }
}

export default MyStudents