import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';


import logo from '../logo.svg';
import './Announcements.css';
import AnnAcc from "./AnnAcc";

class Announcements extends Component {
    render() {
        return (
            <div>
                <div className={"container"}>
                    <div className={"about"}>
                        <Row className={"row"}>
                            <Col className={"col"}>
                                <img className="logo" alt="logo" src={logo}/>
                            </Col>
                        </Row>
                        <Row className={"row"}>
                            <Col className={"col"}>
                                <h1 className={"title"}>Announcements</h1>
                            </Col>
                        </Row>
                    </div>
                    <div className="nav">
                        <AnnAcc/>
                    </div>
                </div>
            </div>
        )
    }
};

export default Announcements