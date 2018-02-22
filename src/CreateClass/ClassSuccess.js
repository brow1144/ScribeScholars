import React, { Component } from 'react';

import './ClassSuccess.css'
import logo from '../logo.svg'

class ClassSuccess extends Component {

  constructor() {
    super();

    this.state = {
      uid: '',
      code: '',
    };
  }

  render() {
    return (
      <div className = "title">
        <img src={logo} alt="" width="100" height="100"/>
        <h3 className = "h3 font-weight-normal">Successfully created!</h3>
      </div>
    )
  }
}

export default ClassSuccess;