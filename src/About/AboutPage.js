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
                    <Row className={"rowBar"}>
                        <h3><a href="#headline1">Student</a></h3>
                    </Row>
                    <Row className="row">
                        <Col className="about">
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1>Scribe Scholars</h1>
                            <p>We are dedicated to making a better in-class experience using our website</p>
                        </Col>
                    </Row>
                    <Row className="row">
                        <a name="headline1"></a>
                        <Col className="colFirst">
                        </Col>
                    </Row>
                    <Row className="row">
                        <Col className="col" /*-12 col-lg-6 offset-lg-1 text-left"*/>
                            <div className="page-section-headline">
                                <h1 className="">Student</h1>
                            </div>
                            <div class="page-section-body">
                                <p>Moz was founded by Rand Fishkin and Gillian Muessig in 2004. It was called SEOmoz,
                                    and started as a blog and an online community where some of the world's first SEO
                                    experts shared their research and ideas. We launched the Beginner's Guide to SEO and
                                    our first Search Ranking Factors study, and that hub of industry expertise transformed
                                    into a small consulting firm and led us to create some of our first SEO tools.</p>
                            </div>
                        </Col>
                    </Row>
                    <Row className="row">
                        <Col className="colSecond">
                            <h3>Student</h3>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
};

export default AboutPage