import React, {Component} from 'react';
import {Container,Input, Row, Label, Col,Form, FormGroup, Card, CardTitle, CardText, Table, NavLink} from 'reactstrap';

import './MakeWork.css';


class MakeWork extends Component {
    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col className={"mainPage"}>
                            <p>Use the below form to create work for your students</p>
                        </Col>
                    </Row>
                    <Row>
                            <Form>
                                <Col>
                                    <FormGroup xs>
                                        <Label>Assignment Title</Label>
                                        <Input type="title" placeholder="Enter Title"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exampleText">Question</Label>
                                        <Input type="textarea" placeholder="Enter Question" />
                                    </FormGroup>
                                </Col>
                            </Form>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default MakeWork