import React, { Component } from 'react';

import { Nav, NavLink } from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom'

import Cards from '../HomePage/Cards';
import './ClassHome.css';
import Homework from './Homework';
import Inclass from './InclassStudent';
import myStudents from '../MyStudents/MyStudents'
import myStudentsLink from '../MyStudents/MyStudentLink'

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

      classImage: null,

      announcementsActive: true,
      lessonsActive: false,
      homeworkActive: false,
      discussionActive: false,
        myStudentsActive: false,
    };
  }

  componentWillMount() {
    this.props.selectClass(this.props.path);
    this.props.updateClassPicture(this.props.path);
  }

  switchAnnouncement = () => {
    this.setState({
      announcementsActive: true,
      lessonsActive: false,
      homeworkActive: false,
      discussionActive: false,
        myStudentsActive: false,
    })
  };

  switchLessons = () => {
    this.setState({
      announcementsActive: false,
      lessonsActive: true,
      homeworkActive: false,
      discussionActive: false,
        myStudentsActive: false,
    })
  };

  switchHomework = () => {
    this.setState({
      announcementsActive: false,
      lessonsActive: false,
      homeworkActive: true,
      discussionActive: false,
        myStudentsActive: false,
    });

  };

  switchDiscussions = () => {
    this.setState({
      announcementsActive: false,
      lessonsActive: false,
      homeworkActive: false,
      discussionActive: true,
        myStudentsActive: false,
    })
  };

    switchMyStudents = () => {
        this.setState({
            announcementsActive: false,
            lessonsActive: false,
            homeworkActive: false,
            discussionActive: false,
            myStudentsActive: true,
        })
    };

  render() {
    const jumboStyle = {
      background: `url(${this.props.classImage}) no-repeat center center`,
    };

      return (
        <div>
          <div style={jumboStyle} className="jumbotron">
            <h1>{this.props.className}</h1>
            <p className="lead"> {this.props.selectedClass}</p>
          </div>

          <Nav horizontal="center" tabs>
            <RouterLink className="navLinks" to={`/HomePage/${this.props.code}/announcements`}>
              <NavLink onClick={this.switchAnnouncement}
                       active={this.state.announcementsActive}>Announcements</NavLink>
            </RouterLink>
            <RouterLink className="navLinks" to={`/HomePage/${this.props.code}/lessons`}>
              <NavLink onClick={this.switchLessons} active={this.state.lessonsActive}>In-Class Lessons</NavLink>
            </RouterLink>
            <RouterLink className="navLinks" to={`/HomePage/${this.props.code}/homework`}>
              <NavLink onClick={this.switchHomework} active={this.state.homeworkActive}>Homework</NavLink>
            </RouterLink>
            <RouterLink className="navLinks" to={`/HomePage/${this.props.code}/discussion`}>
              <NavLink onClick={this.switchDiscussions} active={this.state.discussionActive}>Discussion
                Board</NavLink>
            </RouterLink>
              <RouterLink className="navLinks" to={`/HomePage/${this.props.code}/myStudentsLink`}>
                  <NavLink onClick={this.switchMyStudents} active={this.state.myStudentsActive}>My Students</NavLink>
              </RouterLink>
          </Nav>

          {this.state.announcementsActive
            ?
            <div>
              <div className="announcementsDiv">
                <Cards announcements={this.props.classAnnouncements}/>
              </div>
            </div>
            :
            <div>
            </div>
          }

          {this.state.homeworkActive
            ?
            <Homework/>
            :
            <div>
            </div>
          }
          {this.state.lessonsActive
            ?
            <Inclass code={this.props.code} />
            :
            <div>
            </div>
          }
            {this.state.myStudentsActive
                ?
                <myStudentsLink/>
                :
                <div>
                </div>
            }
        </div>
      )
  }
}

export default ClassHome;
