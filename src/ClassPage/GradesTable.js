import React, { Component } from 'react';
import {Table, Container, Row, Col, Label, Button, Input } from 'reactstrap';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, AreaChart, Area, ReferenceLine,
  ResponsiveContainer, Pie, PieChart, Cell } from 'recharts';
import { firestore } from "../base";
import Modal from 'react-modal';
import './GradesTable.css'

class GradesTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: this.props.uid,
      code: this.props.code,

      doneLoading: false,
      hidden: true,

      myAssignments: [],  // all the user's assignments from this class
      myScore: null,  // user's score on current assignment

      classAssignments: [],   // assignments in the class
      students: [],   // all students in the class
      allAssignments: [],   // all assignments from every student
      inClassWeight: null,
      homeworkWeight: null,

      classScores: [],  // class scores for an individual assignment
      assignmentComp: [],   // user's score, average, and median
      classOverallGrades: [],   // class overall grades
      assignmentScores: [],   // individual scores for each assignment
      assignmentGrades: [],   // individual grades for each assignment
      classDist: [],  // weighting of different assignment categories
      pointDist: [],  // distribution of points in the class
      weightedDist: [],   // weighted distribution of points in the class
      maxPointDist: [],   // distribution of total points in the class
      weightedMaxDist: [],  // weighted distribution of total points in the class

      classAverage: null,

      graphVisible: false,

      modal_assignment: null,
      modal_index : null,
      modal_assignment_type: null,
      modal_assignment_code: null,
      regrade_open: false,
      reason_input: "",
      submit_status: null,

      studentName: null,
    };
  }

  componentWillMount() {
    this.setFullName();
    this.getClassInfo();
  }

  // get assignments and students for a particular class
  getClassInfo = () => {
    let self = this;
    let classRef = firestore.collection("classes").doc(this.props.code);

    classRef.get().then((doc) => {
      if (doc.exists) {
        if (doc.data().students != null) {
          self.setState({
            students: doc.data().students,
            inClassWeight: doc.data().inClassWeight / 100,
            homeworkWeight: doc.data().homeworkWeight / 100,
          });
        }

        self.getClassAssignmentsOfType("homework");
        //self.getClassAssignmentsOfType("quizzes");
        //self.getClassAssignmentsOfType("tests");
        self.getClassAssignmentsOfType("inClass");

        self.getMyAssignments();
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  getClassAssignmentsOfType = (type) => {
    let self = this;

    firestore.collection("classes").doc(this.props.code).collection(type).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        self.setState({
          classAssignments: self.state.classAssignments.concat({data: doc.data(), type: type, assignment_code: doc.id}),
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
        //self.getAssignmentsOfType(this.state.uid, "quizzes", false);
        //self.getAssignmentsOfType(this.state.uid, "tests", false);
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
          if (doc.data().class === self.state.code) {
            self.setState({
              myAssignments: self.state.myAssignments.concat({data: doc.data(), uid: uid, type: type, assignment_code: doc.id}),
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
              allAssignments: self.state.allAssignments.concat({data: doc.data(), uid: uid, type: type, assignment_code: doc.id}),
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
        //self.getAssignmentsOfType(self.state.students[i], "quizzes", true);
        //self.getAssignmentsOfType(self.state.students[i], "tests", true);
        self.getAssignmentsOfType(self.state.students[i], "inClass", true);

        let studentRef = firestore.collection("users").doc(this.state.students[i]);
        studentRef.get().then(() => {
          if (parseInt(i, 10) === self.state.students.length - 1) {
            self.setState({ doneLoading: true });

            self.getClassAverage();
            self.buildAssignmentScoresGraph();
            self.buildAssignmentGradesGraph();
            self.buildPointDistGraphs();
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
    let max = assignment.data.maxScore;

    this.setState({
      assignmentComp: [].concat({name: name, score: score, average: avg, median: med, max: max}),
    });
  };

  // build data for pointDists
  buildPointDistGraphs = () => {
    let tmpClassDist = [];
    let tmpPointDist = [];
    let tmpMaxPointDist = [];
    let tmpWeightedDist = [];
    let tmpWeightedMaxDist = [];

    for (let i in this.state.myAssignments) {
      if (this.state.myAssignments.hasOwnProperty(i)) {
        if (this.state.myAssignments[i].data.score != null) {
          let name = this.state.myAssignments[i].data.name;
          let score = this.state.myAssignments[i].data.score;
          let maxScore = this.state.myAssignments[i].data.maxScore;

          if (this.state.myAssignments[i].type === "inClass") {
            tmpPointDist.push({name: name, points: score, color: "#21CE99"});
            tmpMaxPointDist.push({name: name, points: maxScore, color: "#21CE99"});

            // calculate weighted scores
            let weighted = score * this.state.inClassWeight;
            let weightedMax = maxScore * this.state.inClassWeight;

            // round if necessary
            if (weighted % 1 !== 0)
              weighted = Math.round(weighted * 100) / 100;
            if (weightedMax % 1 !== 0)
              weightedMax = Math.round(weightedMax * 100) / 100;

            tmpWeightedDist.push({name: name, points: weighted, color: "#21CE99"});
            tmpWeightedMaxDist.push({name: name, points: weightedMax, color: "#21CE99"});
          } else if (this.state.myAssignments[i].type === "homework") {
            tmpPointDist.push({name: name, points: score, color: "#f1cbff"});
            tmpMaxPointDist.push({name: name, points: maxScore, color: "#f1cbff"});

            // calculate weighted scores
            let weighted = score * this.state.homeworkWeight;
            let weightedMax = maxScore * this.state.homeworkWeight;

            // round if necessary
            if (weighted % 1 !== 0)
              weighted = Math.round(weighted * 100) / 100;
            if (weightedMax % 1 !== 0)
              weightedMax = Math.round(weightedMax * 100) / 100;

            tmpWeightedDist.push({name: name, points: weighted, color: "#bf8bff"});
            tmpWeightedMaxDist.push({name: name, points: weightedMax, color: "#bf8bff"});
          }
        }
      }
    }

    tmpClassDist.push({name: "Lessons", percentage: this.state.inClassWeight * 100, color: "#21CE99"});
    tmpClassDist.push({name: "Homework", percentage: this.state.homeworkWeight * 100, color: "#bf8bff"});

    this.setState({
      classDist: tmpClassDist,
      pointDist: tmpPointDist,
      maxPointDist: tmpMaxPointDist,
      weightedDist: tmpWeightedDist,
      weightedMaxDist: tmpWeightedMaxDist,
    });
  };

  // build data for assignmentScores
  buildAssignmentScoresGraph = () => {
    let tmpAssignmentScores = [];

    for (let i in this.state.classAssignments) {
      if (this.state.classAssignments.hasOwnProperty(i)) {
        let assignment = this.getMyAssignment(this.state.classAssignments[i]);

        if (assignment != null && assignment.data.score != null) {
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

  //Modal handling
  openRegradeModal = (index) => {
    this.setState({
      modal_assignment: this.state.myAssignments[index],
      modal_index: index,
      modal_assignment_type: this.state.myAssignments[index].type,
      regrade_open: true,
    });
  };

  closeRegradeModal = () => {
    this.setState({
      modal_assignment: null,
      modal_index: null,
      regrade_open: false,
      submit_status: "",
      reason_input: "",
      modal_assignment_type: null,
    });
  };

  //Updates reason for regrade
  updateReasonValue = (evt) => {
    this.setState({ reason_input: evt.target.value });
  };

  //Generate 8 digit code
  static get8DigitCode() {
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += Math.floor(Math.random()*10);
    }
    return code;
  }

  setFullName() {
    let self = this;

    //Get students full name
    let studentRef = firestore.collection("users").doc(this.props.uid);
    studentRef.get().then(function (doc) {
      self.setState({studentName: GradesTable.getFullName(doc.data().firstName, doc.data().lastName)})
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  };

  //Get student's full name
  static getFullName(first, last){
    return first + " " + last;
  };

  //Regrade request handling
  onRegradeSubmit = () => {
    let self = this;
    self.setState({ submit_status: "writing" });

    let type = self.state.modal_assignment.type;
    let doc_code = self.state.modal_assignment.assignment_code;

    //Get student's assignment list for updating regradeStatus
    let assignmentRef = firestore.collection("users").doc(this.props.uid).collection(type).doc(doc_code);
    assignmentRef.get().then(function () {

      let assignment = self.state.modal_assignment;
      assignment.regradeStatus = "pending";

      assignmentRef.update({
        regradeStatus: assignment.regradeStatus,
      }).catch(function (error) {
        console.log("Error updating document:", error);
      });

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

    let code = GradesTable.get8DigitCode();

    let request = {
      name: this.state.modal_assignment.data.name,
      class: this.props.code,
      maxScore: this.state.modal_assignment.data.maxScore,
      reason: this.state.reason_input,
      score: this.state.modal_assignment.data.score,
      studentName: this.state.studentName,
      studentCode: this.props.uid,
      type: this.state.modal_assignment.type,
      requestCode: code,
      userDocCode: doc_code,
    };

    //Get class reference for updating all pending requests
    let regradeRef = firestore.collection("classes").doc(this.props.code).collection("regrades");
    regradeRef.doc(code).set(request).then(function () {
      self.setState({
        submit_status: "submitted",
      });
    }).catch(function(error) {
      console.error("Error adding document: ", error);
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
        let assignment = this.state.modal_assignment;
        if(assignment != null){
          return (
            <Modal
              className={"modalStyle"}
              onRequestClose={this.closeRegradeModal}
              isOpen={this.state.regrade_open}
              ariaHideApp={false}>

              <h2 className={"homeworkTitle"}>
                Request Regrade
              </h2>
              <h2>Assignment: {assignment.data.name}</h2>
              <h2>Score: {assignment.data.score}/{assignment.data.maxScore}</h2>

              <div className={"makeSpace"}/>

              <h2>Reason for Regrade:</h2>
              <Input className={"modalInput"} type={"text"} value={this.state.reason_input} onChange={this.updateReasonValue}/>

              <div className={"makeSpace"}/>

              <Button type="text" className="submitButton" size="lg" onClick={this.onRegradeSubmit}>Submit Request</Button>
            </Modal>
          );
        }
    }
  }

  //Gets the correct button text
  getButton(index, clickBind){
    let buttonText = "Request Regrade";
    let regrade_status = this.state.myAssignments[index].data.regradeStatus;
    if(regrade_status != null){
      switch(regrade_status){
        case "pending":
          buttonText = "Regrade Pending";
          clickBind = null;
          break;
        case "accepted":
          buttonText = "Regrade Accepted";
          clickBind = null;
          break;
        case "declined":
          buttonText = "Regrade Declined";
          clickBind = null;
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
        const formatClassDist = (value) => {
          return <text>{value} % of overall grade</text>
        };

        const formatWeightedDist = (value) => {
          return <text>{value} points earned (weighted)</text>
        };

        const formatWeightedMaxDist = (value) => {
          return <text>{value} points possible (weighted)</text>
        };

        const formatPointDist = (value) => {
          return <text>{value} points earned (unweighted)</text>
        };

        const formatMaxPointDist = (value) => {
          return <text>{value} points possible (unweighted)</text>
        };

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
                      <th>Points Possible</th>
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
                        <td>{this.state.myAssignments[index].data.maxScore}{" "}
                          {<span style={this.state.myAssignments[index].data.oldMaxScore != null ? {} : {display: "none"}}>
                            <text>(curved from {this.state.myAssignments[index].data.oldMaxScore})</text>
                          </span>}
                        </td>
                        <td>{this.getPercentage(this.state.myAssignments[index].data.score, this.state.myAssignments[index].data.maxScore)} %</td>
                        <td>{this.getAverageScore(this.state.classAssignments[index], true)} %</td>
                        <td>{this.getMedianScore(this.state.classAssignments[index], true)} %</td>
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
              <Col>
              <Row className="total" hidden={this.state.hidden}>Total Grade: {this.getGrade(this.state.uid)} %</Row>
              <Row className="rank" hidden={this.state.hidden}>Class Average: {this.state.classAverage} %</Row>
              <Row className="rank" hidden={this.state.hidden}>Rank: {this.getRank(this.state.uid)}</Row>
              <br/>
              </Col>
              <Row hidden={this.state.hidden}>
                <Col xs={{size: 5, offset: 0}}>
                  <h3 className="distLabel">Assignment Scores</h3>
                </Col>
                <Col xs={{size: 5}}>
                  <h3 className="distLabel">Assignment Grades</h3>
                </Col>
              </Row>
              <Row hidden={this.state.hidden}>
                <Col xs={{size: 5, offset: 1}}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={this.state.assignmentScores}
                              margin={{top: 30, right: 30, left: 30, bottom: 30}}>
                      <XAxis dataKey="name"/>
                      <YAxis/>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <Tooltip/>
                      <Legend verticalAlign="bottom" height={36}/>
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
                      <Legend verticalAlign="bottom" height={36}/>
                      <Bar dataKey="grade" fill="#21CE99" />
                      <Bar dataKey="average" fill="#bf8bff" />
                      <Bar dataKey="median" fill="#f1cbff" />
                    </BarChart>
                  </ResponsiveContainer>
                </Col>
              </Row>

              <Row hidden={this.state.hidden}>
                <Col xs={{size: 5, offset: 1}}>
                  <h3 className="distLabel">Class Weighting Distribution</h3>
                </Col>
              </Row>
              <Row hidden={this.state.hidden}>
                <Col xs={{size: 5, offset: 1}}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart margin={{top: 30, right: 30, left: 30, bottom: 30}}>
                      <Pie data={this.state.classDist} dataKey="percentage" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                        {
                          this.state.classDist.map((entry, index) =>
                            <Cell fill={this.state.classDist[index].color}/>)
                        }
                      </Pie>
                      <Tooltip formatter={formatClassDist}/>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Col>

                <Col xs={{size: 5}}>
                  <Row>
                    <Col xs={{size: 5, offset: 0}}>
                      <h3 className="distLabel">Points Earned (weighted)</h3>
                    </Col>
                    <Col xs={{size: 5, offset: 0}}>
                      <h3 className="distLabel">Points Earned (unweighted)</h3>
                    </Col>
                  </Row>
                  <Row>
                    <ResponsiveContainer width="50%" height={150}>
                      <PieChart margin={{top: 30, right: 30, left: 30, bottom: 30}}>
                        <Pie data={this.state.weightedDist} dataKey="points" nameKey="name" cx="50%" cy="50%" outerRadius={50} label>
                          {
                            this.state.weightedDist.map((entry, index) =>
                              <Cell fill={this.state.weightedDist[index].color}/>)
                          }
                        </Pie>
                        <Tooltip formatter={formatWeightedDist}/>
                      </PieChart>
                    </ResponsiveContainer>

                    <ResponsiveContainer width="50%" height={150}>
                      <PieChart margin={{top: 30, right: 30, left: 30, bottom: 30}}>
                        <Pie data={this.state.pointDist} dataKey="points" nameKey="name" cx="50%" cy="50%" outerRadius={50} label>
                          {
                            this.state.pointDist.map((entry, index) =>
                              <Cell fill={this.state.pointDist[index].color}/>)
                          }
                        </Pie>
                        <Tooltip formatter={formatPointDist}/>
                      </PieChart>
                    </ResponsiveContainer>
                  </Row>

                  <Row>
                    <Col xs={{size: 5, offset: 0}}>
                      <h3 className="distLabel">Points Possible (weighted)</h3>
                    </Col>
                    <Col xs={{size: 5, offset: 0}}>
                      <h3 className="distLabel">Points Possible (unweighted)</h3>
                    </Col>
                  </Row>
                  <Row>
                    <ResponsiveContainer width="50%" height={150}>
                      <PieChart margin={{top: 30, right: 30, left: 30, bottom: 30}}>
                        <Pie data={this.state.weightedMaxDist} dataKey="points" nameKey="name" cx="50%" cy="50%" outerRadius={50} label>
                          {
                            this.state.weightedMaxDist.map((entry, index) =>
                              <Cell fill={this.state.weightedMaxDist[index].color}/>)
                          }
                        </Pie>
                        <Tooltip formatter={formatWeightedMaxDist}/>
                      </PieChart>
                    </ResponsiveContainer>

                    <ResponsiveContainer width="50%" height={150}>
                      <PieChart margin={{top: 30, right: 30, left: 30, bottom: 30}}>
                        <Pie data={this.state.maxPointDist} dataKey="points" nameKey="name" cx="50%" cy="50%" outerRadius={50} label>
                          {
                            this.state.maxPointDist.map((entry, index) =>
                              <Cell fill={this.state.maxPointDist[index].color}/>)
                          }
                        </Pie>
                        <Tooltip formatter={formatMaxPointDist}/>
                      </PieChart>
                    </ResponsiveContainer>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col>
                  {this.getModalContent()}
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