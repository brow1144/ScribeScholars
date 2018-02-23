import React, { Component } from 'react';

import './ClassSuccess.css'
import { NavLink } from 'react-router-dom'
import { Button } from 'reactstrap'

import logo from '../logo.svg'

class ClassSuccess extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: this.props.uid,
      className: this.props.className,
    };
  }

  render() {
    return (
      <div className="center">

        <img src={logo} alt="" width="100" height="100"/>

        <div className="title">
          <h2 className = "h2 font-weight-normal">Successfully created {this.state.className}!</h2>

          <NavLink style={{ textDecoration: 'none' }} to="/create-account">
            <div className="center">
              <Button type="submit" className="homeButton" size="lg" block>Return Home!</Button>
            </div>
          </NavLink>

        </div>

      </div>
    )
  }
}

export default ClassSuccess;