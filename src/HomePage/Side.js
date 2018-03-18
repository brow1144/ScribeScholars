import React, { Component } from 'react'

import { NavLink } from 'react-router-dom'

import { firestore } from "../base";

import logo from '../logo.svg';
import defaultUser from './defUser.png'

import './Side.css'
import '../Settings/SettingsSide.css'
import { fireauth } from '../base'


class Side extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      page: this.props.page,
      uid: props.uid,
      userImage: this.props.userImage,
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
        self.props.updateUserImage(doc.data().userImage);
      } else {
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    })
  }

  firebaseOut = () => {
      fireauth.signOut().then(() => {
          console.log("User Signed out")
      })
  };

  handleSignOut = () => {
      localStorage.removeItem('uid');
      this.setState({ uid: null, });
      this.firebaseOut();
      window.location.reload();
  };

  render() {
    if (this.props.page === "home" || this.props.page === "classes") {
      return (
        <div>
          <NavLink style={{textDecoration: 'none'}} to={`/HomePage`}>
            <img className="logo" src={logo} alt="Logo"/>
          </NavLink>

          {this.props.classes != null && Object.keys(this.props.classes).map((key, index) => {
            return <NavLink onClick={() => this.props.selectClass(this.props.classes[index].code)} key={key} style={{textDecoration: 'none'}}
                            to={`/HomePage/${this.props.classes[index].code}`}>
                      <p className="classSide">{this.props.classes[index].class}</p>
                   </NavLink>
          })}

          {this.props.userImage
            ?
            <NavLink style={{textDecoration: 'none'}} to={`/settings`}>
              <img className="settingsLogo"
                   src={this.props.userImage}
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
    } else if (this.props.page === "settings") {
      return (
        <div>
          <NavLink style={{textDecoration: 'none'}} to={`/HomePage`}>
            <img className="logo" src={logo} alt="Logo"/>
          </NavLink>

          <NavLink onClick={this.props.flipPersonal} style={{ textDecoration: 'none' }} to={`/settings/Personal`}>
            <p  className="settingsSide">Personal</p>
          </NavLink>

          <NavLink onClick={this.props.flipClass} style={{ textDecoration: 'none' }} to={`/settings/Classroom`}>
            <p className="settingsSide" >Classroom</p>
          </NavLink>

            <NavLink onClick={this.handleSignOut} style={{textDecoration: 'none'}} to={`/settings`}>
                <i className="fas fa-sign-out-alt singOutIcon"/>
            </NavLink>

        </div>
      )
    }
    }
  }

export default Side
