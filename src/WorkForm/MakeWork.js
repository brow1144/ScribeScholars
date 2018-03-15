import React, {Component} from 'react';
import {Container, Row, Col,Form, FormGroup, Card, CardTitle, CardText, Table, NavLink} from 'reactstrap';

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
                            <FormGroup>

                            </FormGroup>
                        </Form>

                    </Row>
                </Container>

            </div>
        )
    }
}

export default MakeWork