import React from 'react'

import { NavLink } from 'react-router-dom'

import logo from '../logo.svg';

import './Side.css'

const Sidebar = (props) => {
  return (
    <div>
      <NavLink style={{ textDecoration: 'none' }} to={`/HomePage`}>
        <img src={logo} alt="Logo" />
      </NavLink>

      {Object.keys(props.classes).map((key, index) => {
        return <NavLink key={key} style={{ textDecoration: 'none' }} to={`/HomePage/${props.classes[index]}`}>
                  <p className="classOne"  >{props.classes[index]}</p>
               </NavLink>
      })}

      <NavLink style={{ textDecoration: 'none' }} to={`/settings`}>
        <i className="fas fa-cogs fa-2x settingsLogo" />
      </NavLink>

    </div>
  )
};

export default Sidebar
