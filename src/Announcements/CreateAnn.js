import React from 'react';
import { Container, Alert, Col, Button, Form, FormGroup, Label, Input, Row} from 'reactstrap';


import './Announcements.css';
import './CreateAnn.css';
import Sidebar from 'react-sidebar';
import AnnSide from "./AnnSide";
import { firestore} from "../base";

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

            newMessage: null,
            newTitle: null,
            newSubtitle: null,

            Announcements: [{
                message: null,
                subtitle: null,
                title: null,
            }],
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


    onFormSubmit = (ev) => {
        ev.preventDefault();
        let self = this;

        let title = ev.target.title.value;
        let subtitle = ev.target.subtitle.value;
        let message = ev.target.message.value;
        let classCode = ev.target.classCode.value;

        let classRef = firestore.collection("classes").doc(classCode);


        classRef.get().then(function(doc) {
            if (doc.exists) {
                if (doc.data().Announcements != null) {
                    self.setState({
                        Announcements: doc.data().Announcements,
                        newTitle: title,
                        newSubtitle: subtitle,
                        newMessage: message,
                    });
                    self.addAnnouncement(classRef);


                }
            } else {
                console.log("user not found");
            }
        }).catch(function(error) {
            console.log("Error getting document: ", error);
        });


    };

    addAnnouncement = (classRef) => {
        let self = this;
        let tmpNewAnnouncement = [{
            message: self.state.newMessage,
            subtitle: self.state.newSubtitle,
            title: self.state.newTitle,
        }];

        // add temporary class to classes
        if (self.state.Announcements != null) {
            self.setState({
                Announcements: self.state.Announcements.concat(tmpNewAnnouncement),
            });
        } else {
            self.setState({
                Announcements: tmpNewAnnouncement,
            });
        }

        classRef.update({
            Announcements: self.state.Announcements,
        }).then(function() {
            console.log("Successfully updated classes list");
        }).catch(function(error) {
            console.log("Error updating document: ", error);
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

                <Form className={"form"}  onSubmit={ (ev) => this.onFormSubmit(ev) }>

                    <FormGroup className={"formpad"}>
                        <Row className={"rowt"}>
                            <Col>
                                <Label className={"labelSize"} for="exampleText">Announcement Title</Label>
                            </Col>
                        </Row>
                        <Row className={"rowt"}>
                            <Col>
                                <Input name="title" id="exampleTitle" />
                            </Col>
                        </Row>
                    </FormGroup>



                    <FormGroup className={"formpad"}>
                        <Row className={"rowt"}>
                            <Col>
                                <Label className={"labelSize"} for="exampleText">Announcement Type</Label>
                            </Col>
                        </Row>
                        <Row className={"rowt"}>
                            <Col>
                                <Label check>
                                    <Input type="select" name="subtitle">
                                        <option>Test</option>
                                        <option>Quiz</option>
                                        <option>Homework</option>
                                        <option>Misc.</option>
                                    </Input>
                                </Label>
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
                                <Input type="textarea" name="message" id="exampleMessage" />
                            </Col>
                        </Row>
                    </FormGroup>

                    <FormGroup className={"formpad"}>
                        <Row className={"rowt"}>
                            <Col>
                                <Label className={"labelSize"} for="exampleText">Class Code</Label>
                            </Col>
                        </Row>
                        <Row className={"rowt"}>
                            <Col>
                                <Input name="classCode" id="exampleClassCode" />
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