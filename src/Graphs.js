import React, { Component } from 'react';

import { firestore } from './base.js';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, AreaChart, Area } from 'recharts';

import './Graphs.css';

class Graphs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: props.uid,
      classes: null,
      //code: props.code,
      code: "668273",
      assignments: null,
      allAssignments: null,

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

  // get assignments for a particular class
  getAssignments = () => {
    let self = this;

    let classRef = firestore.collection("classes").doc(this.state.code);
    classRef.get().then(function(doc) {
      if (doc.exists) {
        if (doc.data().assignments != null) {
          self.setState({
            assignments: doc.data().assignments,
          });
        }
      } else {
        console.log("Assignments not found");
      }
    }).catch(function(error) {
      console.log("Error getting document: ", error);
    });
  };

  // get all assignments for a student
  getAllAssignments = () => {
    let self = this;

    let studentRef = firestore.collection("users").doc(this.state.uid);
    studentRef.get().then(function(doc) {
      if (doc.exists) {
        if (doc.data().assignments != null) {
          self.setState({
            allAssignments: doc.data().assignments,
            classes: doc.data().classes,  // temporary TODO
          });
        }

        console.log(self.calcGPA());
      } else {
        console.log("Assignments not found");
      }
    }).catch(function(error) {
      console.log("Error getting document: ", error);
    });
  };

  // get all students in a class
  getStudents = () => {
    let self = this;

    let classRef = firestore.collection("classes").doc(this.state.code);
    classRef.get().then(function(doc) {
      if (doc.exists) {
        if (doc.data().students != null) {
          self.setState({
            students: doc.data().students,
          });

          // get scores
        }
      } else {
        console.log("Students not found");
      }
    }).catch(function(error) {
      console.log("Error getting document: ", error);
    });
  };

  /*
  getScores = () => {
    let self = this;

    let studentRef = firestore.collection("users").doc(this.state.uid);
    studentRef.get().then(function(doc) {
      if (doc.exists) {
        if (doc.data().assignments != null) {
          self.setState({
            assignments: doc.data().assignments,
          });

          self.setScores();
        }
      } else {
        console.log("No assignments found");
      }
    }).catch(function(error) {
      console.log("Error getting document: ", error);
    });
  };
  */

  // calculate GPA for a student
  calcGPA = () => {
    let grades = [];

    for (let i in this.state.classes) {
      if (this.state.classes.hasOwnProperty(i)) {
        let grade = this.getGrade(this.state.classes[i].code);

        if (!isNaN(grade))
          grades.push(this.getGrade(this.state.classes[i].code));
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

    return (points / maxPoints);
  };

  // get grade in a specific class
  getGrade = (code) => {
    let total = 0;
    let max = 0;

    for (let i in this.state.allAssignments) {
      if (this.state.allAssignments.hasOwnProperty(i)) {
        if (this.state.allAssignments[i].code === code && this.state.allAssignments[i].maxscore != null) {
          total += this.state.allAssignments[i].score;
          max += this.state.allAssignments[i].maxscore;
        }
      }
    }

    return (total / max) * 100;
  };

  // calculate average score for an assignment
  getAverageScore = (assignment) => {
    let total = 0;
    let numStudents = 0;

    for (let i in this.state.students) {
      if (this.state.students.hasOwnProperty(i)) {
        let studentRef = firestore.collection("users").doc(this.state.students[i]);
        studentRef.get().then(function(doc) {
          if (doc.exists) {
            if (doc.data().assignments != null) {
              for (let j in doc.data().assignments) {
                if (doc.data().assignments.hasOwnProperty(j)) {
                  if (doc.data().assignments[j].name === assignment.name && doc.data().assignments[j].code === assignment.code
                    && doc.data().assignments[j].score != null) {
                    total += doc.data().assignments[j].score;
                    numStudents++;
                  }
                }
              }
            }
          }
        }).catch(function(error) {
          console.log("Error getting document: ", error);
        });
      }
    }

    return (total / numStudents) / assignment.maxScore;
  };

  getClassAverage = () => {
    /*let total = 0;
    let max = 0;

    for (let i in this.state.students) {
      if (this.state.students.hasOwnProperty(i)) {
        for (let j in this.state.assignments) {
          if (this.state.assignments.hasOwnProperty(j)) {
            if (this.state.students[i].code === code) {
              total += this.state.allAssignments[i].score;
              max += this.state.allAssignments[i].maxscore;
            }
          }
        }
      }
    }*/



    for (let i in this.state.assignments) {
      if (this.state.assignments.hasOwnProperty(i)) {
        let avg = this.getAverageScore(this.state.assignments[i]);
      }
    }

    return (total / max) * 100;
  };

  getAssignment = (name, code) => {
    for (let i in this.state.allAssignments) {
      if (this.state.allAssignments.hasOwnProperty(i)) {
        if (i.name === name && i.code === code) {
          return i;
        }
      }
    }
  };

  // **************** meant for student uid **********
  setScores = () => {
    let self = this;

    for(let i in self.state.classes) {
      if (self.state.classes.hasOwnProperty(i)) {

        let docRef = firestore.collection("classes").doc(this.state.classes[i].code);
        docRef.get().then(function(doc) {
          if (doc.exists) {
            if (doc.data().assignments != null) {
              for (let j in doc.data().assignments) {
                if (doc.data().assignments.hasOwnProperty(j)) {
                  let currentAssignment = self.getAssignment(j, self.state.classes[i].code);



                  let studentRef = firestore.collection("users").doc(self.state.uid);

                }


              }
            }
          } else {
            console.log("No such document!");
          }

        }).catch(function (error) {
          console.log("Error getting document: ", error);
        });
      }
    }
  };

  compareValues(key) {
    return function(a, b) {
      // check that input is valid
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      /*let grade1 = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
      let grade2 = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];*/
      let grade1 = a[key];
      let grade2 = b[key];

      let comparison = 0;
      if (grade1 > grade2) {
        comparison = 1;
      } else if (grade1 < grade2) {
        comparison = -1;
      }

      return comparison;
    };
  }

  render = () => {
    //this.getAllAssignments();
    //console.log(this.calcGPA());
    this.state.assignmentDist.sort(this.compareValues("grade"));

    return (
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


/*      <BarChart width={600} height={300} data={this.state.yourGrades}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Bar dataKey="grade" fill="#21CE99" />
        <Bar dataKey="avg" fill="#bf8bff" />
        <Bar dataKey="med" fill="#b39eb5" />
      </BarChart>*/
      <AreaChart width={730} height={250} data={this.state.assignmentDist}
                 margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  onClick={this.getAllAssignments}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis/>
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="grade" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>

    );
  }
}

export default Graphs;