import React, { Component } from 'react';

import { firestore } from '../base.js';

import { Button, Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import './SetClassroom.css';
import 'react-accessible-accordion/dist/react-accessible-accordion.css';

class SetClassroom extends Component {
    render()
    {
        return(
            <Container fluid className={"ContainerRules"}>
                <Row className={"Filler"}> </Row>
                <Row className={"BannerRow"}>
                    <Col xs={"12"} sm={"12"} md={"12"} lg={"12"} xl={"12"} className={"BannerCol"}>
                        <h1>{this.props.name}'s Classroom Settings:</h1>
                    </Col>
                </Row>
                <Row className={"Filler"}> </Row>
                <Row className={"Filler"}> </Row>
                <Row className={"BoxForm"}>
                    <Col xs={"12"}>
                        <Accordion>
                        {this.props.classes != null && Object.keys(this.props.classes).map((key, index) => {
                            return<AccordionItem key={key}>
                                    <AccordionItemTitle>
                                        <h3>
                                            {this.props.classes[index].class}
                                        </h3>
                                    </AccordionItemTitle>
                                    <AccordionItemBody>
                                        <Button color={"info"} size={"lg"}>Specific Class Options</Button>
                                        <Button color="danger" size={"lg"}>Delete Selected Class</Button>
                                    </AccordionItemBody>
                                </AccordionItem>


                        })}
                        </Accordion>

                        {/*<Accordion>
                            <AccordionItem>
                                <AccordionItemTitle>
                                    <h3>
                                        Accessible Accordion
                                    </h3>
                                </AccordionItemTitle>
                                <AccordionItemBody>
                                    <p>Hello World</p>
                                </AccordionItemBody>
                            </AccordionItem>
                        </Accordion>
                        */}{/*
                        <Form>
                            <FormGroup row>
                                <Label size={"lg"} for="exampleSelectMulti" sm={2}>Enrolled Courses:</Label>
                                <Col sm={5}>
                                    <Input className="ClassSelection" bsSize="lg" type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                                        {Object.keys(this.props.classes).map((key, index) => {
                                            return <option key={key}>{this.props.classes[index].class}</option>
                                        })}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup check row>
                                <Col sm={{ size: 10, offset: 2 }}>
                                    <Button color={"info"} size={"lg"}>Specific Class Options</Button>
                                    <Row className={"Filler"}> </Row>
                                    <Button color="danger" size={"lg"}>Delete Selected Class</Button>
                                </Col>
                            </FormGroup>
                            <Row className={"Filler"}> </Row>
                            <Row className={"Filler"}> </Row>
                        </Form>
*/}

                        <Row className={"Filler"}> </Row>
                        <Row className={"Filler"}> </Row>
                        <Form>
                            <FormGroup row check>
                                <Col sm={{ size: 2, offset: 2}}>
                                    <Input bsSize="lg" type="username" name="className" id="classToAdd" placeholder="Class Code" />
                                    <Row className={"Filler"}> </Row>
                                    <Button size={"lg"}>Join This Class</Button>

                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SetClassroom