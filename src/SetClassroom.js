import React, { Component } from 'react';

import { Button, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';

import './SetClassroom.css';

class SetClassroom extends Component
{
    render()
    {
        return(
            <Container fluid className={"ContainerRules"}>
                <Row className={"Filler"}> </Row>
                <Row className={"BannerRow"}>
                    <Col xs={"12"} sm={"12"} md={"12"} lg={"12"} xl={"12"} className={"BannerCol"}>
                        <h1>Walter Jacquette's Classroom Settings:</h1>
                    </Col>
                </Row>
                <Row className={"Filler"}> </Row>
                <Row className={"Filler"}> </Row>
                <Row className={"BoxForm"}>
                    <Col xs={"12"}>
                        <Form>
                            <FormGroup row>
                                <Label size={"lg"} for="exampleSelectMulti" sm={2}>Enrolled Courses:</Label>
                                <Col sm={5}>
                                    <Input className="ClassSelection" size="lg" type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                                        <option>AP CompSci</option>
                                        <option>Chemistry</option>
                                        <option>AP Calculus</option>
                                        <option>Literature</option>
                                        <option>Band</option>
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

                        <Form>
                            <FormGroup row check>
                                <Col sm={{ size: 2, offset: 2}}>
                                    <Input size="lg" type="username" name="classCode" id="classToAdd" placeholder="ClassCode" />
                                    <Row className={"Filler"}> </Row>
                                    <Button size={"lg"}>Add This Class</Button>

                                </Col>
                            </FormGroup>
                        </Form>

                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SetClassroom