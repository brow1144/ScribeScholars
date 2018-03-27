import React, {Component} from 'react';
import {Container, Row, Col, Table, Button} from 'reactstrap';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ReferenceLine,
  ResponsiveContainer
} from 'recharts';

import './MyStudents.css';
import Graphs from '../Dashboard/Dashboard';
import StudList from '../Dashboard/StudList'
import HomeCards from '../Dashboard/HomeCards'
import InClassCards from '../Dashboard/InClassCards'
import QuizCards from '../Dashboard/QuizCards'
import {firestore} from "../base";


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
        max: null
      }],

      inclass: [{
        id: null,
        name: null,
        max: null
      }],

      quizzes: [{
        id: null,
        name: null,
        max: null
      }],

      uid: this.props.uid,
      code: this.props.code,

      doneLoading: false,

      myAssignments: [],  // all the user's assignments from this class
      myScore: null,  // user's score on current assignment

      classAssignments: [],   // assignments in the class
      studentsList: [],   // all students in the class
      allAssignments: [],   // all assignments from every student

      classOverallGrades: [],   // class overall grades
      assignmentGrades: [],   // individual grades for each assignment


      classAverage: null,

      graphVisible: false,
    }

  }

  // get assignments and students for a particular class
  getClassInfo = () => {
    let self = this;
    let classRef = firestore.collection("classes").doc(this.state.code);

    classRef.get().then((doc) => {
      if (doc.exists) {
        if (doc.data().students != null) {
          self.setState({
            studentsList: doc.data().students,
          });
        }

        self.getClassAssignmentsOfType("homework");
        self.getClassAssignmentsOfType("quizzes");
        self.getClassAssignmentsOfType("tests");
        self.getClassAssignmentsOfType("inClass");

        self.getAllAssignments();
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
          classAssignments: self.state.classAssignments.concat({data: doc.data()}),
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
            allAssignments: self.state.allAssignments.concat({data: doc.data(), uid: uid}),
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
        self.getAssignmentsOfType(self.state.studentsList[i], "quizzes");
        self.getAssignmentsOfType(self.state.studentsList[i], "tests");
        self.getAssignmentsOfType(self.state.studentsList[i], "inClass");

        let studentRef = firestore.collection("users").doc(this.state.studentsList[i]);
        studentRef.get().then(() => {
          if (parseInt(i, 10) === self.state.studentsList.length - 1) {
            self.getStudents();
          }
        }).catch(function (error) {
          console.log("Error getting document:", error);
        });
      }
    }
  };

  // get overall grade in class
  getGrade = (uid) => {
    let total = 0;
    let max = 0;

    for (let i in this.state.allAssignments) {
      if (this.state.allAssignments.hasOwnProperty(i)) {
        if (this.state.allAssignments[i].uid === uid && this.state.allAssignments[i].data.score != null) {
          total += this.state.allAssignments[i].data.score;
          max += this.state.allAssignments[i].data.maxscore;
        }
      }
    }

    let grade = (total / max) * 100;

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

        if (assignment.data.score != null) {
          let name = assignment.data.name;
          let grade = (assignment.data.score / assignment.data.maxscore) * 100;
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
      let grade = ((total / numStudents) / assignment.data.maxscore) * 100;

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
      let grade = (median / assignment.data.maxscore) * 100;

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

  componentWillMount() {
    this.getClassInfo();
    this.getHomeworks();
    this.getInClass();
    this.getQuizzes();
  };

  getHomeworks = () => {

    let object = [{}];

    let self = this;


    let colRef = firestore.collection("classes").doc(this.props.code)
      .collection("homework");

    colRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots

        object.unshift({
          id: doc.id,
          colRef: colRef.id,
          name: doc.data().name,
          //max: doc.data().questions.length TODO
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


    let colRef = firestore.collection("classes").doc(this.props.code)
      .collection("inClass");

    colRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots

        object.unshift({
          id: doc.id,
          colRef: colRef.id,
          name: doc.data().name,
          //max: doc.data().questions.length  TODO
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

  getQuizzes = () => {

    let object = [{}];

    let self = this;


    let colRef = firestore.collection("classes").doc(this.props.code)
      .collection("quizzes");

    colRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots

        object.unshift({
          id: doc.id,
          colRef: colRef.id,
          name: doc.data().name,
          //max: doc.data().questions.length  TODO
        });
        self.setState({
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

  };

  getStudents = () => {

    let object = [{}];

    let self = this;


    let docRef = firestore.collection("classes").doc(this.props.code);

    docRef.get().then(function (doc) {
      if (doc.exists) {
        let data = doc.data();
        for (let i in data.students) {

          if (data.students.hasOwnProperty(i)) {
            let id = data.students[i];
            let studRef = firestore.collection("users").doc(id);

            studRef.get().then(function (doc) {
              let data = doc.data();

              if (isNaN(data.gpa)) {
                console.log(data.firstName + " did not have a valid GPA.");
                object.unshift({
                  name: data.firstName + " " + data.lastName,
                  email: data.email,
                  uid: id,
                  gpa: 0,
                  grade: self.getGrade(id),
                });
              } else {
                object.unshift({
                  name: data.firstName + " " + data.lastName,
                  email: data.email,
                  uid: id,
                  gpa: data.gpa,
                  grade: self.getGrade(id),
                });
              }

              self.setState({
                students: object,
              }, () => {
                // TODO sort here
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

    object.pop();

    self.setState({
      students: object
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


  render() {
    this.state.students.sort(this.compareValues("grade")).reverse();

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
                <Graphs lessonNumber={this.props.lessonNumber} code={this.props.code}/>
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
                          <th>GPA</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th/>
                        </tr>
                        </thead>

                        <StudList students={this.state.students} showGraph={this.showGraph}/>

                      </Table>
                    }
                  </Col>
                </Row>
              </Col>
            </Col>
            <Col className="mainPage">
              <Col>
                <h1>Homework</h1>
                <HomeCards code={this.props.code} homeworks={this.state.homeworks}/>
              </Col>
              <Col>
                <h1>In-Class Lessons</h1>
                <InClassCards code={this.props.code} inclass={this.state.inclass}/>
              </Col>
              <Col>
                <h1>Quizzes</h1>
                <QuizCards code={this.props.code} quizzes={this.state.quizzes}/>
              </Col>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default MyStudents