import React, { Component } from 'react';

import { firestore } from './base.js';

import { Button } from 'reactstrap'
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, AreaChart, Area, ReferenceLine } from 'recharts';

import './Graphs.css';

class Graphs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: props.uid,

      //code: props.code,
      code: "Graphs",   // TODO temporary

      classes: [],  // TODO GPA page
      myAssignments: [],  // all assignments from all the user's classes TODO GPA page
      myScore: null,  // user's score on current assignment TODO remove hardcoding

      classAssignments: [],   // assignments in the class
      students: [],   // all students in the class
      allAssignments: [],   // all assignments from every student

      data: [
        {name: 'HW 1', uv: 4000, pv: 2400, amt: 2400},
        {name: 'HW 2', uv: 3000, pv: 1398, amt: 2210},
        {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
        {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
        {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
        {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
        {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
      ],

      yourGrades: [
        {name: 'HW 1', grade: 80, avg: 84, med: 80},
        {name: 'HW 2', grade: 74, avg: 84, med: 82},
        {name: 'HW 3', grade: 93, avg: 65, med: 66},
        {name: 'Quiz 1', grade: 98, avg: 75, med: 83},
        {name: 'Exam 1', grade: 23, avg: 90, med: 85},
        {name: 'HW 4', grade: 53, avg: 43, med: 50},
        {name: 'Quiz 2', grade: 76, avg: 46, med: 55},
      ],

      assignmentDist: [
        /*{name: 'HW 1', grades: [80, 74, 93, 98, 23, 53, 76]},*/
        {grade: 80},
        {grade: 74},
        {grade: 93},
        {grade: 98},
        {grade: 23},
        {grade: 53, avg: 43, med: 50},
        {grade: 76, avg: 46, med: 55},
        {grade: 80, avg: 84, med: 80},
        {grade: 74, avg: 84, med: 82},
        {grade: 93, avg: 65, med: 66},
        {grade: 98, avg: 75, med: 83},
        {grade: 23, avg: 90, med: 85},
        {grade: 53, avg: 43, med: 50},
        {grade: 76, avg: 46, med: 55},
        {grade: 80, avg: 84, med: 80},
        {grade: 74, avg: 84, med: 82},
        {grade: 93, avg: 65, med: 66},
        {grade: 98, avg: 75, med: 83},
        {grade: 23, avg: 90, med: 85},
        {grade: 53, avg: 43, med: 50},
        {grade: 76, avg: 46, med: 55},
      ],

      classScores: [],  // class scores for an individual assignment
      classOverallGrades: [],   // class overall grades
      assignmentScores: [],   // individual scores for each assignment
      assignmentGrades: [],   // individual grades for each assignment

      graphVisible: false,
    };
  };

/* REFERENCE of props
<SetClassroom
updateClasses={ this.props.updateClasses }
role={this.state.role}
uid={this.state.uid}
name={this.state.name}
email={this.state.email}
phoneN={this.state.phoneN}
descript={this.state.descript}
classes={this.state.classes}
/>
  */

  componentWillMount() {
    this.getClassInfo();
  };

  // get assignments and students for a particular class
  getClassInfo = () => {
    let self = this;
    let classRef = firestore.collection("classes").doc(this.state.code);

    classRef.get().then(function(doc) {
      if (doc.exists) {
        if (doc.data().assignments != null && doc.data().students != null) {
          self.setState({
            classAssignments: doc.data().assignments,
            students: doc.data().students,
          });
        }

        self.getMyAssignments();
      }
    }).catch(function(error) {
      console.log("Error getting document: ", error);
    });
  };

  // get all assignments for a student (GPA)
  getMyAssignments = () => {
    let self = this;
    let studentRef = firestore.collection("users").doc(this.state.uid);

    studentRef.get().then(function(doc) {
      if (doc.exists) {
        if (doc.data().assignments != null) {
          self.setState({
            myAssignments: doc.data().assignments,
            classes: doc.data().classes,  // temporary TODO
          });

          self.getAllStudentInfo();
        }
      }
    }).catch(function(error) {
      console.log("Error getting document: ", error);
    });
  };

  getAllStudentInfo = () => {
    let self = this;

    for (let i in this.state.students) {
      if (this.state.students.hasOwnProperty(i)) {
        let studentRef = firestore.collection("users").doc(this.state.students[i]);

        studentRef.get().then(function(doc) {
          if (doc.exists) {
            if (doc.data().assignments != null) {
              for (let j in doc.data().assignments) {
                if (doc.data().assignments.hasOwnProperty(j)) {
                  if (doc.data().assignments[j].code === self.state.code && doc.data().assignments[j].score != null) {
                    self.setState({
                      allAssignments: self.state.allAssignments.concat(doc.data().assignments[j]),
                    });
                  }
                }
              }
            }
          }

          if (parseInt(i, 10) === self.state.students.length - 1) {
            let tempIndex = 2;  // temporary TODO

            self.setState({
              myScore: self.getStudentAssignment(self.state.classAssignments[tempIndex]).score,
            });

            console.log(self.calcGPA());  // temporary
            self.buildClassScoresGraph(self.state.classAssignments[tempIndex]);  // temporary TODO
            self.buildAssignmentScoresGraph();
            self.buildAssignmentGradesGraph();  // temporary
          }
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
      }
    }
  };

  // calculate GPA for a student
  calcGPA = () => {
    let grades = [];

    for (let i in this.state.classes) {
      if (this.state.classes.hasOwnProperty(i)) {
        let grade = this.getGrade(this.state.classes[i].code);

        if (!isNaN(grade))
          grades.push(grade);
      }
    }

    let points = 0;
    let maxPoints = grades.length;

    for (let i in grades) {
      if (grades[i] >= 92.5)
        points += 4;
      else if (89.5 <= grades[i] && grades[i] < 92.5)
        points += 3.7;
      else if (86.5 <= grades[i] && grades[i] < 89.5)
        points += 3.3;
      else if (82.5 <= grades[i] && grades[i] < 86.5)
        points += 3;
      else if (79.5 <= grades[i] && grades[i] < 82.5)
        points += 2.7;
      else if (76.5 <= grades[i] && grades[i] < 79.5)
        points += 2.3;
      else if (72.5 <= grades[i] && grades[i] < 76.5)
        points += 2;
      else if (69.5 <= grades[i] && grades[i] < 72.5)
        points += 1.7;
      else if (66.5 <= grades[i] && grades[i] < 69.5)
        points += 1.3;
      else if (62.5 <= grades[i] && grades[i] < 66.5)
        points += 1;
      else if (59.5 <= grades[i] && grades[i] < 62.5)
        points += 0.7;
      else if (grades[i] < 59.5)
        points += 0;
    }

    let gpa = points / maxPoints;

    if (gpa % 1 !== 0)
      gpa = Math.round(gpa * 100) / 100;

    return gpa;
  };

  // get grade in a specific class
  getGrade = (code) => {
    let total = 0;
    let max = 0;

    for (let i in this.state.myAssignments) {
      if (this.state.myAssignments.hasOwnProperty(i)) {
        if (this.state.myAssignments[i].code === code && this.state.myAssignments[i].maxscore != null) {
          total += this.state.myAssignments[i].score;
          max += this.state.myAssignments[i].maxscore;
        }
      }
    }

    let grade = (total / max) * 100;

    if (grade % 1 !== 0)
      grade = Math.round(grade * 100) / 100;

    return grade;
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

  // build data for graph of classroom scores on a particular assignment
  buildClassScoresGraph = (assignment) => {
    for (let i in this.state.allAssignments) {
      if (this.state.allAssignments.hasOwnProperty(i)) {
        if (this.state.allAssignments[i].name === assignment.name) {
          this.setState({
            classScores: this.state.classScores.concat({score: this.state.allAssignments[i].score}),
          });
        }
      }
    }
  };

  // build data for assignmentScores
  buildAssignmentScoresGraph = () => {
    for (let i in this.state.classAssignments) {
      if (this.state.classAssignments.hasOwnProperty(i)) {
        let assignment = this.getStudentAssignment(this.state.classAssignments[i]);

        if (assignment.score != null) {
          let name = assignment.name;
          let score = assignment.score;
          let avg = this.getAverageScore(this.state.classAssignments[i], false);

          this.setState({
            assignmentScores: this.state.assignmentScores.concat({name: name, score: score, avg: avg}),
          });
        }
      }
    }
  };

  // build data for assignmentGrades
  buildAssignmentGradesGraph = () => {
    for (let i in this.state.classAssignments) {
      if (this.state.classAssignments.hasOwnProperty(i)) {
        let assignment = this.getStudentAssignment(this.state.classAssignments[i]);

        if (assignment.score != null) {
          let name = assignment.name;
          let grade = (assignment.score / assignment.maxscore) * 100;
          let avg = this.getAverageScore(this.state.classAssignments[i], true);

          this.setState({
            assignmentGrades: this.state.assignmentGrades.concat({name: name, grade: grade, avg: avg}),
          });
        }
      }
    }
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

  showGraph = () => {
    this.setState({
      graph: "assignmentScores",
    });
  };

  render = () => {

    //this.state.assignmentDist.sort(this.compareValues("grade"));
    //this.state.classGrades.sort(this.compareValues("grade"));

      /*<LineChart width={600} height={300} data={this.state.data}
                 margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>*/


    if (this.state.graph === "classScores") {
      this.state.classScores.sort(this.compareValues("score"));
      let pos = this.state.classScores.map((e) => {return e.score;}).indexOf(this.state.myScore);

      return (
        <AreaChart width={730} height={250} data={this.state.classScores}
                   margin={{top: 30, right: 30, left: 0, bottom: 0}}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey=""/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <ReferenceLine x={pos} stroke="green" label={{value: "You", position: "top"}}/>
          <Area type="monotone" dataKey="score" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)"/>
        </AreaChart>
      );
    } else if (this.state.graph === "assignmentScores") {
      return (
        <BarChart width={600} height={300} data={this.state.assignmentScores}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Bar dataKey="score" fill="#21CE99" />
          <Bar dataKey="avg" fill="#bf8bff" />
        </BarChart>
      )
    } else if (this.state.graph === "assignmentGrades") {
      return (
        <BarChart width={600} height={300} data={this.state.assignmentGrades}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Bar dataKey="grade" fill="#21CE99" />
          <Bar dataKey="avg" fill="#bf8bff" />
        </BarChart>
      )
    } else {
      return (
        <div>
          <Button onClick={this.showGraph} className="showGraphButton" size="med" block>Show Graph</Button>
        </div>
      )
    }
  }
}

export default Graphs;