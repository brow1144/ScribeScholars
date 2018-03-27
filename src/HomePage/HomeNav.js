 import React, { Component } from 'react';
import { Navbar, NavbarToggler, NavbarBrand } from 'reactstrap';

import './HomeNav.css'

class HomeNav extends Component {

  render() {
    let gpa;
    if (this.props.role === "student" && this.props.showGPA)
      gpa = " - GPA: " + this.props.gpa;

    if (this.props.width < 600) {
      return (
        <div>
          <Navbar color="faded" light>
            <NavbarBrand className="userName mr-auto">{this.props.firstName} {this.props.lastName} {gpa}</NavbarBrand>
            <NavbarToggler onClick={this.props.expand} className="mr-2"/>
          </Navbar>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar color="faded" light>
            <NavbarBrand className="userName mr-auto">{this.props.firstName} {this.props.lastName} {gpa}</NavbarBrand>
          </Navbar>
        </div>
      );
    }
  }
}

export default HomeNav