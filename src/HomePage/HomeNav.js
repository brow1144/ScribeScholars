 import React, { Component } from 'react';
import { Navbar, NavbarToggler, NavbarBrand } from 'reactstrap';

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

      return (
        <div>
          <Navbar color="faded" light>
            <NavbarBrand className="userName mr-auto">{this.props.firstName} {this.props.lastName}</NavbarBrand>
          </Navbar>
        </div>
      );
    }
  }
};

export default HomeNav