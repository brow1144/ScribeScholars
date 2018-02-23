import React, { Component } from 'react';

import firebase from './base.js';
import { firestore } from "./base.js";

import { Route, Switch, Redirect } from 'react-router-dom';

import SignIn from './Sigin/SignIn';
import About from './About/AboutPage';
import CreateAccount from './CreateAccount/CreateAccount';
import Main from './Main';

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

  /**
   *
   * Call firebase to get users array of classes
   * that hold their teachers uid.
   *
   * When then use the uid of the teacher to compare with her
   * classroom data.
   *
   */
  getClasses = () => {
    let docRef = firestore.collection("users").doc(this.state.uid);
    let self = this;

    docRef.get().then(function(doc) {
      if (doc.exists) {
        if (doc.data().classes !== null) {
          self.setState({
            classes: doc.data().classes,
          });
          self.getDeadlines();
          self.getAnnouncements();
        }
        if (doc.data().firstName !== null && doc.data().lastName !== null && doc.data().role !== null) {
          self.setState({
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            role: doc.data().role,
          });
        }
      } else {
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    })
  };

  /**
   *
   * Now that we have the teacher uid and the students
   * array of classes,
   *
   * 1. We got to the teachers uid and find her classes
   *
   * 2. When then find the classes that correlate with the
   *    student and the teacher
   *
   * 3. Then we get the deadlines from the central classroom data
   *    and set state to update the calendar
   *
   */
  getDeadlines = () => {

    let object = [{}];

    let self = this;

    for(let j in self.state.classes) {

      let docRef = firestore.collection("classes").doc(self.state.classes[j].code);

      docRef.get().then(function (doc) {
        if (doc.exists) {
          let data = doc.data();
          for (let i in data.deadlines) {
            if (data.deadlines.hasOwnProperty(i)) {
              object.unshift({
                title: data.deadlines[i].title,
                start: new Date(data.deadlines[i].startYear, data.deadlines[i].startMonth, data.deadlines[i].startDay, data.deadlines[i].startHour, data.deadlines[i].startMinute, 0),
                end: new Date(data.deadlines[i].endYear, data.deadlines[i].endMonth, data.deadlines[i].endDay, data.deadlines[i].endHour, data.deadlines[i].endMinute, 0),
              });
              self.setState({
                dates: object,
              })
            }
          }
        } else {
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    }
    object.pop();

    self.setState({
      dates: object
    });
  };

  /**
   *
   * Now that we have the class code and the students
   * array of classes,
   *
   * 1. We go to the class code and find her classes
   *
   * 2. We then find the classes that correlate with the
   *    student and the teacher
   *
   * 3. Then we get the announcements from the central classroom data
   *    and set state to update the calendar
   *
   */
  getAnnouncements = () => {

    let object = [{}];

    let self = this;

    for(let j in self.state.classes) {

      let docRef = firestore.collection("classes").doc(self.state.classes[j].code);

      docRef.get().then(function (doc) {
        if (doc.exists) {
          let data = doc.data();
          for (let i in data.Announcements) {
            if (data.Announcements.hasOwnProperty(i)) {
              object.unshift({
                class: self.state.classes[j].class,
                title: data.Announcements[i].title,
                subtitle: data.Announcements[i].subtitle,
                message: data.Announcements[i].message,
              });
              self.setState({
                announcements: object,
              })
            }
          }
        } else {
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    }
    object.pop();

    self.setState({
      announcements: object
    });

  };

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
            : <Redirect to="/sign-in" />
        )} />

        <Route render={() => <Redirect to="/HomePage" />} />

      </Switch>
    );
  }
}

export default App;
