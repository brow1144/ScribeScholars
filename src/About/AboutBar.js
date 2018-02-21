import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

import './AboutBar.css';

class AboutBar extends Component {

    render() {
        return (
            <div className={"container"}>
                <Nav>
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
            </div>
        );
    }
}


export default AboutBar