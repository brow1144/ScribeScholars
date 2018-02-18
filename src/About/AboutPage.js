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
                            <h1>Scribe Scholars</h1>
                            <p>We are dedicated to making a better in-class experience using our website</p>
                        </Col>
                    </Row>
                    <Row className="row stu">
                        <a name="headline1"></a>
                        <Col className="col student stu">
                        </Col>
                        <Col className="col text stu" /*-12 col-lg-6 offset-lg-1 text-left"*/>
                            <h1 className="">Students</h1>
                            <p>Moz was founded by Rand Fishkin and Gillian Muessig in 2004. It was called SEOmoz,
                                and started as a blog and an online community where some of the world's first SEO
                                experts shared their research and ideas. We launched the Beginner's Guide to SEO and
                                our first Search Ranking Factors study, and that hub of industry expertise transformed
                                into a small consulting firm and led us to create some of our first SEO tools.</p>
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