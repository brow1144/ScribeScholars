import React, { Component } from 'react'

import { NavLink } from 'react-router-dom'

import logo from '../logo.svg';

import './Side.css'

class Sidebar extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <NavLink style={{textDecoration: 'none'}} to={`/HomePage`}>
          <img className="logo" src={logo} alt="Logo"/>
        </NavLink>

        {Object.keys(this.props.classes).map((key, index) => {
          return <NavLink key={key} style={{textDecoration: 'none'}} to={`/HomePage/${this.props.classes[index].class}`}>
            <p className="classSide">{this.props.classes[index].class}</p>
          </NavLink>
        })}

        <NavLink style={{textDecoration: 'none'}} to={`/settings`}>
          <img className="settingsLogo"
               src={"https://firebasestorage.googleapis.com/v0/b/scribescholars-ad86f.appspot.com/o/userImage.jpg?alt=media&token=c3319c17-22b0-46de-9fcc-ca7bde927d9d"}
               alt="userIcon"/>
        </NavLink>

      </div>
    )
  }
};

export default Sidebar
