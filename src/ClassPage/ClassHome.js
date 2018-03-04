import React, { Component } from 'react';

import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';

import './ClassHome.css';

class ClassHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  render() {

    return (
      <div>
        <div className="jumbotron">
          <h1>CS 307</h1>
          <p className="lead"> Jeff Turkstra</p>
        </div>

        <Nav horizontal="center" tabs>
          <NavItem>
            <NavLink className="navLinks" href="#" active={this.state.active}>Announcements</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="navLinks" href="#" active={this.state.active}>In-Class Lessons</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="navLinks" href="#" active={this.state.active}>Homework</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="navLinks" href="#" active={this.state.active}>Discussion Board</NavLink>
          </NavItem>
        </Nav>

      </div>
  )
  }
}

export default ClassHome;
