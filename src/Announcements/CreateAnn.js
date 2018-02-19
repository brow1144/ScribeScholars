import React from 'react';
import { Alert, Jumbotron, Col, Button, Form, FormGroup, Label, Input, FormText, Row} from 'reactstrap';


import logo from '../logo.svg';
import './Announcements.css';
import './CreateAnn.css';


export default class CreateAnn extends React.Component {

    constructor() {
        super();

        this.state = {
            errorCode: "",
            visible: true,
        };
    }

    onDismiss = () => {
        this.setState({ visible: false });
    };


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
                                <p className={"title"}>Make an Announcement</p>
                            </Col>
                        </Row>
                    </div>
                </div>


                <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                    {this.state.errorCode} Note that not all fields are required, but recommended.
                </Alert>


                <div>
                    <Form className={"form"}>

                        <FormGroup row className={"formpad"}>
                            <Label className={"labelSize"}for="exampleText" sm={2}>Announcement Title</Label>
                            <Col sm={10}>
                                <Input type="textarea" name="text" id="exampleText" />
                            </Col>
                        </FormGroup>


                        <FormGroup tag="fieldset" row className={"formpad"}>
                            <legend className={"labelSize"} className="col-form-label col-sm-2">Announcement Type</legend>
                            <Col sm={10}>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="radio2" />{' '}
                                        Homework
                                    </Label>
                                </FormGroup>

                                <FormGroup check className={"formpad"}>
                                    <Label check>
                                        <Input type="radio" name="radio2" />{' '}
                                        Quiz
                                    </Label>
                                </FormGroup>

                                <FormGroup check className={"formpad"}>
                                    <Label check>
                                        <Input type="radio" name="radio2" />{' '}
                                        Test
                                    </Label>
                                </FormGroup>

                                <FormGroup check className={"formpad"}>
                                    <Label check>
                                        <Input type="radio" name="radio2" />{' '}
                                        Miscellaneous
                                    </Label>
                                </FormGroup>

                            </Col>
                        </FormGroup>

                        <FormGroup row className={"formpad"}>
                            <Label className={"labelSize"} for="exampleText" sm={2}>Announcement Message</Label>
                            <Col sm={10}>
                                <Input type="textarea" name="text" id="exampleText" />
                            </Col>
                        </FormGroup>

                        <FormGroup row className={"formpad"}>
                            <Label className={"labelSize"} for="exampleFile" sm={2}>Attachment</Label>
                            <Col sm={10}>
                                <Input type="file" name="file" id="exampleFile" />
                                <FormText color="muted">
                                    Select a file to be displayed alongside your announcement.
                                </FormText>
                            </Col>
                        </FormGroup>


                        <FormGroup check row className={"formpad"}>
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