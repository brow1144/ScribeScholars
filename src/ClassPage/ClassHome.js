import React, { Component } from 'react';

import { Nav, NavLink } from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom'


import Cards from '../HomePage/Cards';

import './ClassHome.css';

class ClassHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      announcements: [{
        title: null,
        subtitle: null,
        message: null,
        class: null,
      }],

      announcementsActive: true,
      lessonsActive: false,
      homeworkActive: false,
      discussionActive: false,
    };

  }

  switchAnnouncement = () => {
    this.setState({
      announcementsActive: true,
      lessonsActive: false,
      homeworkActive: false,
      discussionActive: false,
    })
  };

  switchLessons = () => {
    this.setState({
      announcementsActive: false,
      lessonsActive: true,
      homeworkActive: false,
      discussionActive: false,
    })
  };

  switchHomework = () => {
    this.setState({
      announcementsActive: false,
      lessonsActive: false,
      homeworkActive: true,
      discussionActive: false,
    });

  };

  switchDiscussions = () => {
    this.setState({
      announcementsActive: false,
      lessonsActive: false,
      homeworkActive: false,
      discussionActive: true,
    })
  };

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1>{this.props.className}</h1>
          <p className="lead"> {this.props.selectedClass}</p>
        </div>

        <Nav horizontal="center" tabs>
          <RouterLink className="navLinks" to={`announcements`}>
            <NavLink onClick={this.switchAnnouncement} active={this.state.announcementsActive}>Announcements</NavLink>
          </RouterLink>
          <RouterLink className="navLinks" to={`lessons`}>
            <NavLink  onClick={this.switchLessons} active={this.state.lessonsActive}>In-Class Lessons</NavLink>
          </RouterLink>
          <RouterLink className="navLinks" to={`homework`}>
            <NavLink  onClick={this.switchHomework} active={this.state.homeworkActive}>Homework</NavLink>
          </RouterLink>
          <RouterLink className="navLinks" to={`discussion`}>
            <NavLink  onClick={this.switchDiscussions} active={this.state.discussionActive}>Discussion Board</NavLink>
          </RouterLink>
        </Nav>

        <b>Class Announcements</b>

        <div className="announcementsDiv">
          <Cards announcements={this.props.classAnnouncements}/>
        </div>

      </div>
  )
  }
}

export default ClassHome;
