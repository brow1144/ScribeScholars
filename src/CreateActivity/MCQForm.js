import React, { Component } from 'react';

import { Col, FormGroup, Label, Input} from 'reactstrap';

import './MCQForm.css';

class MCQForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "",
            question: this.props.question,
        }

    }


    render() {
        return(
                <FormGroup tag={"fieldset"}>
                    <legend className={"RadioTitle"}>#1 This Is The Question Header?</legend>
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

export default MCQForm