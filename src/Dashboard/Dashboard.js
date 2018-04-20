import React, {Component} from 'react';

import { PieChart, Cell,Pie, Tooltip } from 'recharts';


import {Row, Col } from 'reactstrap';
import './Dashboard.css';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {

            COLORS: ['#00C49F',
                '#FF8042',
                '#B855D9',
                '#E8F576',
                '#55B8D9',
                '#00C49F',
            ],

            passCOLORS: [
                '#00C49F',
                '#FF8042',
            ]
        };
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
                                        <Pie data={this.props.passFail} dataKey="value" nameKey="name" cx="50%" cy="50%"
                                             outerRadius={70} fill="#8884d8" label>{
                                            this.props.passFail.map((entry, index) => <Cell key={entry} fill={this.state.passCOLORS[index % this.state.passCOLORS.length]}/>)
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
                                            {this.props.avgGpa}
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
                                            <Pie data={this.props.gpaDis} dataKey="value" nameKey="name" cx="50%"
                                                 cy="50%"
                                                 outerRadius={70} fill="#8884d8" label>{
                                                this.props.gpaDis.map((entry, index) => <Cell key={entry} fill={this.state.COLORS[index % this.state.COLORS.length]}/>)
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