import React, {Component} from 'react';

import { PieChart, Cell,Pie, Tooltip } from 'recharts';


import {Row, Col } from 'reactstrap';
import './Dashboard.css';
import {firestore} from "../base";

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            uid: props.uid,

            //code: props.code,


            completionMap: {},
            scoresMap: {},
            students: [],

            studentsData: [{
                gpa: 0
            }],

            gpaMap: {},

            avgGpa: 0,

            classAverage: 0,


            classes: [],  // TODO GPA page
            myAssignments: [],  // all assignments from all the user's classes TODO GPA page

            classAssignments: [],   // assignments in the class
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

            passFail: [],

            data02: [
                {name: 'Group A', value: 2400},
                {name: 'Group B', value: 4567},
                {name: 'Group C', value: 1398},
                {name: 'Group D', value: 9800},
                {name: 'Group E', value: 3908},
                {name: 'Group F', value: 4800}
                ],

            gpaDis: [

            ],

            data04: [
                {name: 'Group A', value: 2400},
                {name: 'Group E', value: 3908},
                {name: 'Group F', value: 4800}
            ],

            COLORS: ['#00C49F',
                '#FF8042',
                '#55B8D9',
                '#B855D9',
                '#E8F576',
            ],


            classScores: [],  // class scores for an individual assignment
            classOverallGrades: [],   // class overall grades
            assignmentScores: [],   // individual scores for each assignment
            assignmentGrades: [],   // individual grades for each assignment

            graphVisible: true,
        };

    };


    componentWillMount() {
        this.getStudentsInClass();
    }


    getStudentsInClass = () => {
        let docRef = firestore.collection("classes").doc(this.props.code);
        let self = this;


        docRef.onSnapshot(function (doc) {

            if (doc.exists) {
                if (doc.data().students != null) {
                    self.setState({
                        students: doc.data().students,
                    }, () => {
                        self.getStudentData();
                        self.getClassAverage();
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
                        gpa: doc.data().gpa,
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
        })
    };

    getClassAverage = () => {


        let gpaMap = {};

        let self = this;
        self.state.students.forEach(function(element) {
            let stud = firestore.collection("users").doc(element);


            stud.onSnapshot(function (doc) {
                if (doc.exists) {
                    if (isNaN(doc.data().gpa)) {
                        gpaMap[element] = 0;
                    } else {
                        gpaMap[element] = doc.data().gpa;
                    }
                    //gpaMap[element] = doc.data().gpa;
                    gpaMap[element] = Math.round(gpaMap[element] * 100) / 100;


                } else {
                    console.log("No such document!");
                }
                self.setState({
                    gpaMap: gpaMap,
                }, () => {
                    self.getAvgGpa();
                });
            })
        })
    };

    getAvgGpa = () => {
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
        let toOne = 0;
        //let oneHead = "0.0+";

        for (let i in this.state.gpaMap) {
            let thisGpa = this.state.gpaMap[i];

            if (thisGpa >= 3.0) {
                toFour++;
            } else if (thisGpa >= 2.0) {
                toThree++;
            } else if (thisGpa >= 1.0) {
                toTwo++;
            } else {
                toOne++;
            }

            if (thisGpa < 1.7) {
                failing++;
            } else {
                passing++;
            }

            temp += this.state.gpaMap[i];
        }

        let size = Object.keys(this.state.gpaMap).length;
        temp = temp / size;
        temp = Math.round(temp * 100) / 100;

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
            name : "Group 3-4",
            value : toFour
        };

        gpadArr.unshift(object);

        object = {
            name : "Group 2-3",
            value : toThree
        };
        gpadArr.unshift(object);

        object = {
            name : "Group 1-2",
            value : toTwo
        };

        gpadArr.unshift(object);

        object = {
            name : "Group 0-1",
            value : toOne
        };
        gpadArr.unshift(object);
        //END OF GPA DIS

        this.setState({
            avgGpa: temp,
            passFail : pfArr,
            gpaDis : gpadArr
        });
    };


    render() {
        return (
            <div>
                    <Col xs={2}/>
                    <Col xs={10} className="col-centered">
                        <Row className="dbBG dbGraphs dbBorder">
                            <Col>
                                <Row className="dbGraphs">
                                    <Col>
                                        <h1>Pass/Fail %</h1>
                                    </Col>
                                </Row>
                                <Row className="chartAlign">
                                    <PieChart className="piePad" width={365} height={250}>
                                        <Pie data={this.state.passFail} dataKey="value" nameKey="name" cx="50%" cy="50%"
                                             outerRadius={70} fill="#8884d8" label>{
                                            this.state.passFail.map((entry, index) => <Cell key={entry} fill={this.state.COLORS[index % this.state.COLORS.length]}/>)
                                        } </Pie><Tooltip/>
                                    </PieChart>
                                </Row>
                            </Col>

                            <Col className="dbGraphs">
                                <Row className="dbGraphs">
                                    <Col>
                                        <h1>Avg. GPA</h1>
                                    </Col>
                                </Row>
                                <Row className="dbGraphs">
                                    <Col>
                                        <h3>
                                            {this.state.avgGpa}
                                        </h3>
                                    </Col>
                                </Row>
                            </Col>

                            <Col>
                                <Row className="dbGraphs">
                                    <Col>
                                        <h1>GPA Distribution</h1>
                                    </Col>
                                </Row>
                                <Row className="chartAlign">
                                        <PieChart className="piePad" width={365} height={250}>
                                            <Pie data={this.state.gpaDis} dataKey="value" nameKey="name" cx="50%"
                                                 cy="50%"
                                                 outerRadius={70} fill="#8884d8" label>{
                                                this.state.gpaDis.map((entry, index) => <Cell key={entry} fill={this.state.COLORS[index % this.state.COLORS.length]}/>)
                                            }</Pie>
                                            <Tooltip/>
                                            </PieChart>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={2}/>

            </div>
        )
    }
}
export default Dashboard