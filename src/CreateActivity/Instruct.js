import React, { Component } from 'react';

import { Container, Row, Col } from 'reactstrap';

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
                    <Col xs={7} style={{borderStyle: 'solid', marginRight: '2rem'}}>
                        <p>Hey there bud</p>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </Col>
                    <Col xs={4} style={{backgroundColor: 'red'}}>
                        <p>Hey there bud</p>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </Col>
                </Row>

            </Container>

        );
    }
}

export default Instruct