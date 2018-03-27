import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import './DashboardInfoPage.css';
import DashboardInfoBar from "./DashboardInfoBar";
import c1 from './pics/component1.png'
import c2 from './pics/component2.png'
import c3 from './pics/component3.png'

class DashboardInfoPage extends Component {
    render() {
        return (
            <div>
                <Container fluid className="topBar">
                    <Row>
                        <div className={"titlePic"}>

                        </div>
                    </Row>
                </Container>
                <div className="topBar">
                    <DashboardInfoBar/>
                </div>
                <Container className={"page-section"}>
                    <Row>
                        <Col className="dbinfo">
                            <p>Dashboard Components</p>
                        </Col>
                    </Row>
                    <Row>
                        <a name="Overview"><Col className={"fillerCol"} xs={12}></Col></a>
                    </Row>
                    <Row className="compBg1">

                        <Col xs={12} className="text compBg1">
                            <h1 className={"componentHeader"}>Analytics Can Be Intimidating</h1>
                            <p className="componentText">Luckily, we understand that. We made this page to
                                help detail to you each aspect that a teacher will be seeing on
                                his or her classroom dashboard. </p>
                        </Col>
                    </Row>
                    <Row>
                        <a name="Component1"><Col className={"fillerCol"} xs={12}></Col></a>
                    </Row>
                    <Row className="compBg2">

                        <Col xs={12} lg={6} className="text compBg2">
                            <h1 className={"componentHeader"}>Pass/Fail %</h1>
                            <p className="componentText">This component will show
                                the passing and failing percentage of all students
                                within the teacher's class.
                            </p>
                        </Col>
                        <Col xs={12} lg={6} className="compBg3">
                            <img src={c1} className="picture" alt=""/>
                        </Col>

                    </Row>
                    <Row>
                        <a name="Component2"><Col className={"fillerCol"} xs={12}></Col></a>
                    </Row>
                    <Row className="compBg1">

                        <Col xs={12} lg={6} className="text compBg1">
                            <h1 className={"componentHeader"}>Average GPA</h1>
                            <p className="componentText">This component will show
                                the average GPA across all students within the
                                teacher's class.
                            </p>
                        </Col>
                        <Col xs={12} lg={6} className="compBg3">
                            <img src={c2} className="picture" alt=""/>
                        </Col>

                    </Row>
                    <Row>
                        <a name="Component3"><Col className={"fillerCol"} xs={12}></Col></a>
                    </Row>
                    <Row className="compBg2">

                        <Col xs={12} lg={6} className="text compBg2">
                            <h1 className={"componentHeader"}>GPA Distribution</h1>
                            <p className="componentText">This component will show
                                the GPA distribution amongst all students in the
                                teacher's class.
                            </p>
                        </Col>
                        <Col xs={12} lg={6} className="compBg3">
                            <img src={c3} className="picture" alt=""/>
                        </Col>

                    </Row>
                </Container>
            </div>
        )
    }
}

export default DashboardInfoPage