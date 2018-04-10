import React, { Component } from 'react';
import { NavbarToggler, Collapse, Navbar, Nav, NavItem, NavLink } from 'reactstrap';

import './AboutBar.css';

class AboutBar extends Component {

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    /* To do
     * Make background image disappear on small screens
     * Add transition effects
     */

    render() {
        return (
            <div className="main navT">
                <Navbar className="bg-light" light  expand={"md"}>
                    <NavbarToggler onClick={this.toggleNavbar} color={"white"} light className="mr-2" />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="link" href="#Mission" ><h2>Mission</h2></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="link" href="#Students" ><h2>Students</h2></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="link" href="#Teachers" ><h2>Teachers</h2></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="link" href="#Administrators" ><h2>Administrators</h2></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="link" href="#Parents" ><h2>Parents</h2></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="link" href="#Contact-Us" ><h2>Contact Us</h2></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="link" href="/ScribeScholars/sign-in"><h2>Sign in</h2></NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}


export default AboutBar