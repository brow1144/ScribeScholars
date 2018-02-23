import React from 'react'
import {Badge} from 'reactstrap';
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
                <p className="classOne" >Announcements<Badge color='secondary'>3</Badge></p>
            </NavLink>

            <NavLink style={{ textDecoration: 'none' }} to={`/createAnnouncements`}>
                <p className="classOne" >Make Announcement</p>
            </NavLink>


            <NavLink style={{ textDecoration: 'none' }} to={`/setRoomPicture`}>
                <p className="classOne" >Set Classroom Picture</p>
            </NavLink>


        </div>
    )
};

export default SettingsSide