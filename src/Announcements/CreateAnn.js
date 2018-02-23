import React from 'react';
import { Container, Alert, Col, Button, Form, FormGroup, Label, Input, FormText, Row} from 'reactstrap';


import logo from '../logo.svg';
import './Announcements.css';
import './CreateAnn.css';
import Sidebar from 'react-sidebar';
import AnnSide from "./AnnSide";

const mql = window.matchMedia(`(min-width: 800px)`);

export default class CreateAnn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            errorCode: "",
            visible: true,
            mql: mql,
            docked: props.docked,
            open: props.open,
            sideButtonVisibility: !props.docked,
        };
    }

    onDismiss = () => {
        this.setState({ visible: false });
    };

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    dockSideBar = () => {
        if (this.state.sidebarDocked)
            this.setState({
                sidebarOpen: false,
                sideButtonVisibility: true,
            });
        else
            this.setState({
                sidebarOpen: true,
                sideButtonVisibility: false,
            });
    };


    onSetSidebarOpen = (open) => {
        this.setState({
            sidebarOpen: open,
            sideButtonVisibility: true,
        });
    };

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
        this.setState({
            mql: mql,
            sidebarDocked: mql.matches,
            sideButtonVisibility: !this.state.mql.matches,
        });
    };

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    };

    mediaQueryChanged = () => {
        this.setState({
            sidebarDocked: this.state.mql.matches,
            sideButtonVisibility: !this.state.mql.matches,
        });
    };


    render() {

        let sidebarContent = <AnnSide />;

        const sidebarStyles = {
            sidebar: {
                backgroundColor: 'f3f3f3',
                width: '8em',
                textAlign: 'center',
            },
            overlay: {
                backgroundColor: '#f3f3f3'
            },
        };
        return (

            <Sidebar styles={sidebarStyles}
                     sidebar={sidebarContent}
                     open={this.state.sidebarOpen}
                     docked={this.state.sidebarDocked}
                     onSetOpen={this.onSetSidebarOpen}>

                {this.state.sideButtonVisibility
                    ?
                    <Button outline onClick={this.dockSideBar}>
                        <i className="fas fa-bars"/>
                    </Button>
                    :
                    <br/>
                }
            <Container fluid className={"container"}>
                        <Row className={"rowt"}>
                            <Col>
                                <p className={"titleRR"}>Make an Announcement</p>
                            </Col>
                        </Row>


                <Row className={"rowt"}>
                    <Col>
                        <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                            {this.state.errorCode} Note that not all fields are required, but recommended.
                        </Alert>
                    </Col>
                </Row>

                <Form className={"form"} onSubmit={this.handleSubmit}>

                    <FormGroup className={"formpad"}>
                        <Row className={"rowt"}>
                            <Col>
                                <Label className={"labelSize"} for="exampleText">Announcement Title</Label>
                            </Col>
                        </Row>
                        <Row className={"rowt"}>
                            <Col>
                                <Input type="textarea" name="text" id="exampleText" />
                            </Col>
                        </Row>
                    </FormGroup>



                    <FormGroup className={"formpad"}>
                        <Row className={"rowt"}>
                            <Col>
                            <Label className={"labelSize"}>Announcement Type</Label>
                            </Col>
                        </Row>
                        <Row className={"rowt"}>

                            <Col xs={3}>
                                <FormGroup check className={"formpad"}>
                                    <Label check>
                                        <Input type="radio" name="radio2" />{' '}
                                        Homework
                                    </Label>
                                </FormGroup>
                            </Col>
                        </Row>
                            <Row className={"rowt"}>
                            <Col xs={3}>
                                <FormGroup check className={"formpad"}>
                                    <Label check>
                                        <Input type="radio" name="radio2" />{' '}
                                        Quiz
                                    </Label>
                                </FormGroup>
                            </Col>
                            </Row>
                        <Row className={"rowt"}>
                            <Col xs={3}>
                                <FormGroup check className={"formpad"}>
                                    <Label check>
                                        <Input type="radio" name="radio2" />{' '}
                                        Test
                                    </Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className={"rowt"}>
                            <Col xs={3}>
                                <FormGroup check className={"formpad"}>
                                    <Label check>
                                        <Input type="radio" name="radio2" />{' '}
                                        Miscellaneous
                                    </Label>
                                </FormGroup>
                            </Col>
                        </Row>
                    </FormGroup>


                    <FormGroup className={"formpad"}>
                        <Row className={"rowt"}>
                            <Col>
                                <Label className={"labelSize"} for="exampleText">Announcement Message</Label>
                            </Col>
                        </Row>
                        <Row className={"rowt"}>
                            <Col>
                                <Input type="textarea" name="text" id="exampleText" />
                            </Col>
                        </Row>
                    </FormGroup>


                    <FormGroup className={"formpad"}>
                        <Row  className={"rowSubmit"}>
                            <Col/>
                            <Col className={"rowSubmit"}>
                                <Button className={"rowSubmit"} color="success">Submit</Button>
                            </Col>
                            <Col/>
                        </Row>
                    </FormGroup>
                </Form>




            </Container>

            </Sidebar>

        );
    }
}