import React, { Component } from 'react';

import { Container, Row, Col, FormGroup, Label, Input} from 'reactstrap';

import './Instruct.css';

class Instruct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "",
            question: this.props.question,
        }

    }


    render() {
        return(
            <Container fluid>
                <Row>
                    <p>Hey there bud</p>
                </Row>
                <Row className={"Filler"}> </Row>
                <Row className={"Filler"}> </Row><Row className={"Filler"}> </Row>
                <Row className={"Filler"}> </Row><Row className={"Filler"}> </Row>
                <Row className={"Filler"}> </Row><Row className={"Filler"}> </Row>
                <Row className={"Filler"}> </Row>
            </Container>

        );
    }
}

export default Instruct