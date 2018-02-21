import React from 'react';
import { Navbar, NavbarToggler, NavbarBrand } from 'reactstrap';

import './HomeNav.css'

const HomeNav = (props) => {

  if (props.width < 600 ) {
    return (
      <div>
        <Navbar color="faded" light>
          <NavbarBrand className="userName mr-auto">Kyle Brown</NavbarBrand>
          <NavbarToggler onClick={props.expand} className="mr-2"/>
        </Navbar>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar color="faded" light>
          <NavbarBrand className="userName mr-auto">Kyle Brown</NavbarBrand>
        </Navbar>
      </div>
    );
  }
};

export default HomeNav