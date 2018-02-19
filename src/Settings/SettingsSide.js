import React from 'react'

import { NavLink } from 'react-router-dom'


import logo from '../logo.svg';

import '../HomePage/Side.css'

const SettingsSide = (props) => {
    return (
        <div>
            <NavLink style={{ textDecoration: 'none' }} to={`/HomePage`}>
                <img src={logo} alt="Logo" />
            </NavLink>


            <NavLink onClick={props.flipp} style={{ textDecoration: 'none' }} to={`/settings/personal`}>
                <p  className="classOne">Personal</p>
            </NavLink>


            <NavLink onClick={props.flipc} style={{ textDecoration: 'none' }} to={`/settings/classroom`}>
                <p className="classOne" >Classroom</p>
            </NavLink>


        </div>
    )
};

export default SettingsSide
