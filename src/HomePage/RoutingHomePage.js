import React, { Component } from 'react';

import { firestore } from "./base.js";

import { Route, Switch } from 'react-router-dom';

import HomePage from './HomePage/HomePage';

class Main extends Component {

  constructor(props) {
    super(props);

  }



  render() {

    const data = {
      uid: this.props.uid,
      classes: this.props.classes,
      dates: this.props.dates,
      announcements: this.props.announcements,
      userImage: this.props.userImage,
      selectedClass: this.props.selectedClass,
      className: this.props.className,
      classAnnouncements: this.props.classAnnouncements,
      classImage: this.props.classImage,
    };

    const actions = {
      updateClasses: this.props.updateClasses,
      updateDates: this.props.updateDates,
      updateRole: this.props.updateRole,
      updateAnnouncements: this.props.updateAnnouncements,
      updateUserImage: this.props.updateUserImage,
      selectClass: this.props.selectClass,
      updateClassPicture: this.props.updateClassPicture,
      getClassAnnouncments: this.props.getClassAnnouncments
    };


    return (
      <Switch>
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
