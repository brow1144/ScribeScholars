import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import AboutBar from './AboutBar';

import logo from './Pictures/logo.svg';
import intro from './Pictures/paperWood.jpg';
import student from './Pictures/Students.jpg';
import teacher from './Pictures/Teachers.jpeg';
import admin from "./Pictures/Admin.jpeg"
import parent from "./Pictures/Parents.jpeg"

import './AboutPage.css';

class AboutPage extends Component {
    render() {
        return (
            <div>
                <Container className={"page-section"}>

                    <Row>
                        <div className={"titlePic"}>
                            <img src={intro} alt=""/>
                        </div>
                    </Row>

                    <Row className={"bar"}>
                        <Col className={"bar"}>
                            <AboutBar/>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="about">
                            <p>About Scribe Scholars</p>
                        </Col>
                    </Row>

                    <Row className="bgOne">
                        <Col xs={12} className="text bgOne">
                            <h1>Scribe Scholars' Mission</h1>
                            <p>We are dedicated to making a better in-class experience for teachers and students.</p>
                            <p>Interactive assignments, grades, and in website chat board are just some of the features that make Scribe Scholars the premier learning experience</p>
                        </Col>
                    </Row>
                    <Row className="bgTwo">
                        <a name="headline1"></a>
                        <Col xs={12} lg={6} className="bgTwo">
                            <img src={student} className="picture"/>
                        </Col>
                        <Col xs={12} lg={6} className="text bgTwo">
                            <h1 className="">Students</h1>
                            <p>Students will have full access to their grades at a momments notice.  In-class activities can be set up by teachers
                                to make the classroom engaging and fun.  Adding classes is easy to do and all located within our website.  The message
                                board provides an environment for students to interact with each other and their teachers
                            </p>
                        </Col>
                    </Row>
                    <Row className="bgOne">
                        <a name="headline2"></a>
                        <Col xs={12} lg={6} className="text bgOne">
                            <h1>Teachers</h1>
                            <p>There are a wide variety of features available to teachers for use in the class room.  In-class activities keep students
                                engaged and interested in learning.  Grades are simple to update to allow students to track their progress.  Teachers can
                                monitor class progress and identify where the class can most improve.</p>
                        </Col>
                        <Col xs={12} lg={6} className="bgOne">
                            <img src={teacher} className={"picture"}/>
                        </Col>
                    </Row>
                    <Row className="bgTwo">
                        <a name="headline3"></a>
                        <Col xs={12} lg={6} className="bgTwo">
                            <img src={admin} className={"picture"}/>
                        </Col>
                        <Col xs={12} lg={6} className="text bgTwo">
                            <h1>Administrators</h1>
                            <p>Managing has never been simplier.  Administrators can easily manage classrooms and teachers with our straight-forward
                                process for setting up classes.  </p>
                        </Col>
                    </Row>
                    <Row className="bgOne">
                        <a name="headline4"></a>
                        <Col xs={12} lg={6} className="text bgOne">
                            <h1>Parents</h1>
                            <p>Add parents stuff here</p>
                        </Col>
                        <Col xs={12} lg={6} className="bgOne">
                            <img src={parent} className={"picture"}/>
                        </Col>
                    </Row>
                    <Row className="bgTwo">
                        <a name="headline5"></a>
                        <Col xs={12} className={"contact bgTwo text"}>
                            <h1>Contact Us</h1>
                            <p>Message the scribe scholars team at scribescholars@gmail.com</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
};

export default AboutPage