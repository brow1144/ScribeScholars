import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import AboutBar from './AboutBar';

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
                <Container fluid className="topBar">
                    <Row>
                        <div className={"titlePic"}>
                            <img src={intro} alt=""/>
                        </div>
                    </Row>
                </Container>
                <div className="topBar">
                    <AboutBar/>
                </div>
                <Container className={"page-section"}>
                    <Row>
                        <Col className="about">
                            <p>About Scribe Scholars</p>
                        </Col>
                    </Row>
                    <Row className="bgOne">
                        <Col xs={12} className="text bgOne">
                            <h1 className={"sectionTitle"}>Scribe Scholars' Mission</h1>
                            <p className="para">We are dedicated to making a better in-class experience for students, teachers, administrators, and parents.
                                Interactive assignments, notification system, and in website chat board are just some of the features that make Scribe Scholars
                                the premier learning experience</p>
                        </Col>
                    </Row>
                    <Row className="bgTwo">
                        <Col xs={12} lg={6} className="bgTwo">
                            <a name="Students"><img src={student} className="picture" alt=""/></a>
                        </Col>
                        <Col xs={12} lg={6} className="text bgTwo">
                            <h1 className={"sectionTitle"}>Students</h1>
                            <p className="para">Our website is specifically tailored for students.  Our home page is equip with the tools to promote success.
                                Never forget a due date again with our self-updating calender and notification system which provide reminders about due dates.
                                In-class activities can be set up by teachers to make the classroom engaging and fun. The message
                                board provides an environment for students to interact with each other and their teachers
                            </p>
                        </Col>
                    </Row>
                    <Row className="bgOne">
                        <Col xs={12} lg={6} className="text bgOne">
                            <a name="Teachers"><h1 className={"sectionTitle"}>Teachers</h1></a>
                            <p className="para">There are a wide variety of features available to aid teachers.  Create in-class activities to keep students
                                engaged and interested in learning.  Grades are simple to update to allow students to track their progress.  Teachers can
                                monitor class progress and identify where the class can most improve.  Adding classes is easy to do and all located within our website.</p>
                        </Col>
                        <Col xs={12} lg={6} className="bgOne">
                            <img src={teacher} className={"picture"} alt={""}/>
                        </Col>
                    </Row>
                    <Row className="bgTwo">
                        <Col xs={12} lg={6} className="bgTwo">
                            <a name="Administrators"><img src={admin} className={"picture"} alt={""}/></a>
                        </Col>
                        <Col xs={12} lg={6} className="text bgTwo">
                            <h1 className={"sectionTitle"}>Administrators</h1>
                            <p className="para">Managing has never been simplier.  Administrators can easily manage classrooms and teachers with our straight-forward
                                process for setting up classes.  </p>
                        </Col>
                    </Row>
                    <Row className="bgOne">
                        <Col xs={12} lg={6} className="text bgOne">
                            <a name="Parents"><h1 className={"sectionTitle"}>Parents</h1></a>
                            <p className="para">Scribe Scholars was designed to create a simple and easy-to-use system for parents to monitor
                                their child’s performance in the classroom from a safe distance. Once linked to your child’s account, a parent
                                has the access to see everything that the child can see. This includes the ability to see all currently enrolled
                                classes, assigned homeworks, student's current grades, and dynamically calculated GPA.
                            </p>
                        </Col>
                        <Col xs={12} lg={6} className="bgOne">
                            <img src={parent} className={"picture"} alt={""}/>
                        </Col>
                    </Row>
                </Container>
                <Container fluid className="page-section">
                    <Row className="bgTwo">
                        <Col xs={12} className={"contact bgTwo text"}>
                            <a name="Contact-Us"><h1 className={"sectionTitle"}>Contact Us</h1></a>
                            <p className="para">For any questions or concerns, message the Scribe Scholars team at scribescholars@gmail.com</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default AboutPage