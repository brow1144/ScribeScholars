import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import './DashboardInfoPage.css';
import DashboardInfoBar from "./DashboardInfoBar";

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
                            <h1 className={"componentHeader"}>Component 1</h1>
                            <p className="componentText">This is where all the info for the
                                first component that we decide to elaborate on will be sectioned
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <a name="Component2"><Col className={"fillerCol"} xs={12}></Col></a>
                    </Row>
                    <Row className="compBg1">

                        <Col xs={12} lg={6} className="text compBg1">
                            <h1 className={"componentHeader"}>Component 2</h1>
                            <p className="componentText">This is where all the info for the
                                second component that we decide to elaborate on will be sectioned
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default DashboardInfoPage