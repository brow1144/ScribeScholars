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
                    <Row className="row title">
                        <Col className="about">
                            <p>About Scribe Scholars</p>
                        </Col>
                    </Row>
                    <Row className="row scribe">
                        <Col className="col text scribe">
                            <h1>Scribe Scholars' Mission</h1>
                            <p>We are dedicated to making a better in-class experience for teachers and students.</p>
                            <p>Interactive assignments, grades, and in website chat board are just some of the features
                                that make scribe scholars the premier learning experience</p>
                        </Col>
                    </Row>
                    <Row className="row stu">
                        <a name="headline1"></a>
                        <Col className="col student stu">
                        </Col>
                        <Col className="col text stu" /*-12 col-lg-6 offset-lg-1 text-left"*/>
                            <h1 className="">Students</h1>
                            <p>Students will have full access to their grades at a momments notice.  In-class activities can be set up by teachers
                                to make the classroom engaging and fun.  Adding classes is easy to do and all located within our website.  The message
                                board provides an environment for students to interact with each other and their teachers in an easy to access way</p>

                        </Col>
                    </Row>
                    <Row className="row teach">
                        <Col className="col text teach">
                            <h1>Teachers</h1>
                            <p>There are a wide variety of features available to teachers for use in the class room</p>
                        </Col>
                        <Col className="col teacher">
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
};

export default AboutPage