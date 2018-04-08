import React, { Component } from 'react';

import { Container, Row, Col, Card, CardTitle, Button, CardHeader, CardBody, FormGroup, Form, Label, Input } from 'reactstrap';

import './Instruct.css';

class Instruct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "",
            question: this.props.question,
            defaultPoints: true,
        }

    }

    toggleWeighting = () => {
      this.setState({
        defaultPoints: !this.state.defaultPoints,
      })
    };

    onFormSubmit = (ev) => {
        ev.preventDefault();

        if (this.state.defaultPoints)
            this.props.createHomework(ev.target.title.value, ev.target.descriptText.value, 0);
        else
            this.props.createHomework(ev.target.title.value, ev.target.descriptText.value, parseInt(ev.target.totalPoints.value));
    };

    render() {
        return(
            <Container fluid>
                <br/>
                <br/>
                <Row>
                    <Col xs={10} lg={5} style={{paddingRight: '4rem'}}>
                        <Card style={{boxShadow: '8px 8px 3px rgba(0, 0, 0, 0.2)'}}>
                            <CardHeader tag="h2" className={"cardTitleText"}>Instructions</CardHeader>
                            <CardBody >
                                <br/>
                                <CardTitle tag={"p"} className={"cardTextStyle"}>
                                    On this page you will select the name for this activity and provide a short description or set of instructions for the students when they first view the activity.
                                </CardTitle>
                                <br/>
                                <hr/>
                                <br/>
                                <CardTitle tag={"p"} className={"cardTextStyle"}>
                                    On the next page you will be able to select a type of question and then click the "Add Question" button next to it to add that type of question onto the activity.
                                </CardTitle>
                                <CardTitle tag={"p"} className={"cardTextStyle"}>
                                    Next there will be a form to fill out with information on the question depending on the type.
                                </CardTitle>
                                <br/>
                                <hr/>
                                <br/>
                                <CardTitle tag={"p"} className={"cardTextStyle"}>
                                    At the end when you are content with the questions you have added you can click "Submit Activity" and then the assignment will be posted to ScribeScholars.
                                </CardTitle>
                                <br/>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xs={{ size: 5, offset: 1}} lg={{ size: 3, offset: 1}} style={{paddingLeft: '1rem'}}>
                        <br/>
                        <br/>
                        <Form onSubmit={this.onFormSubmit}>
                            <Label size="lg" for="exampleNumber" sm={6}> Activity Title:</Label>

                            <FormGroup row>
                                <Col sm={10}>
                                    <Input bsSize="lg" type="username" name="title" id="exampleNumber"/>
                                </Col>
                            </FormGroup>
                            <Label size="lg" for="exampleText" sm={6}> Activity Description:</Label>

                            <FormGroup row>
                                <Col sm={10}>
                                    <Input bsSize="lg" type="textarea" name="descriptText" id="exampleText"/>
                                </Col>
                            </FormGroup>

                          <FormGroup row>
                            <Col sm={10}>
                              <FormGroup check inline>
                                <Label check size="lg">
                                  <Input onChange={this.toggleWeighting} type="checkbox" id="checkbox"
                                         checked={this.state.defaultPoints}/> Use default weighting (1 point per question)
                                </Label>
                              </FormGroup>
                            </Col>
                          </FormGroup>

                          <Label size="lg" for="examplePoints" sm={6} hidden={this.state.defaultPoints}> Total Points:</Label>
                          <FormGroup row hidden={this.state.defaultPoints}>
                            <Col sm={10}>
                              <Input bsSize="lg" type="number" name="totalPoints" id="examplePoints"/>
                            </Col>
                          </FormGroup>

                            <br/>
                            <FormGroup check>
                                <Col sm={{ size: 9 }}>
                                    <Button color={"info"} size={"lg"} block>Create Activity</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>

            </Container>

        );
    }
}

export default Instruct