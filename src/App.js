import React, { Component } from 'react';

import firebase from './base.js';

import { Route, Switch, Redirect } from 'react-router-dom';

import SignIn from './Sigin/SignIn';
import HomePage from './HomePage/HomePage';
import Settings from './Settings/Settings';
import About from './About/AboutPage';
import CreateAccount from './CreateAccount/CreateAccount';
import ResetPassword from './CreateAccount/ResetPassword';

import './App.css';
import SetPersonal from "./Settings/SetPersonal";

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
            ? <HomePage uid={this.state.uid}/>
            : <Redirect to="/sign-in" />
        )} />

        <Route exact path='/sign-in' render={() => (
          !this.signedIn()
            ? <SignIn />
            : <Redirect to="/HomePage" />
        )} />

          <Route path='/About' render={() => (
              <About />
          )} />

        <Route exact path='/create-account' render={() => (
            !this.signedIn()
                ? <CreateAccount />
                : <Redirect to="/HomePage" />
        )} />

        <Route path='/settings' render={() => (
          this.signedIn()
            ? <Settings uid={this.state.uid} />
            : <Redirect to="/sign-in" />
        )} />

        <Route path='/settings/personal' render={() => (
          this.signedIn()
            ? <SetPersonal uid={this.state.uid} />
            : <Redirect to="/sign-in" />
        )} />

        <Route exact path='/reset-password' render={() => (
          <ResetPassword />
          )} />

        <Route render={() => <Redirect to="/HomePage" />} />

      </Switch>
    );
  }
}

export default App;
