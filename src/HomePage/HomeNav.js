import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink } from 'reactstrap';

class HomeNav extends Component {
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
      <div>
        <Navbar color="faded" light>
          <NavbarBrand className="mr-auto">Kyle Brown</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            {/*<Nav navbar>*/}
              {Object.keys(this.props.classes).map((key, index) => {
                return <NavLink key={key} style={{ textDecoration: 'none' }} to={`/HomePage/${this.props.classes[index].class}`}>
                  <a>{this.props.classes[index].class}</a>
                        </NavLink>
              })}
            {/*</Nav>*/}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default HomeNav