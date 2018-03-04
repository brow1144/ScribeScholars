import React, { Component } from 'react';

import { Button, Container, Row, Col, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalFooter, ModalBody} from 'reactstrap';

import { firestore , storageRef } from "../base";
import firebase from '../base.js';

class MCQ extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return(
            <div>
                <h1>HEllo world</h1>
            </div>
        );
    }
}

export default MCQ