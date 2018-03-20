 import React, { Component } from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Col, Row } from 'reactstrap';

import './HomeNav.css'

class HomeNav extends Component {

  render() {
    if (this.props.width < 600) {

      return (
        <div>
          <Navbar color="faded" light>
            <NavbarBrand className="userName mr-auto">{this.props.firstName} {this.props.lastName}</NavbarBrand>
            <NavbarToggler onClick={this.props.expand} className="mr-2"/>
          </Navbar>
        </div>
      );
    } else {
      let gpa;
      if (this.props.showGPA)
        gpa = "GPA: " + this.props.gpa;

      return (
        <div>
          <Navbar color="faded" light>
            <NavbarBrand className="userName mr-auto">
              {this.props.firstName} {this.props.lastName} {gpa}
            </NavbarBrand>
          </Navbar>
        </div>
      );

      /*return (
        <div>
          <Col sm={6}>
            <Navbar color="faded" light>
              <NavbarBrand className="userName mr-auto">
                {this.props.firstName} {this.props.lastName} {gpa}
              </NavbarBrand>
            </Navbar>
          </Col>
          <Col sm={6}>
            <Navbar color="faded" light>
              <NavbarBrand className="userName mr-auto">
                {"GPA: "} {this.props.gpa}
              </NavbarBrand>
            </Navbar>
          </Col>
        </div>
      )*/
    }
  }
};

export default HomeNav