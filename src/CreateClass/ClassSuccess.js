import React, { Component } from 'react';

import './ClassSuccess.css'
import { NavLink } from 'react-router-dom'
import { Button, Row, Col } from 'reactstrap'

import logo from '../logo.svg'

class ClassSuccess extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: this.props.uid,
      className: this.props.className,
      code: this.props.code,
    };
  }

  render() {
    return (
      <div className="center">

        <img src={logo} alt="" width="100" height="100"/>

        <div className="title">
          <h2 className = "h2 font-weight-normal">Successfully created {this.state.className}!</h2>
          <h2 className = "h2 font-weight-normal">Class code: {this.props.code}</h2>

          <Row>
            <Col sm={{ size: 4, offset: 4 }}>
                <NavLink style={{ textDecoration: 'none' }} to="/create-account">
                  <Button type="submit" className="homeButton" size="md" block>Return Home!</Button>
                </NavLink>
            </Col>
          </Row>

        </div>

      </div>
    )
  }
}

export default ClassSuccess;