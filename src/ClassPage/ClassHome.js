import React, { Component } from 'react';

import { Nav, NavItem, NavLink } from 'reactstrap';

import './ClassHome.css';

class ClassHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
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
    })
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
          <h1>CS 307</h1>
          <p className="lead"> Jeff Turkstra</p>
        </div>

        <Nav horizontal="center" tabs>
          <NavItem>
            <NavLink className="navLinks" href="#" onClick={this.switchAnnouncement} active={this.state.announcementsActive}>Announcements</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="navLinks" href="#" onClick={this.switchLessons} active={this.state.lessonsActive}>In-Class Lessons</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="navLinks" href="#" onClick={this.switchHomework} active={this.state.homeworkActive}>Homework</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="navLinks" href="#" onClick={this.switchDiscussions} active={this.state.discussionActive}>Discussion Board</NavLink>
          </NavItem>
        </Nav>

      </div>
  )
  }
}

export default ClassHome;
