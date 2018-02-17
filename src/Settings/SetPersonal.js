import React, { Component } from 'react';

import { Button, Container, Row, Col, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

import './SetPersonal.css';

class SetPersonal extends Component {

    render() {
        return (
            <Container fluid className={"ContainerRules"}>
                <Row className={"Filler"}> </Row>
                <Row className={"BannerRow"}>
                    <Col xs={"12"} sm={"12"} md={"12"} lg={"12"} xl={"12"} className={"BannerCol"}>
                        <h1>Walter Jacquette's Personal Settings:</h1>
                    </Col>
                </Row>
                <Row className={"Filler"}> </Row>
                <Row className={"Filler"}> </Row>
                <Row className={"BoxForm"}>
                    <Col xs={"12"}>
                        <Form>
                            <FormGroup row>
                                <Label size="lg" for="exampleEmail" sm={2}>Email:</Label>
                                <Col sm={6}>
                                    <Input size="lg" type="email" name="email" id="exampleEmail" placeholder="wjacquet@purdue.edu" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label size="lg" for="exampleNumber" sm={2}>Phone Number:</Label>
                                <Col sm={6}>
                                    <Input size="lg" type="username" name="number" id="exampleNumber" placeholder="(888)-888-8888" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label size="lg" for="exampleText" sm={2}>Profile Description:</Label>
                                <Col sm={6}>
                                    <Input size="lg" type="textarea" name="text" id="exampleText" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label size="lg" for="exampleFile" sm={2}>Profile Picture:</Label>
                                <Col sm={10}>
                                    <Input size="lg" type="file" name="file" id="exampleFile" />
                                    <FormText size="lg" color="muted">
                                        Please only upload an image for your picture.
                                    </FormText>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={{ size:6, offset: 2}}>
                                    <Button className={"PasswordButton"} size={"lg"}>Reset Password</Button>
                                </Col>
                            </FormGroup>
                            <FormGroup check row>
                                <Col sm={{ size: 8, offset: 7 }}>
                                    <Button color={"info"} size={"lg"}>Update Information</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );

    }

}
export default SetPersonal