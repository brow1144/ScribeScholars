import React, { Component } from 'react';
import {Table, Container, Row, Col, Label } from 'reactstrap';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, AreaChart, Area, ReferenceLine, ResponsiveContainer } from 'recharts';
import { firestore } from "../base";
import { NavLink as RouterLink } from 'react-router-dom'
import './Table.css'

class GradesTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: this.props.uid,
      code: this.props.code,

      doneLoading: false,

      myAssignments: [],  // all assignments from all the user's classes TODO GPA page
      myScore: null,  // user's score on current assignment

      classAssignments: [],   // assignments in the class
      students: [],   // all students in the class
      allAssignments: [],   // all assignments from every student

      yourGrades: [
        {name: 'HW 1', grade: 80, avg: 84, med: 80},
        {name: 'HW 2', grade: 74, avg: 84, med: 82},
        {name: 'HW 3', grade: 93, avg: 65, med: 66},
        {name: 'Quiz 1', grade: 98, avg: 75, med: 83},
        {name: 'Exam 1', grade: 23, avg: 90, med: 85},
        {name: 'HW 4', grade: 53, avg: 43, med: 50},
        {name: 'Quiz 2', grade: 76, avg: 46, med: 55},
      ],

      classScores: [],  // class scores for an individual assignment
      assignmentComp: [],   // user's score, average, and median
      classOverallGrades: [],   // class overall grades
      assignmentScores: [],   // individual scores for each assignment
      assignmentGrades: [],   // individual grades for each assignment

      myAssignmentsInClass: [],   // all scores that are yours

      graphVisible: false,
    };
  }

  componentWillMount() {
    this.getClassInfo();
  };

  // get assignments and students for a particular class
  getClassInfo = () => {
    let self = this;
    let classRef = firestore.collection("classes").doc(this.state.code);

    classRef.get().then((doc) => {
      if (doc.exists) {
        if (doc.data().students != null) {
          self.setState({
            students: doc.data().students,
          });
        }

        self.getClassAssignmentsOfType("homework");
        self.getClassAssignmentsOfType("quizzes");
        self.getClassAssignmentsOfType("tests");
        self.getClassAssignmentsOfType("inClass");

        self.getMyAssignments();
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
          classAssignments: self.state.classAssignments.concat(doc.data()),
        });
      });
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  // get all assignments for a student (GPA)
  getMyAssignments = () => {
    let self = this;
    let studentRef = firestore.collection("users").doc(this.state.uid);

    studentRef.get().then((doc) => {
      if (doc.exists) {
        self.getAssignmentsOfType(this.state.uid, "homework", false);
        self.getAssignmentsOfType(this.state.uid, "quizzes", false);
        self.getAssignmentsOfType(this.state.uid, "tests", false);
        self.getAssignmentsOfType(this.state.uid, "inClass", false);

        self.getAllAssignments();
      }
    }).catch((error) => {
      console.log("Error getting document: ", error);
    });
  };

  getAssignmentsOfType = (uid, type, all) => {
    let self = this;

    firestore.collection("users").doc(uid).collection(type).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if (!all) {
          if (doc.data().score != null) {
            self.setState({
              myAssignments: self.state.myAssignments.concat(doc.data()),
            });

            if (doc.data().code === self.state.code && doc.data().score != null) {
              self.setState({
                myAssignmentsInClass: self.state.myAssignmentsInClass.concat(doc.data()),
              });
            }
          }
        } else {
          if (doc.data().code === self.state.code && doc.data().score != null) {
            self.setState({
              allAssignments: self.state.allAssignments.concat(doc.data()),
            });
          }
        }
      });
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  getAllAssignments = () => {
    let self = this;

    for (let i in this.state.students) {
      if (this.state.students.hasOwnProperty(i)) {
        self.getAssignmentsOfType(self.state.students[i], "homework", true);
        self.getAssignmentsOfType(self.state.students[i], "quizzes", true);
        self.getAssignmentsOfType(self.state.students[i], "tests", true);
        self.getAssignmentsOfType(self.state.students[i], "inClass", true);

        let studentRef = firestore.collection("users").doc(this.state.students[i]);
        studentRef.get().then(() => {
          if (parseInt(i, 10) === self.state.students.length - 1) {
            self.setState({ doneLoading: true });

            self.buildAssignmentScoresGraph();
            self.buildAssignmentGradesGraph();
          }
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
      }
    }
  };

// calculate average score for an assignment
  getAverageScore = (assignment, percentage) => {
    let total = 0;
    let numStudents = 0;

    for (let i in this.state.allAssignments) {
      if (this.state.allAssignments.hasOwnProperty(i)) {
        if (this.state.allAssignments[i].name === assignment.name) {
          total += this.state.allAssignments[i].score;
          numStudents++;
        }
      }
    }

    if (percentage) {   // return score as a percentage
      let grade = ((total / numStudents) / assignment.maxscore) * 100;

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
        if (this.state.allAssignments[i].name === assignment.name)
          tmpScores = tmpScores.concat(this.state.allAssignments[i].score);
      }
    }

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
      let grade = (median / assignment.maxscore) * 100;

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

  // get average grade in a class
  getClassAverage = () => {
    let classGrades = [];
    let total = 0;
    let max = 0;

    for (let i in this.state.allAssignments) {
      if (this.state.allAssignments.hasOwnProperty(i)) {
        let grade = this.getGrade(this.state.code);
        classGrades.push(grade);

        this.setState({
          classOverallGrades: this.state.classOverallGrades.concat({grade: grade}),
        });

        total += grade;
        max += 100;
      }
    }

    let grade = (total / max) * 100;

    if (grade % 1 !== 0)
      grade = Math.round(grade * 100) / 100;

    return grade;
  };

  // get student's assignment from class list of assignments
  getStudentAssignment = (assignment) => {
    for (let i in this.state.myAssignments) {
      if (this.state.myAssignments.hasOwnProperty(i)) {
        if (this.state.myAssignments[i].name === assignment.name && this.state.myAssignments[i].code === assignment.code)
          return this.state.myAssignments[i];
      }
    }
  };

  calcRank = () => {
    let classGrades = [];

    for (let i in this.state.allAssignments) {
      if (this.state.allAssignments.hasOwnProperty(i)) {
        classGrades.push(this.getGrade(this.state.code));
      }
    }

    classGrades.sort();
    // TODO fix
  };

  getPercentage = (score, max) => {
    let grade = (score / max) * 100;

    if (grade % 1 !== 0)
      grade = Math.round(grade * 100) / 100;

    return grade;
  };

  // build data for graph of classroom scores on a particular assignment
  buildClassScoresGraph = (assignment) => {
    let tmpClassScores = [];

    for (let i in this.state.allAssignments) {
      if (this.state.allAssignments.hasOwnProperty(i)) {
        if (this.state.allAssignments[i].name === assignment.name)
          tmpClassScores = tmpClassScores.concat({score: this.state.allAssignments[i].score});
      }
    }

    this.setState({
      classScores: tmpClassScores,
    });
  };

  // build data for assignmentComp
  buildBenchmarkGraph = (classAssignment) => {
    let assignment = this.getStudentAssignment(classAssignment);

    let name = assignment.name;
    let score = assignment.score;
    let avg = this.getAverageScore(classAssignment, false);
    let med = this.getMedianScore(classAssignment, false);

    this.setState({
      assignmentComp: [].concat({name: name, score: score, average: avg, median: med}),
    });
  };

  // build data for assignmentScores
  buildAssignmentScoresGraph = () => {
    let tmpAssignmentScores = [];

    for (let i in this.state.classAssignments) {
      if (this.state.classAssignments.hasOwnProperty(i)) {
        let assignment = this.getStudentAssignment(this.state.classAssignments[i]);

        if (assignment.score != null) {
          let name = assignment.name;
          let score = assignment.score;
          let avg = this.getAverageScore(this.state.classAssignments[i], false);
          let med = this.getMedianScore(this.state.classAssignments[i], false);

          tmpAssignmentScores = tmpAssignmentScores.concat({name: name, score: score, average: avg, median: med});
        }
      }
    }

    this.setState({
      assignmentScores: tmpAssignmentScores,
    });
  };

  // build data for assignmentGrades
  buildAssignmentGradesGraph = () => {
    let tmpAssignmentGrades = [];

    for (let i in this.state.classAssignments) {
      if (this.state.classAssignments.hasOwnProperty(i)) {
        let assignment = this.getStudentAssignment(this.state.classAssignments[i]);

        if (assignment.score != null) {
          let name = assignment.name;
          let grade = (assignment.score / assignment.maxscore) * 100;
          let avg = this.getAverageScore(this.state.classAssignments[i], true);
          let med = this.getMedianScore(this.state.classAssignments[i], true);

          tmpAssignmentGrades = tmpAssignmentGrades.concat({name: name, grade: grade, average: avg, median: med});
        }
      }
    }

    this.setState({
      assignmentGrades: tmpAssignmentGrades,
    });
  };

  // custom sorting function for the graphs
  compareValues(key) {
    return function(a, b) {
      // check that input is valid
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key))
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

  showGraph = (index) => {
    this.setState({
      myScore: this.getStudentAssignment(this.state.classAssignments[index]).score,
      graphVisible: true,
    });

    this.buildClassScoresGraph(this.state.classAssignments[index]);
    this.buildBenchmarkGraph(this.state.classAssignments[index]);
  };

  render() {
    if (!this.state.doneLoading) {
      return (
        <div>
          <Label>
            LOADING
          </Label>
        </div>
        )
    } else {
      if (this.state.graphVisible) {
        this.state.classScores.sort(this.compareValues("score"));
        let pos = this.state.classScores.map((e) => {return e.score;}).indexOf(this.state.myScore);

        return (
          <Row>
            <Col xs={8}>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={this.state.classScores}
                           margin={{top: 30, right: 30, left: 30, bottom: 30}}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis/>
                  <YAxis/>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <Tooltip/>
                  <ReferenceLine x={pos} stroke="green" label={{value: "You", position: "top"}}/>
                  <Area type="monotone" dataKey="score" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)"/>
                </AreaChart>
              </ResponsiveContainer>
            </Col>

            <Col xs={3}>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={this.state.assignmentComp}
                          margin={{top: 30, right: 30, left: 30, bottom: 30}}>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <Tooltip/>
                  <Legend/>
                  <Bar dataKey="score" fill="#21CE99" />
                  <Bar dataKey="average" fill="#bf8bff" />
                  <Bar dataKey="median" fill="#f1cbff" />
                </BarChart>
              </ResponsiveContainer>
            </Col>
          </Row>
        )
      } else {
        return (
          <div>
            <Container fluid>
              <Row>
                <Col className={"makeSpace"}>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className={"homeworkTitle"}>Grades</p>
                </Col>
              </Row>
              <Row>
                <Col className={"makeSpace"}>
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <Table>
                    <thead>
                    <tr>
                      <th>Assignment</th>
                      <th>Score</th>
                      <th>Max Score</th>
                      <th>Percentage</th>
                      <th>Average</th>
                      <th>Median</th>
                      <th/>
                      <th>Request Regrade</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(this.state.myAssignmentsInClass).map((key, index) => {
                      return <tr key={key}>
                        <td>{this.state.myAssignmentsInClass[index].name}</td>
                        <td>{this.state.myAssignmentsInClass[index].score}</td>
                        <td>{this.state.myAssignmentsInClass[index].maxscore}</td>
                        <td>{this.getPercentage(this.state.myAssignmentsInClass[index].score, this.state.myAssignmentsInClass[index].maxscore)}</td>
                        <td>{this.getAverageScore(this.state.classAssignments[index], true)}</td>
                        <td>{this.getMedianScore(this.state.classAssignments[index], true)}</td>
                        <td>
                          <span onClick={() => this.showGraph(index)} className="showGraphsButton">
                            <i className="fas fa-chart-bar picIcon"/>
                          </span>
                        </td>
                        <td>
                          <RouterLink to={`practiceQuestion`}>
                            Link
                          </RouterLink>
                        </td>
                      </tr>
                    })
                    }
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col sm="12" md="5">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={this.state.assignmentScores}
                              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                      <XAxis dataKey="name"/>
                      <YAxis/>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <Tooltip/>
                      <Legend/>
                      <Bar dataKey="score" fill="#21CE99" />
                      <Bar dataKey="average" fill="#bf8bff" />
                      <Bar dataKey="median" fill="#f1cbff" />
                    </BarChart>
                  </ResponsiveContainer>
                </Col>

                <Col sm="12" md="5">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={this.state.assignmentGrades}
                              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                      <XAxis dataKey="name"/>
                      <YAxis/>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <Tooltip/>
                      <Legend/>
                      <Bar dataKey="grade" fill="#21CE99" />
                      <Bar dataKey="average" fill="#bf8bff" />
                      <Bar dataKey="median" fill="#f1cbff" />
                    </BarChart>
                  </ResponsiveContainer>
                </Col>
              </Row>
              <Row>
                <Col className={"moreSpace"}>
                </Col>
              </Row>
            </Container>
          </div>
        )
      }
    }
  }
}

export default GradesTable