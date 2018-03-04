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
            <div className="text-center">
                <div className="Absolute-Center is-Responsive">

                    <img src={logo} alt="" width="100" height="100"/>

                    <h2 className = "h2 font-weight-normal">Successfully created {this.state.className}!</h2>
                    <h2 className = "h2 font-weight-normal">Class code: {this.props.code}</h2>

                    <div className="spacing"/>

                    <NavLink style={{ textDecoration: 'none' }} to="/create-account">
                        <Button type="submit" className="homeButton" size="lg" block>Return Home!</Button>
                    </NavLink>

                </div>

            </div>
        )
    }
}

export default ClassSuccess;