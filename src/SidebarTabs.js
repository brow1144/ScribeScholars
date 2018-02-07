import React from 'react'

import { Link } from 'react-router-dom'

import logo from './logo.svg';

import './SidebarTabs.css'

const Sidebar = () => {
  return (
    <div>
      <img src={logo} alt="Logo" />
      <hr />
      <Link style={{ textDecoration: 'none' }} to="">
        <p className="classOne" >CS 307</p>
      </Link>
      <hr />
    </div>
  )
}

export default Sidebar
