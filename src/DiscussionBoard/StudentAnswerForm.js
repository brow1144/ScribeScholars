import React, {Component} from 'react';
import {Container, Row, Col, Table, Button, Form, } from 'reactstrap';
import './StudentAnswerForm.css'

class StudentAnswerForm extends Component {

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
                            <Form>
                                <FormGroup>
                                    <Input type="textarea" name="text" id="exampleText" placeholder="Answer the question here"/>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
} export default StudentAnswerForm