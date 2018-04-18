import React, {Component} from 'react';

import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';

import firebase from './base.js';

import SignIn from './Sigin/SignIn';
import About from './About/AboutPage';
import CreateAccount from './CreateAccount/CreateAccount';
import Main from './Main';
import LiveFeed from './ClassPage/LiveFeed';
import CreateClass from './CreateClass/CreateClass';
import ClassSuccess from './CreateClass/ClassSuccess';
import Announcements from "./Announcements/Announcements";
import CreateAnn from "./Announcements/CreateAnn";
import SetRoomPic from "./Announcements/SetRoomPicture";
import DashboardInfo from "./DashboardInfo/DashboardInfoPage";
import MyStudents from "./MyStudents/MyStudents";
import MakeWork from "./WorkForm/MakeWork";
import ForgotPassword from './Sigin/ForgotPassword';
import CreateActivity from './CreateActivity/CreateActivity';


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
          this.setState({uid: null}, () => {
            // window.location.reload();
          });
        }
      }
    )
  }

  getUserFromLocalStorage() {
    const uid = localStorage.getItem('uid');
    if (!uid) return;
    this.setState({uid})
  }

  authHandler = (user) => {
    localStorage.setItem('uid', user.uid);
    this.setState(
      {uid: user.uid},
    )
  };

  signedIn = () => {
    return this.state.uid
  };

  render() {
    return (
      <Switch>

        <Route path='/ScribeScholars/HomePage' render={() => (
          this.signedIn()
            ? <Main page={"home"} uid={this.state.uid}/>
            : <Redirect to="/ScribeScholars/About"/>
        )}/>

        <Route path='/ScribeScholars/LiveFeed' render={() => (
          this.signedIn()
            ? <LiveFeed uid={this.state.uid}/>
            : <Redirect to="/ScribeScholars/About"/>
        )}/>

        <Route path='/ScribeScholars/sign-in' render={() => (
          !this.signedIn()
            ? <SignIn/>
            : <Redirect to="/ScribeScholars/HomePage"/>
        )}/>

        <Route exact path='/ScribeScholars/forgotPassword' render={() => (
          !this.signedIn()
            ? <ForgotPassword />
            : <Redirect to="/ScribeScholars/HomePage"/>
        )}/>

        <Route path='/ScribeScholars/About' render={() => (
          <About/>
        )}/>

        <Route path='/ScribeScholars/DashboardInfo' render={() => (
          this.signedIn()
            ? <DashboardInfo/>
            : <Redirect to="/ScribeScholars/About"/>
        )}/>

        <Route path='/ScribeScholars/MyStudents' render={() => (
          this.signedIn()
            ? <MyStudents/>
            : <Redirect to="/ScribeScholars/About"/>
        )}/>

        <Route path='/ScribeScholars/Announcements' render={() => (
          this.signedIn()
            ? <Announcements/>
            : <Redirect to="/ScribeScholars/About"/>
        )}/>

        <Route path='/ScribeScholars/CreateAnnouncements' render={() => (
          this.signedIn()
            ? <CreateAnn/>
            : <Redirect to="/ScribeScholars/About"/>
        )}/>

        <Route path='/ScribeScholars/SetRoomPicture' render={() => (
          this.signedIn()
            ? <SetRoomPic/>
            : <Redirect to="/ScribeScholars/About"/>
        )}/>

        <Route path='/ScribeScholars/MakeWork' render={() => (
          this.signedIn()
            ? <MakeWork/>
            : <Redirect to="/ScribeScholars/About"/>
        )}/>

        <Route exact path='/ScribeScholars/create-account' render={() => (
          !this.signedIn()
            ? <CreateAccount/>
            : <Redirect to="/ScribeScholars/HomePage"/>
        )}/>

        <Route exact path='/ScribeScholars/create-class' render={() => (
          this.signedIn()
            ? <CreateClass uid={this.state.uid}/>
            : <Redirect to="/ScribeScholars/About"/>
        )}/>

        <Route exact path='/ScribeScholars/create-class-success' render={() => (
          this.signedIn()
            ? <ClassSuccess uid={this.state.uid}/>
            : <Redirect to="/ScribeScholars/About"/>

        )}/>

        <Route path='/ScribeScholars/settings' render={() => (
          this.signedIn()
            ? <Main page={"settings"} uid={this.state.uid}/>
            : <Redirect to="/ScribeScholars/sign-in"/>
        )}/>

        <Route render={() => <Redirect to="/ScribeScholars/HomePage"/>}/>

        <Route exact path='/ScribeScholars/create-activity' render={() => (
          this.signedIn()
            ? <CreateActivity uid={this.state.uid}/>
            : <Redirect to="/ScribeScholars/About"/>
        )}/>

        <Route render={() => <Redirect to='/ScribeScholars/HomePage'/>}/>


      </Switch>
    );
  }
}

export default App;
