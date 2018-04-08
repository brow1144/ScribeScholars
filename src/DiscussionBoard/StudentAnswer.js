import React, {Component} from 'react';
import {Container, Row, Col, Table, Button} from 'reactstrap';

class StudentAnswer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            answerText: "",
            studentId: null,

        }
    }

    render() {
        return (
            <div>
                <Container fluid className={"discAnswerBox"}>
                    <Row>
                        <h1>the student answer</h1>
                    </Row>
                    <Row>
                        <Col>
                            <h1>This is where the student answer will be</h1>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
} export default StudentAnswer