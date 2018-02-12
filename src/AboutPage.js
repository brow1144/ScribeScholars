import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem,Row, Col } from 'reactstrap';

import AboutBar from './AboutBar';

import logo from './logo.svg';
import './AboutPage.css';

class AboutPage extends Component {
    render() {
        return (
            <div>
                <div className={"container"}>
                    <div className={"about"}>
                        <Row className={"row"}>
                            <Col className={"col"}>
                                <img className="logo" src={logo}/>
                            </Col>
                        </Row>
                        <Row className={"row"}>
                            <Col className={"col"}>
                                <h1 className={"title"}>About</h1>
                            </Col>
                        </Row>
                    </div>
                    <div className="nav">
                        <AboutBar/>
                    </div>
                </div>
            </div>
        )
    }
};

export default AboutPage