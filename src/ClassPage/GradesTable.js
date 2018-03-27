import React, { Component } from 'react';
import {Table, Container, Row, Col, Label, Button, Input } from 'reactstrap';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, AreaChart, Area, ReferenceLine, ResponsiveContainer } from 'recharts';
import { firestore } from "../base";
import Modal from 'react-modal';
import './Table.css'
import './GradesTable.css'

class GradesTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: this.props.uid,
      code: this.props.code,

      gradeData: [],
      score: 0,
      max_score: 0,

      regrade_open: false,
      reason_input: "",
      submit_status: null,
      modal_assignment: {
        name: null,
        score: null,
        maxscore: null,
      },
      studentName: null,
      modal_index: null,
      doneLoading: false,
        
      hidden: true,

      myAssignments: [],  // all the user's assignments from this class
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


      classAverage: null,

      graphVisible: false,
    };
    
    let self = this;

    //Get data on grades
    let docRef = firestore.collection("users").doc(this.props.uid).collection("assignments").doc(this.props.code);
    docRef.get().then(function (doc) {

      self.setState({
        gradeData: doc.data().grades
      });

    }).then( function () {

      for(let i = 0; i < self.state.gradeData.length; i++){
        self.addScore(self.state.gradeData[i].score, self.state.gradeData[i].maxscore);
      }

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

    //Get students full name
    let studentRef = firestore.collection("users").doc(this.props.uid);
    studentRef.get().then(function (doc) {
      self.setState({ studentName: GradesTable.getFullName(doc.data().firstName, doc.data().lastName)})
    }).then(function (){
      self.setState({ doneLoading: true });
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
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
          classAssignments: self.state.classAssignments.concat({data: doc.data()}),
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

  //Modal handling
  openRegradeModal = (index) => {
    let self = this;
    self.setState({
      modal_assignment: this.state.gradeData[index],
      modal_index: index,
      regrade_open: true,
    });
  };

  closeRegradeModal = () => {
    let self = this;
    self.setState({
      modal_assignment: {
        name: null,
        score: null,
        maxscore: null,
      },
      modal_index: null,
      regrade_open: false,
      submit_status: "closed",
      reason_input: "",
    });
  };

  updateReasonValue = (evt) => {
    let self = this;
    self.setState({ reason_input: evt.target.value });
  };

  //Gets students full name
  static getFullName(first, last){
    return first + " " + last;
  };

  //Regrade request handling
  onRegradeSubmit = () => {
    let self = this;
    self.setState({submit_status: "writing"});

    let request = {
      name: this.state.modal_assignment.name,
      maxscore: this.state.modal_assignment.maxscore,
      reason: this.state.reason_input,
      score: this.state.modal_assignment.score,
      student: this.state.studentName,
      studentCode: this.props.uid,
    }

    //Get student's assignment list for updating regrade_status
    let docRef = firestore.collection("users").doc(this.props.uid).collection("assignments").doc(this.props.code);
    docRef.get().then(function () {

      let assignment = self.state.gradeData[self.state.modal_index];
      assignment.regrade_status = "pending";

      docRef.update({
        grades: self.state.gradeData,
      }).catch(function (error) {
        console.log("Error updating document:", error);
      });

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

    //Get class reference for updating all pending requests
    let classRef = firestore.collection("classes").doc(this.props.code);
    classRef.get().then(function (doc) {

      let allRequests = doc.data().regrades;

      if (allRequests != null) {
        allRequests.push(request);
      } else {
        allRequests = request;
      }

      classRef.update({
        regrades: allRequests
      }).then(function () {

        self.setState({
          submit_status: "submitted",
        });

      }).catch(function (error) {
        console.log("Error updating document: ", error);
      });
    });
  };

  getAssignmentsOfType = (uid, type, all) => {
    let self = this;

    firestore.collection("users").doc(uid).collection(type).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if (!all) {
          if (doc.data().class === self.state.code) {
              self.setState({
                myAssignments: self.state.myAssignments.concat({data: doc.data(), uid: uid}),
              });

              if (doc.data().score != null) {
                self.setState({
                  hidden: false,
                });
              }
            }
        } else {
          if (doc.data().class === self.state.code && doc.data().score != null) {
            self.setState({
              allAssignments: self.state.allAssignments.concat({data: doc.data(), uid: uid}),
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

            self.getClassAverage();
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

  // get average overall grade in a class
  getClassAverage = () => {
    let tmpClassOverallGrades = [];
    let totalGrade = 0;
    let numStudents = 0;

    for (let i in this.state.students) {
      if (this.state.students.hasOwnProperty(i)) {
        let grade = this.getGrade(this.state.students[i]);

        if (!isNaN(grade)) {
          tmpClassOverallGrades.push(grade);
          totalGrade += grade;
          numStudents++;
        }
      }
    }

    let classAverage = totalGrade / numStudents;

    if (classAverage % 1 !== 0)
      classAverage = Math.round(classAverage * 100) / 100;

    this.setState({
      classOverallGrades: tmpClassOverallGrades,
      classAverage: classAverage,
    });

    return classAverage;
  };

  getRank = (uid) => {
    let classGrades = this.state.classOverallGrades;

    if (classGrades === undefined || classGrades.length === 0)
      return "--";

    classGrades.sort().reverse();

    let studentGrade = this.getGrade(uid);
    return classGrades.indexOf(studentGrade) + 1;
  };

  // get user's assignment from class list of assignments
  getMyAssignment = (assignment) => {
    for (let i in this.state.myAssignments) {
      if (this.state.myAssignments.hasOwnProperty(i)) {
        if (this.state.myAssignments[i].data.name === assignment.data.name)
          return this.state.myAssignments[i];
      }
    }
  };

  getPercentage = (score, max) => {
    let grade = (score / max) * 100;

    if (grade % 1 !== 0)
      grade = Math.round(grade * 100) / 100;

    if (!isNaN(grade))
      return grade;
    else
      return "--";
  };

  // build data for graph of classroom scores on a particular assignment
  buildClassScoresGraph = (assignment) => {
    let tmpClassScores = [];

    for (let i in this.state.allAssignments) {
      if (this.state.allAssignments.hasOwnProperty(i)) {
        if (this.state.allAssignments[i].data.name === assignment.data.name)
          tmpClassScores = tmpClassScores.concat({score: this.state.allAssignments[i].data.score});
      }
    }

    this.setState({
      classScores: tmpClassScores,
    });
  };

  // build data for assignmentComp
  buildBenchmarkGraph = (classAssignment) => {
    let assignment = this.getMyAssignment(classAssignment);

    let name = assignment.data.name;
    let score = assignment.data.score;
    let avg = this.getAverageScore(classAssignment, false);
    let med = this.getMedianScore(classAssignment, false);
    let max = assignment.data.maxscore;

    this.setState({
      assignmentComp: [].concat({name: name, score: score, average: avg, median: med, max: max}),
    });
  };

  // build data for assignmentScores
  buildAssignmentScoresGraph = () => {
    let tmpAssignmentScores = [];

    for (let i in this.state.classAssignments) {
      if (this.state.classAssignments.hasOwnProperty(i)) {
        let assignment = this.getMyAssignment(this.state.classAssignments[i]);

        if (assignment.data.score != null) {
          let name = assignment.data.name;
          let score = assignment.data.score;
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
        let assignment = this.getMyAssignment(this.state.classAssignments[i]);

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
  };
    
  //Function for calculating total score
  addScore = (score, maxscore) => {
    let self = this;
    let sc = +self.state.score;
    let m_sc = +self.state.max_score;

    sc += +score;
    m_sc += +maxscore;

    self.setState({
      score: sc,
      max_score: m_sc,
    });
  };

  getModalContent() {
    switch(this.state.submit_status){

      case "writing":
        return (
          <Modal
            className={"modalStyle"}
            onRequestClose={this.closeRegradeModal}
            isOpen={this.state.regrade_open}
            ariaHideApp={false}>
            <h2 className={"homeworkTitle"}>
              Submitting request...
            </h2>
          </Modal>
        );

      case "submitted":
        return (
          <Modal
            className={"modalStyle"}
            onRequestClose={this.closeRegradeModal}
            isOpen={this.state.regrade_open}
            ariaHideApp={false}>
            <h2 className={"homeworkTitle"}>
              Successfully submitted request!
            </h2>
            <div/>
            <h4 className={"homeworkTitle"}>Your request is pending instructor review.</h4>
            <div/>
            <Button type="text" className="submitButton" size="lg" onClick={this.closeRegradeModal}>Return to Assignments</Button>
          </Modal>
        );

      default:
        return (
          <Modal
            className={"modalStyle"}
            onRequestClose={this.closeRegradeModal}
            isOpen={this.state.regrade_open}
            ariaHideApp={false}>

            <h2 className={"homeworkTitle"}>
              Request Regrade
            </h2>
            <h2>Assignment: {this.state.modal_assignment.name}</h2>
            <h2>Score: {this.state.modal_assignment.score}/{this.state.modal_assignment.maxscore}</h2>

            <div className={"makeSpace"}/>

            <h2>Reason for Regrade:</h2>
            <Input className={"modalInput"} type={"text"} value={this.state.reason_input} onChange={this.updateReasonValue}/>

            <div className={"makeSpace"}/>

            <Button type="text" className="submitButton" size="lg" onClick={this.onRegradeSubmit}>Submit Request</Button>
          </Modal>
        );
    }
  }

  getButton(index, clickBind){
    let buttonText = "Request Regrade";
    let regrade_status = this.state.gradeData[index].regrade_status;
    if(regrade_status != null){
      clickBind = null;
      switch(regrade_status){
        case "pending":
          buttonText = "Regrade Pending";
          break;
        case "accepted":
          buttonText = "Regrade Accepted";
          break;
        case "declined":
          buttonText = "Regrade Declined";
          break;
        default:
          break;
      }
    }

    return (
      <Button onClick={clickBind}
              style={{backgroundColor: 'white', color: '#21CE99'}}>
        {buttonText}
      </Button>
    );
  }
    
  hideGraph = () => {
    this.setState({
      graphVisible: false,
    });
  };

  showGraph = (index) => {
    this.setState({
      myScore: this.getMyAssignment(this.state.classAssignments[index]).data.score,
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
          <div>
            <Row>
              <Col xs={{size: 1, offset: 0}}>
                <Button onClick={this.hideGraph}>
                  <i className="fas fa-arrow-left graphIcon"/>
                </Button>
              </Col>
            </Row>
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
                    <Bar dataKey="score" fill="#21CE99" />
                    <Bar dataKey="average" fill="#bf8bff" />
                    <Bar dataKey="median" fill="#f1cbff" />
                    <Bar dataKey="max" fill="#b967ff" />
                  </BarChart>
                </ResponsiveContainer>
              </Col>
            </Row>
          </div>
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
                  <Table striped>
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
                    {Object.keys(this.state.myAssignments).map((key, index) => {
                      let boundButtonClick = this.openRegradeModal.bind(this, index);
                      return <tr key={key}>
                        <td>{this.state.myAssignments[index].data.name}</td>
                        <td>{this.state.myAssignments[index].data.score != null ? this.state.myAssignments[index].data.score : "--"}</td>
                        <td>{this.state.myAssignments[index].data.maxscore}</td>
                        <td>{this.getPercentage(this.state.myAssignments[index].data.score, this.state.myAssignments[index].data.maxscore)}</td>
                        <td>{this.getAverageScore(this.state.classAssignments[index], true)}</td>
                        <td>{this.getMedianScore(this.state.classAssignments[index], true)}</td>
                        <td>
                          <span style={this.state.myAssignments[index].data.score != null ? {} : {display: "none"}}
                                onClick={() => this.showGraph(index)}>
                            <i className="fas fa-chart-bar graphIcon"/>
                          </span>
                        </td>
                        <td>
                          {this.getButton(index, boundButtonClick)}
                        </td>
                      </tr>
                    })
                    }
                    </tbody>
                  </Table>
                </Col>
              </Row>
                        
              <Row>
                <Col>
                  {this.getModalContent()}
                </Col>
              </Row>
                        
              <Col>
              <Row className="total" hidden={this.state.hidden}>Total Grade: {this.getGrade(this.state.uid)}</Row>
              <Row className="rank" hidden={this.state.hidden}>Class Average: {this.state.classAverage}</Row>
              <Row className="rank" hidden={this.state.hidden}>Rank: {this.getRank(this.state.uid)}</Row>
              <br/>

              </Col>
              <Row hidden={this.state.hidden}>
                <Col xs={{size: 5, offset: 1}}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={this.state.assignmentScores}
                              margin={{top: 30, right: 30, left: 30, bottom: 30}}>
                      <XAxis dataKey="name"/>
                      <YAxis/>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <Tooltip/>
                      <Legend verticalAlign="top" height={36}/>
                      <Bar dataKey="score" fill="#21CE99" />
                      <Bar dataKey="average" fill="#bf8bff" />
                      <Bar dataKey="median" fill="#f1cbff" />
                    </BarChart>
                  </ResponsiveContainer>
                </Col>

                <Col xs={{size: 5}}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={this.state.assignmentGrades}
                              margin={{top: 30, right: 30, left: 30, bottom: 30}}>
                      <XAxis dataKey="name"/>
                      <YAxis/>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <Tooltip/>
                      <Legend verticalAlign="top" height={36}/>
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