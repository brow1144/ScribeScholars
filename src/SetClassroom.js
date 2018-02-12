import React, { Component } from 'react';

import { Button, Container, Row, Col, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

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

                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SetClassroom