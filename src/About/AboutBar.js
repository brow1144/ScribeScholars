import React, { Component } from 'react';
import { Collapse, Navbar, Nav, NavItem, NavLink } from 'reactstrap';

import './AboutBar.css';

class AboutBar extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div className={"container"}>
                <Navbar expand={"md"}>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink className="link" href="#headline1" ><h2>Students</h2></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="link" href="#headline2" ><h2>Teachers</h2></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="link" href="#headline3" ><h2>Administrators</h2></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="link" href="#headline4" ><h2>Parents</h2></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="link" href="#headline5" ><h2>Contact Us</h2></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="link" href="#" ><h2>Sign in</h2></NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}


export default AboutBar