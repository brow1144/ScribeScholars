import React from 'react'

import { NavLink } from 'react-router-dom'

import logo from '../logo.svg';

import './SettingsSide.css'

const SettingsSide = (props) => {
    return (
        <div>
            <NavLink style={{ textDecoration: 'none' }} to={`/HomePage`}>
                <img className="logo" src={logo} alt="Logo" />
            </NavLink>


            <NavLink onClick={props.flipp} style={{ textDecoration: 'none' }} to={`/settings/Personal`}>
                <p  className="settingsSide">Personal</p>
            </NavLink>


            <NavLink onClick={props.flipc} style={{ textDecoration: 'none' }} to={`/settings/Classroom`}>
                <p className="settingsSide" >Classroom</p>
            </NavLink>


        </div>
    )
};

export default SettingsSide
