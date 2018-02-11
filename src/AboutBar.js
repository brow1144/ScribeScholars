import React from 'react';
import { NavLink } from 'react-router-dom'

import './AboutBar.css'

class AboutBar extends React.Component {

    render() {
        return (
            <div className={"grid"}>
                <NavLink style={{ textDecoration: 'none' }} to={`/About/Student`}>
                    <p className="button" >Students</p>
                </NavLink>

                <NavLink style={{ textDecoration: 'none' }} to={`/About/Teacher`}>
                    <p className="button" >Teachers</p>
                </NavLink>
                <NavLink style={{ textDecoration: 'none' }} to={`/About/Administrator`}>
                    <p className="button" >Administrators</p>
                </NavLink>
                <NavLink style={{ textDecoration: 'none' }} to={`/About/Parent`}>
                    <p className="button" >Parents</p>
                </NavLink>
            </div>
        );
    }
}

export default AboutBar