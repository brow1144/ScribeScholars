import React, { Component } from 'react';

import { firestore } from "./base.js";

import { Route, Switch } from 'react-router-dom';

import HomePage from './HomePage/HomePage';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {

      page: this.props.page,

      selectedClass: null,
      className: null,

      classAnnouncements: [{
        title: null,
        subtitle: null,
        message: null,
        class: null,
      }],

      uid: this.props.uid,

      userImage: null,

      classImage: null,

      role: null,

      classes: [{
        class: null,
        teacher: null,
        code: null,
      }],

      dates: [{
        title: null,
        start: null,
        end: null,
      }],

      announcements: [{
        title: null,
        subtitle: null,
        message: null,
        class: null,
      }],
    }
  }

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
        self.updateDates(self.state.dates);
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
          for (let i in data.announcements) {
            if (data.announcements.hasOwnProperty(i)) {
              object.unshift({
                class: data.announcements[i].class,
                title: data.announcements[i].title,
                subtitle: data.announcements[i].subtitle,
                message: data.announcements[i].message,
              });
              self.setState({
                announcements: object,
              })
            }
          }
        } else {
          console.log("No such document!");
        }
        self.updateAnnouncements(self.state.announcements);
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    }
    object.pop();

    self.setState({
      announcements: object
    });
  };

  getClassImage = (classImage) => {
    let docRef = firestore.collection("classes").doc(classImage);
    let self = this;

    docRef.get().then(function(doc) {
      if (doc.exists) {
        self.setState({
          classImage: doc.data().classImage,
        });

      } else {
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    })
  };

  updateClasses = (classes) => {
    this.setState({
      classes: classes,
    });
    this.getAnnouncements();
    this.getDeadlines();
  };

  updateDates = (dates) => {
    this.setState({
      dates: dates,
    })
  };

  updateAnnouncements = (announcements) => {
    this.setState({
      announcements: announcements,
    })
  };

  updateRole = (role) => {
    this.setState({
      role: role,
    })
  };

  updateUserImage = (userImage) => {
    this.setState({
      userImage: userImage,
    })
  };

  selectClass = (classCode) => {
    //console.log(classCode);
    this.setState({
      selectedClass: classCode,
    });
    this.getClassAnnouncments(classCode);
    this.getClassImage(classCode);
  };

  updateClassPicture =(classImage) => {
    this.setState({
      classImage: classImage,
    });
    this.getClassImage(classImage);
  };

  getClassAnnouncments = (classCode) => {

    let object = [{}];

    let self = this;

    let docRef = firestore.collection("classes").doc(classCode);

    docRef.get().then(function (doc) {
      if (doc.exists) {
        let data = doc.data();
        self.setState({
          className: data.class,
        });
        for (let i in data.announcements) {
          if (data.announcements.hasOwnProperty(i)) {
            object.unshift({
              class: data.announcements[i].class,
              title: data.announcements[i].title,
              subtitle: data.announcements[i].subtitle,
              message: data.announcements[i].message,
            });
            self.setState({
              classAnnouncements: object,
            })
          }}
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

    object.pop();

    self.setState({
      classAnnouncements: object
    });
  };

  render() {

    const data = {
      uid: this.state.uid,
      classes: this.state.classes,
      dates: this.state.dates,
      announcements: this.state.announcements,
      userImage: this.state.userImage,
      selectedClass: this.state.selectedClass,
      className: this.state.className,
      classAnnouncements: this.state.classAnnouncements,
      classImage: this.state.classImage,
    };

    const actions = {
      updateClasses: this.updateClasses,
      updateDates: this.updateDates,
      updateRole: this.updateRole,
      updateAnnouncements: this.updateAnnouncements,
      updateUserImage: this.updateUserImage,
      selectClass: this.selectClass,
      updateClassPicture: this.updateClassPicture,
      getClassAnnouncments: this.getClassAnnouncments
    };

    return (
      <Switch>

        <Route path="/HomePage/:class/lessons/:lessonNumber" render={() => (
          <HomePage
            page="liveFeed"
            {...data}
            {...actions}
          />
        )}/>

        <Route path="/homepage/:class" render={(match) => (
          <HomePage
            path={match.match.params.class}
            page="classes"
            {...data}
            {...actions}
          />
        )}/>

        <Route path="/homepage" render={() => (
          <HomePage
            page={this.props.page}
            {...data}
            {...actions}
          />
        )}/>

        <Route path="/settings" render={() => (
          <HomePage
            page={this.props.page}
            {...data}
            {...actions}
          />
        )}/>
      </Switch>
   )
  }
}

export default Main;
