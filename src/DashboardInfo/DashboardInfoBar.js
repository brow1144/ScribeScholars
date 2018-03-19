import React, { Component } from 'react';
import { NavbarToggler, Collapse, Navbar, Nav, NavItem, NavLink } from 'reactstrap';

import './DashboardInfoBar.css';

class DashboardInfoBar extends Component {

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

    render() {
        return (
            <div className="main navT">
                <Navbar className="bg-dark"  expand={"md"}>
                    <NavbarToggler onClick={this.toggleNavbar} color={"black"} className="mr-2" />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="link" href="#Overview" ><h2>Overview</h2></NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}


export default DashboardInfoBar