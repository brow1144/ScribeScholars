import React from 'react'

import { NavLink } from 'react-router-dom'


import logo from '../logo.svg';

import '../HomePage/Side.css'

const SettingsSide = () => {
    return (
        <div>
            <NavLink style={{ textDecoration: 'none' }} to={`/HomePage`}>
                <img src={logo} alt="Logo" />
            </NavLink>

            <NavLink style={{ textDecoration: 'none' }} to={`/Announcements`}>
                <p className="classOne" >Announcements</p>
            </NavLink>

            <NavLink style={{ textDecoration: 'none' }} to={`/createAnnouncements`}>
                <p className="classOne" >Make Announcement</p>
            </NavLink>


            <NavLink style={{ textDecoration: 'none' }} to={`/settings/classroom`}>
                <p className="classOne" >Set Classroom Picture</p>
            </NavLink>


        </div>
    )
};

export default SettingsSide