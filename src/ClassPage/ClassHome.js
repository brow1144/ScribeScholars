import React, { Component } from 'react';

import { Nav, NavLink } from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom'
import { firestore } from '../base.js'

import AssignTable from "./AssignTable";
import HomeworkTable from './HomeworkTable';
import GradesTable from './GradesTable';
import Cards from '../HomePage/Cards';
import './ClassHome.css';
import MyStudents from '../MyStudents/MyStudents';
import RegradeTable from "./RegradeTable";

class ClassHome extends Component {

  constructor(props) {
    super(props);

    this.state = {

      role: "",
      gotRole: false,

      announcements: [{
        title: null,
        subtitle: null,
        message: null,
        class: null,
      }],

      assignments: [{
        code: null,
        name: null,
        maxScore: null,
      }],

      homeworks: [{
        code: null,
        name: null,
        maxScore: null,
      }],

      classImage: null,

      announcementsActive: false,
      lessonsActive: false,
      homeworkActive: false,
      discussionActive: false,
      myStudentsActive: false,
      regradeRequestsActive: false,
      gradesActive: false,
    };

    this.getRole();
  };

  componentWillMount() {
    this.props.selectClass(this.props.path);
    this.props.updateClassPicture(this.props.path);
  };

  getRole = () => {
    let self = this;
    let userRef = firestore.collection("users").doc(this.props.uid);
    userRef.get().then(function (doc){
      if(doc.exists){
        self.setState({
          role: doc.data().role,
          gotRole: true,
        });
      }else{
        console.log("Error: doc does not exist!")
      }
    }).catch(function (error){
      console.log("Error getting user's role. " + error);
    });
  };

  switchAnnouncement = () => {
    this.setState({
      announcementsActive: true,
      lessonsActive: false,
      homeworkActive: false,
      discussionActive: false,
      myStudentsActive: false,
      regradeRequestsActive: false,
      gradesActive: false,
    })
  };

  switchLessons = () => {
    this.setState({
      announcementsActive: false,
      lessonsActive: true,
      homeworkActive: false,
      discussionActive: false,
      myStudentsActive: false,
      regradeRequestsActive: false,
      gradesActive: false,
    })
  };

  switchHomework = () => {
    this.setState({
      announcementsActive: false,
      lessonsActive: false,
      homeworkActive: true,
      discussionActive: false,
      myStudentsActive: false,
      regradeRequestsActive: false,
      gradesActive: false,
    });
  };

  switchDiscussions = () => {
    this.setState({
      announcementsActive: false,
      lessonsActive: false,
      homeworkActive: false,
      discussionActive: true,
      myStudentsActive: false,
      regradeRequestsActive: false,
      gradesActive: false,
    })
  };

  switchMyStudents = () => {
    this.setState({
      announcementsActive: false,
      lessonsActive: false,
      homeworkActive: false,
      discussionActive: false,
      myStudentsActive: true,
      regradeRequestsActive: false,
      gradesActive: false,
    })
  };

  switchRegradeRequests = () => {
    this.setState({
      announcementsActive: false,
      lessonsActive: false,
      homeworkActive: false,
      discussionActive: false,
      myStudentsActive: false,
      regradeRequestsActive: true,
      gradesActive: false,
    })
  };

  switchGrades = () => {
    this.setState({
      announcementsActive: false,
      lessonsActive: false,
      homeworkActive: false,
      discussionActive: false,
      myStudentsActive: false,
      regradeRequestsActive: false,
      gradesActive: true,
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


            {this.state.gotRole && this.state.role === "teacher"
              ?
              <RouterLink className="navLinks" to={`/HomePage/${this.props.code}/myStudents`}>

                  <NavLink onClick={this.switchMyStudents} active={this.state.myStudentsActive} code={this.props.code} lessonNumber={this.props.lessonNumber}>My Students</NavLink>
                
              </RouterLink>
              :
              <RouterLink className="navLinks" to={`/HomePage/${this.props.code}/grades`}>
                <NavLink onClick={this.switchGrades} active={this.state.gradesActive}>Grades</NavLink>

              </RouterLink>
            }

            {this.state.gotRole && this.state.role === "teacher"
              ?
              <RouterLink className="navLinks" to={`/HomePage/${this.props.code}/regradeRequests`}>

                <NavLink onClick={this.switchRegradeRequests} active={this.state.regradeRequestsActive} code={this.props.code} uid={this.state.uid}>Regrade Requests</NavLink>

              </RouterLink>
              :
              <div>
              </div>
            }

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
            <div>
              <HomeworkTable uid={this.props.uid} code = {this.props.code} lessonNumber = {this.props.lessonNumber} homeworks={this.props.homeworks} />
            </div>
            :
            <div>
            </div>
          }
          {this.state.lessonsActive
            ?
            <AssignTable uid={this.props.uid} code={this.props.code} lessonNumber={this.props.lessonNumber} assignments={this.props.assignments} />
            :
            <div>
            </div>
          }

          {this.state.myStudentsActive
            ?
            <div>
              <MyStudents code={this.props.code}/>
            </div>
            :
            <div>
            </div>
          }
          {this.state.gradesActive
            ?
            <GradesTable code={this.props.code} uid={this.props.uid}/>
            :
            <div>
            </div>
          }
          {this.state.regradeRequestsActive
            ?
            <RegradeTable code={this.props.code} uid={this.props.uid}/>
            :
            <div>
            </div>
          }
        </div>
      )
  }
}

export default ClassHome;
