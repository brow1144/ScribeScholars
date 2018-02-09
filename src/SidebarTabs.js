import React from 'react'

import { NavLink } from 'react-router-dom'

import logo from './logo.svg';

import './SidebarTabs.css'

const Sidebar = () => {
  return (
    <div>
      <img src={logo} alt="Logo" />
      <hr />
      <NavLink style={{ textDecoration: 'none' }} to={`/HomePage/cs307`}>
        <p className="classOne" >CS 307</p>
      </NavLink>
      <hr />
    </div>
  )
}

export default Sidebar
