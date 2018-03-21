 import React, { Component } from 'react';
import { Navbar, NavbarToggler, NavbarBrand } from 'reactstrap';

import './HomeNav.css'

class HomeNav extends Component {

  render() {
    if (this.props.width < 600) {
      let gpa;
      if (this.props.showGPA)
        gpa = " - GPA: " + this.props.gpa;

      return (
        <div>
          <Navbar color="faded" light>
            <NavbarBrand className="userName mr-auto">{this.props.firstName} {this.props.lastName} {gpa}</NavbarBrand>
            <NavbarToggler onClick={this.props.expand} className="mr-2"/>
          </Navbar>
        </div>
      );
    } else {
      let gpa;
      if (this.props.showGPA)
        gpa = " - GPA: " + this.props.gpa;

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