import React, {Component} from 'react';

import { PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, AreaChart, Area } from 'recharts';


import {Jumbotron, Container, Row, Col, Card, CardTitle, CardText, Table, NavLink} from 'reactstrap';
import './Dashboard.css';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            uid: props.uid,

            //code: props.code,
            code: "668273",   // TODO temporary

            classes: [],  // TODO GPA page
            myAssignments: [],  // all assignments from all the user's classes TODO GPA page

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

            data01: [
                {name: 'Group A', value: 400},
                {name: 'Group B', value: 300},
                {name: 'Group C', value: 300},
                {name: 'Group D', value: 200},
                {name: 'Group E', value: 278},
                {name: 'Group F', value: 189}
                ],

            data02: [
                {name: 'Group A', value: 2400},
                {name: 'Group B', value: 4567},
                {name: 'Group C', value: 1398},
                {name: 'Group D', value: 9800},
                {name: 'Group E', value: 3908},
                {name: 'Group F', value: 4800}
                ],


            gpas: [
                3.0,
                4.0,
                3.5,
                3.6
            ],


            classScores: [],  // class scores for an individual assignment
            classOverallGrades: [],   // class overall grades
            assignmentScores: [],   // individual scores for each assignment
            assignmentGrades: [],   // individual grades for each assignment

            graphVisible: true,
        };
    };


    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col>
                            <Row className="dbGraphs">
                                <Col>
                                    <h1>Pie Chart</h1>
                                </Col>
                            </Row>
                            <Row className="chartAlign">
                                <PieChart className="piePad" width={365} height={175}>
                                    <Pie data={this.state.data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={25} fill="#8884d8" />
                                    <Pie data={this.state.data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={30} outerRadius={40} fill="#82ca9d" label />
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
                                        3.75
                                    </h3>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default Dashboard