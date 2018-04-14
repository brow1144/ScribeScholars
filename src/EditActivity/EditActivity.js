import React, {Component} from 'react';

import {Container, Row, Col, Input, Label, Form, FormGroup, Button} from 'reactstrap';

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/react-accessible-accordion.css';
import './EditActivity.css';
/*import Instruct from './Instruct';
import {firestore} from "../base";
import MCQForm from "./MCQForm";
import FRQForm from "./FRQForm";
import VideoForm from "./VideoForm";
import FIBForm from "./FIBForm";
import SMQForm from "./SMQForm";*/

class EditActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialCreate: true,
            uid: props.uid,
            role: this.props.role,
            class: this.props.class,
            questions: [],
            typeArray: [],
            question: {},
            hwCode: null,
            title: "",
        };
    }

    render() {

        return (
            <h1> Hey every body </h1>
        );


    }
}

export default EditActivity