import React, {Component} from 'react';
import {Container,Input, Row, Label, Col,Form, FormGroup, Card, CardTitle, CardText, Table, NavLink} from 'reactstrap';

import './MakeWork.css';


class MakeWork extends Component {
    render() {
        return (
            <div>
                <Container fluid className={"mainPage"}>
                    <Row>
                        <Col>
                            <p>Make Assignment</p>
                        </Col>
                    </Row>
                    <Row className="entTitle">
                        <Col className="entTitle" xs={4}>
                        <FormGroup className="formCompPad">
                            <Label className="formCompPad qTitle">Assignment Title</Label>
                            <Input type="title" placeholder="Enter Title"/>
                        </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>

                            <Form inline>
                                <Col>
                                    <p className="qTitle">Question 1</p>
                                    <FormGroup className="formCompPad">
                                        <Label for="exampleText" className="formCompPad">Question</Label>
                                        <Input type="textarea" placeholder="Enter Question" />
                                    </FormGroup>
                                    <FormGroup className="formCompPad">
                                        <Label for="exampleSelect" className="formCompPad">Correct Answer</Label>
                                        <Input type="select" name="select" id="exampleSelect">
                                            <option>A</option>
                                            <option>B</option>
                                            <option>C</option>
                                            <option>D</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup className="formCompPad">
                                        <Label for="exampleText" className="formCompPad">Choice A</Label>
                                        <Input type="textarea" placeholder="Enter Choice" />
                                    </FormGroup>
                                    <FormGroup className="formCompPad">
                                        <Label for="exampleText" className="formCompPad">Choice B</Label>
                                        <Input type="textarea" placeholder="Enter Choice" />
                                    </FormGroup>
                                    <FormGroup className="formCompPad">
                                        <Label for="exampleText" className="formCompPad">Choice C</Label>
                                        <Input type="textarea" placeholder="Enter Choice" />
                                    </FormGroup>
                                    <FormGroup className="formCompPad">
                                        <Label for="exampleText" className="formCompPad">Choice D</Label>
                                        <Input type="textarea" placeholder="Enter Choice" />
                                    </FormGroup>
                                </Col>
                            </Form>
                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default MakeWork