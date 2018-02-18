import React from 'react';
import { Jumbotron, Col, Button, Form, FormGroup, Label, Input, FormText, Row} from 'reactstrap';


import logo from '../logo.svg';
import './Announcements.css';
import createAnn from "./CreateAnn.css";


export default class CreateAnn extends React.Component {
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
                                <h1 className={"title"}>Make an Announcement</h1>
                            </Col>
                        </Row>
                    </div>
                </div>

                <p>
                    Be sure to fill out each field before submitting.
                </p>


                <div>
                    <Form>

                        <FormGroup row>
                            <Label for="exampleText" sm={2}>Announcement Title</Label>
                            <Col sm={10}>
                                <Input type="textarea" name="text" id="exampleText" />
                            </Col>
                        </FormGroup>


                        <FormGroup tag="fieldset" row>
                            <legend className="col-form-label col-sm-2">Announcement Type</legend>
                            <Col sm={10}>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="radio2" />{' '}
                                        Homework
                                    </Label>
                                </FormGroup>

                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="radio2" />{' '}
                                        Quiz
                                    </Label>
                                </FormGroup>

                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="radio2" />{' '}
                                        Test
                                    </Label>
                                </FormGroup>

                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="radio2" />{' '}
                                        Miscellaneous
                                    </Label>
                                </FormGroup>

                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="exampleText" sm={2}>Announcement Message</Label>
                            <Col sm={10}>
                                <Input type="textarea" name="text" id="exampleText" />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="exampleFile" sm={2}>Attachment</Label>
                            <Col sm={10}>
                                <Input type="file" name="file" id="exampleFile" />
                                <FormText color="muted">
                                    Select a file to be displayed alongside your announcement.
                                </FormText>
                            </Col>
                        </FormGroup>


                        <FormGroup check row>
                            <Col sm={{ size: 10, offset: 2}}>
                                <Button color="success">Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}