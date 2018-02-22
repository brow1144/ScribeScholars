import React, { Component } from 'react'

import { NavLink } from 'react-router-dom'

import { firestore } from "../base";

import logo from '../logo.svg';
import defaultUser from './defUser.png'

import './Side.css'

class Side extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      uid: props.uid,
      userImage: null,
    });
  }

  /**
   *
   * Method called when component is about to load
   *
   * 1. Calls firestore and attempts to get userImageURL
   *    for the image in the side bar.
   *
   */
  componentWillMount() {
    // Add Firebase Code to get image.
    let docRef = firestore.collection("users").doc(this.state.uid);
    let self = this;

    docRef.get().then(function(doc) {
      if (doc.exists) {
        self.setState({
          userImage: doc.data().userImage,
        });

      } else {
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    })
  }

  render() {
    return (
      <div>
        <NavLink style={{textDecoration: 'none'}} to={`/HomePage`}>
          <img className="logo" src={logo} alt="Logo"/>
        </NavLink>

        {this.props.classes != null && Object.keys(this.props.classes).map((key, index) => {
          return <NavLink key={key} style={{textDecoration: 'none'}}
                          to={`/HomePage/${this.props.classes[index].class}`}>
            <p className="classSide">{this.props.classes[index].class}</p>
          </NavLink>
        })}

        {this.state.userImage
          ?
          <NavLink style={{textDecoration: 'none'}} to={`/settings`}>
            <img className="settingsLogo"
                 src={this.state.userImage}
                 alt="userIcon"/>
          </NavLink>
          :
          <NavLink style={{textDecoration: 'none'}} to={`/settings`}>
            <img className="settingsLogo"
                 src={defaultUser}
                 alt="userIcon"/>
          </NavLink>
        }

        </div>
      )
    }
  }


export default Side
