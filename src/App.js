import React, { Component } from 'react';

import firebase from './base.js';

import { Route, Switch, Redirect } from 'react-router-dom';

import SignIn from './SignIn';
import HomePage from './HomePage';
import Settings from './Settings';
import About from './AboutPage';

import './App.css';

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
            ? <HomePage />
            : <Redirect to="/sign-in" />
        )} />

        <Route exact path='/sign-in' render={() => (
          !this.signedIn()
            ? <SignIn />
            : <Redirect to="/HomePage" />
        )} />

          <Route exact path='/About' render={() => (
              <About />
          )} />

        <Route exact path='/CreateAccount' render={() => (
            !this.signedIn()
                ? <CreateAccount />
                : <Redirect to="/HomePage" />
        )} />

        <Route path='/settings' render={() => (
          this.signedIn()
            ? <Settings />
            : <Redirect to="/sign-in" />
        )} />

        <Route render={() => <Redirect to="/HomePage" />} />

      </Switch>
    );
  }
}

export default App;
