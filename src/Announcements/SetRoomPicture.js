import React from 'react';
import {   Container, Col, Button, Form, FormGroup, Label, Input, FormText, Row} from 'reactstrap';

import './Announcements.css';
import './CreateAnn.css';
import Sidebar from 'react-sidebar';
import AnnSide from "./AnnSide";
import {storageRef} from "../base";
import './SetRoomPicture.css';


const mql = window.matchMedia(`(min-width: 800px)`);

export default class CreateAnn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            classCode: props.classCode,
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


    handlePicture = (ev) => {
        ev.preventDefault();

        let self = this;
        console.log(ev.target)
        let reader = new FileReader();
        let classCode = ev.target.classCode.value;
        let file = ev.target.file.files[0];

        reader.onloadend = () => {
            self.setState({
                file: file,
            });
        };

        let userImageRef = storageRef.ref().child(`${classCode}`);
        userImageRef.put(file).then(function(snapshot) {
            console.log('Uploaded a blob or file!');
        }).then(() => {


        })
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




                    <Form className={"form"} onSubmit={this.handlePicture}>

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

                        <Row className={"roomPicPad"}>
                            <Col>
                                <Label className={"labelSize attachSize"} for="exampleFile">Attachment</Label>
                            </Col>
                        </Row>
                        <FormGroup row className={"formpad roomPicPad"}>

                            <Col>
                                <Input  type="file" name="file" id="exampleFile" />
                                <FormText color="muted">
                                    Select a file to be displayed alongside your announcement.
                                </FormText>
                            </Col>
                        </FormGroup>

                        <FormGroup check row className={"formpad roomPicPad"}>
                            <Col>
                                <Button  color="success">Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Container>

            </Sidebar>
        );
    }
}