import React, {Component} from 'react';

import { PieChart, Cell,Pie } from 'recharts';


import {Progress, Row, Col } from 'reactstrap';
import './Dashboard.css';
import {firestore} from "../base";

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            uid: props.uid,

            //code: props.code,



            students: [],

            studentsData: [{
                gpa: "",
            }],

            gpaMap: {},

            avgGpa: 0,

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

            data01: [
                {name: 'Pass', value: 95},
                {name: 'Fail', value: 5},
                ],

            data02: [
                {name: 'Group A', value: 2400},
                {name: 'Group B', value: 4567},
                {name: 'Group C', value: 1398},
                {name: 'Group D', value: 9800},
                {name: 'Group E', value: 3908},
                {name: 'Group F', value: 4800}
                ],

            data03: [
                {name: 'Group A', value: 400},
                {name: 'Group B', value: 300},

            ],

            data04: [
                {name: 'Group A', value: 2400},
                {name: 'Group E', value: 3908},
                {name: 'Group F', value: 4800}
            ],

            COLORS: ['#00C49F',
                '#FF8042'],


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
        });

    };

    getClassAverage = () => {


        let gpaMap = {};
        let completionMap = {};

        let self = this;
        self.state.students.forEach(function(element) {
            let stud = firestore.collection("users").doc(element);


            stud.onSnapshot(function (doc) {
                if (doc.exists) {

                    gpaMap[element] = doc.data().gpa;
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
        let temp = 0;

        for (let i in this.state.gpaMap) {
            temp += this.state.gpaMap[i];
        }
        let size = Object.keys(this.state.gpaMap).length;
        temp = temp / size;
        temp = Math.round(temp * 100) / 100;
        console.log(temp);
        this.setState({
            avgGpa: temp,
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
                                        <Pie data={this.state.data01} dataKey="value" nameKey="name" cx="50%" cy="50%"
                                             outerRadius={70} fill="#8884d8" label>{
                                            this.state.data01.map((entry, index) => <Cell key={entry} fill={this.state.COLORS[index % this.state.COLORS.length]}/>)
                                        } </Pie>
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
                                            <Pie data={this.state.data03} dataKey="value" nameKey="name" cx="50%"
                                                 cy="50%"
                                                 outerRadius={70} fill="#8884d8" label/>
                                            </PieChart>

                                </Row>
                            </Col>

                            <Col className="dbGraphs">
                                <Row className="dbGraphs">
                                    <Col>
                                        <h1>Recent Assignment</h1>
                                    </Col>
                                </Row>
                                <Row className="dbGraphs piePad">
                                    <Col className={"progPad"}>
                                        <div className="text-center progText">74%</div>
                                        <Progress color={"success"} value={74}/>
                                    </Col>
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