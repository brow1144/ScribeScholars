import React, { Component } from 'react';

import { Button, Container, Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

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


                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SetClassroom