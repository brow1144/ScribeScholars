import React, {Component} from 'react';

import { Button, Container, Row, Col, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalFooter, ModalBody} from 'reactstrap';

import { firestore , storageRef } from "../base";
import firebase from '../base.js';

import './CreateActivity.css';
import MCQ from './MCQ';
import VideoActivity from './VideoActivity';

import FRQ from './FRQ';
import SMQ from './SMQ';

class CreateActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: props.uid,
            role: this.props.role,
        };
    }


    render() {
        return(
            <Container fluid className={"ContainerRules"}>
                <Row className={"Filler"}> </Row>
                <Row className={"BannerRow"}>
                    <Col xs={"12"} sm={"12"} md={"12"} lg={"12"} xl={"12"} className={"BannerCol"}>
                        <h1>Assignment Title Creation:</h1>
                    </Col>
                </Row>
                <Row className={"Filler"}> </Row>
                <Row className={"Filler"}> </Row>
                <MCQ/>
                <FRQ/>
                <VideoActivity/>


                <Row className={"Filler"}> </Row>
                <Row className={"Filler"}> </Row>

            </Container>
        );


    }
}

export default CreateActivity