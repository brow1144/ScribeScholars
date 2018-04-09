import React from 'react'
import { NavLink } from 'react-router-dom'


import logo from '../logo.svg';

import '../HomePage/Side.css'



const SettingsSide = () => {
    return (
        <div>
            <NavLink style={{ textDecoration: 'none' }} to={`/ScribeScholars/HomePage`}>
                <img src={logo} alt="Logo" />
            </NavLink>

            <NavLink style={{ textDecoration: 'none', color: 'black' }} to={`/ScribeScholars/createAnnouncements`}>
                <p className="classOne" >Make Announcement</p>
            </NavLink>


            <NavLink style={{ textDecoration: 'none' , color: 'black' }} to={`/ScribeScholars/setRoomPicture`}>
                <p className="classOne" >Set Classroom Picture</p>
            </NavLink>


        </div>
    )
};

export default SettingsSide

