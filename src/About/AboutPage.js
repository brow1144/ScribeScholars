import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import AboutBar from './AboutBar';

import logo from './Pictures/logo.svg';
import student from './Pictures/Students.jpg';
import './AboutPage.css';

class AboutPage extends Component {
    render() {
        return (
            <div>
                <div className={"page-section"}>
                    <Row className="bar">
                        <AboutBar/>
                    </Row>
                    <Row className="row title">
                        <Col className="about">
                            <p>About Scribe Scholars</p>
                        </Col>
                    </Row>
                    <Row className="row scribe">
                        <Col className="colA text scribe">
                            <h1>Scribe Scholars' Mission</h1>
                            <p>We are dedicated to making a better in-class experience for teachers and students.</p>
                            <p>Interactive assignments, grades, and in website chat board are just some of the features
                                that make Scribe Scholars the premier learning experience</p>
                        </Col>
                    </Row>
                    <Row className="row stu">
                        <a name="headline1"></a>
                        <Col className="colA student stu">
                        </Col>
                        <Col lg="6" className="colA text stu" >
                            <h1 className="">Students</h1>
                            <p>Students will have full access to their grades at a momments notice.  In-class activities can be set up by teachers
                                to make the classroom engaging and fun.  Adding classes is easy to do and all located within our website.  The message
                                board provides an environment for students to interact with each other and their teachers</p>

                        </Col>
                    </Row>
                    <Row className="row teach">
                        <a name="headline2"></a>
                        <Col className="colA text teach">
                            <h1>Teachers</h1>
                            <p>There are a wide variety of features available to teachers for use in the class room.  In-class activities keep students
                                engaged and interested in learning.  Grades are simple to update to allow students to track their progress.  Teachers can
                                monitor class progress and identify where the class can most improve.</p>
                        </Col>
                        <Col className="colA teacher">
                        </Col>
                    </Row>
                    <Row className="row admin">
                        <a name="headline3"></a>
                        <Col className="colA administrator">
                        </Col>
                        <Col className="colA text admin">
                            <h1>Administrators</h1>
                            <p>Managing has never been simplier.  Administrators can easily manage classrooms and teachers with our straight-forward
                                process for setting up classes.  </p>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
};

export default AboutPage