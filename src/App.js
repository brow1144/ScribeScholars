import React, { Component } from 'react';

import firebase from './base.js';

import { Route, Switch, Redirect } from 'react-router-dom';

import SignIn from './Sigin/SignIn';
import About from './About/AboutPage';
import CreateAccount from './CreateAccount/CreateAccount';
import Main from './Main';
import Homework from './Classroom/Homework';

import CreateClass from './CreateClass/CreateClass';
import ClassSuccess from './CreateClass/ClassSuccess';

import './App.css';
import Announcements from "./Announcements/Announcements";
import CreateAnn from "./Announcements/CreateAnn";
import SetRoomPic from "./Announcements/SetRoomPicture";


class App extends Component {

  constructor() {
    super();


    this.state = {
      uid: null,
    }
  }

  componentWillMount() {
    this.getUserFromLocalStorage();
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          // finished signing in
          this.authHandler(user)
        } else {
          // finished signing out
          this.setState({ uid: null })
        }
      }
    )
  }

  getUserFromLocalStorage() {
    const uid = localStorage.getItem('uid');
    if (!uid) return;
    this.setState({ uid })
  }

  authHandler = (user) => {
    localStorage.setItem('uid', user.uid);
    this.setState(
      { uid: user.uid },
    )
  };

  signedIn = () => {
    return this.state.uid
  };

  render() {
    return (
      <Switch>

        <Route path='/HomePage' render={() => (
          this.signedIn()
            ? <Main page={"home"} uid={this.state.uid}/>
            : <Redirect to="/About" />
        )} />

        <Route exact path='/sign-in' render={() => (
          !this.signedIn()
            ? <SignIn />
            : <Redirect to="/HomePage" />
        )} />

          <Route path='/About' render={() => (
              <About />
          )} />

          <Route path='/Announcements' render={() => (
              this.signedIn()
                  ? <Announcements />
                  : <Redirect to="/About" />
          )} />

          <Route path='/CreateAnnouncements' render={() => (
              this.signedIn()
                  ? <CreateAnn/>
                  : <Redirect to="/About" />
          )} />

          <Route path='/SetRoomPicture' render={() => (
              this.signedIn()
                  ? <SetRoomPic/>
                  : <Redirect to="/About" />
          )} />

        <Route exact path='/create-account' render={() => (
            !this.signedIn()
                ? <CreateAccount />
                :<Redirect to="/HomePage" />
        )} />

        <Route exact path='/create-class' render={() => (
          this.signedIn()
            ? <CreateClass uid={this.state.uid}/>
            : <Redirect to="/About" />
        )} />
                                                       
        <Route exact path='/create-class-success' render={() => (
          this.signedIn()
            ? <ClassSuccess uid={this.state.uid}/>
            : <Redirect to="/About" />

        )} />

        <Route path='/settings' render={() => (
          this.signedIn()
            ? <Main page={"settings"} uid={this.state.uid}/>
            : <Redirect to="/About" />
        )} />

          <Route path='/homework' render={() => (
              this.signedIn()
                  ? <Homework/>
                  : <Redirect to="/About" />
          )} />

        <Route render={() => <Redirect to="/HomePage" />} />

      </Switch>
    );
  }
}

export default App;
