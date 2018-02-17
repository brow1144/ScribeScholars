import React from 'react';
import { Navbar, NavbarToggler, NavbarBrand } from 'reactstrap';

const HomeNav = (props) => {

  if (props.width <= 800 ) {
    return (
      <div>
        <Navbar color="faded" light>
          <NavbarBrand className="mr-auto">Kyle Brown</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
        </Navbar>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar color="faded" light>
          <NavbarBrand className="mr-auto">Kyle Brown</NavbarBrand>
        </Navbar>
      </div>
    );
  }
};

export default HomeNav