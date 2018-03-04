import React, { Component } from 'react';

import { Button, Container, Row, Col, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalFooter, ModalBody} from 'reactstrap';

import './MCQ.css';

class MCQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "",
        }
    }


    render() {
        return(
                <FormGroup tag={"fieldset"}>
                    <legend className={"RadioTitle"}>This Is The Question Header?</legend>
                    <Col sm={{ size:10 }} >
                        <FormGroup>
                            <Label className={"RadioLabel"}>
                                <Input className={"RadioButton"} type="radio" name="radio1" />{' '}
                                <p>Possible Answer Number 1</p>
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label className={"RadioLabel"}>
                                <Input className={"RadioButton"} type="radio" name="radio1" />{' '}
                                <p>Possible Answer Number 2</p>
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label className={"RadioLabel"}>
                                <Input className={"RadioButton"} type="radio" name="radio1"/>
                                <p>Possible Answer Number 3</p>
                            </Label>
                        </FormGroup>
                    </Col>
                </FormGroup>

        );
    }
}

export default MCQ