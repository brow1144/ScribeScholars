import React from 'react';
import {   Container, Col, Button, Form, FormGroup, Label, Input, FormText, Row} from 'reactstrap';


import logo from '../logo.svg';
import './Announcements.css';
import './CreateAnn.css';
import Sidebar from 'react-sidebar';
import AnnSide from "./AnnSide";
import {firestore} from "../base";
import './SetRoomPicture.css';

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

    submitPicture = (ev) => {
        ev.preventDefault();
        let self = this;

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

                <Container>
                    <Row className={"rowRoomPic"}>
                        <Col>
                            <p>Set Room Picture</p>
                        </Col>
                    </Row>
                    <Row/>




                    <Form className={"form"} onSubmit={ this.submitPicture }>

                        <Row className={"roomPicPad"}>
                            <Col>
                                <Label className={"labelSize attachSize"} for="exampleFile">Attachment</Label>
                            </Col>
                        </Row>
                        <FormGroup row className={"formpad roomPicPad"}>

                            <Col>
                                <Input type="file" name="file" id="exampleFile" />
                                <FormText color="muted">
                                    Select a file to be displayed alongside your announcement.
                                </FormText>
                            </Col>
                        </FormGroup>

                        <FormGroup row className={"formpad roomPicPad"}>
                            <Col>
                                <Button color="success">Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Container>

            </Sidebar>
        );
    }
}