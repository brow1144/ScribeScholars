import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';

import '../Settings/Settings.css'
import Sidebar from 'react-sidebar';
import logo from '../logo.svg';
import './Announcements.css';
import AnnAcc from "./AnnAcc";
import AnnSide from "./AnnSide";

const mql = window.matchMedia(`(min-width: 800px)`);




class Announcements extends Component {

    constructor(props) {
        super(props);

        this.state = {

            mql: mql,
            docked: props.docked,
            open: props.open,
            sideButtonVisibility: !props.docked,
        };
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
                {/*
                <SetPersonal/>
*/}

            <div>
                <div className={"container"}>
                    <div className={"about"}>
                        <Row className={"rowt"}>
                            <Col className={"colt"}>
                                <img className="logo" alt="logo" src={logo}/>
                            </Col>
                        </Row>
                        <Row className={"rowt"}>
                            <Col className={"colt"}>
                                <h1 className={"title"}>Announcements</h1>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className={"cards"}>
                    <AnnAcc/>
                </div>
            </div>
            </Sidebar>
        )
    }
};

export default Announcements