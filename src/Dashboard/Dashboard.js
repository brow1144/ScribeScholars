import React, {Component} from 'react';

import { PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, AreaChart, Area } from 'recharts';


import {Container, Row, Col, Card, CardTitle, CardText, Table, NavLink} from 'reactstrap';


class Dashboard extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <PieChart width={730} height={250}>
                                <Pie data={5} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                                <Pie data={6} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                            </PieChart>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default Dashboard