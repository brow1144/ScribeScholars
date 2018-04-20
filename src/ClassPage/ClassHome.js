import React, { Component } from 'react';

import { Nav, NavLink, Container} from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom'
import { firestore } from '../base.js'

import AssignTable from "./AssignTable";
import HomeworkTable from './HomeworkTable';
import GradesTable from './GradesTable';
import Cards from '../HomePage/Cards';
import './ClassHome.css';
import MyStudents from '../MyStudents/MyStudents';
import RegradeTable from "./RegradeTable";
import GameTable from './GameTable';
import DiscussionBoard from "../DiscussionBoard/DiscussionBoard";

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
    //console.log(this.props);

    this.getRole();
  };

  componentWillMount() {

    if (this.props.tab === 'announcements') {
      this.setState({announcementsActive: true})
    } else if (this.props.tab === 'lessons') {
      this.setState({lessonsActive: true})
    } else if (this.props.tab === 'homework') {
      this.setState({homeworkActive: true})
    } else if (this.props.tab === 'discussion') {
      this.setState({discussionActive: true})
    } else if (this.props.tab === 'myStudents') {
      this.setState({myStudentsActive: true})
    } else if (this.props.tab === 'regradeRequests') {
      this.setState({regradeRequestsActive: true})
    } else if (this.props.tab === 'games') {
      this.setState({gamesActive: true})
    } else if (this.props.tab === 'grades') {
      this.setState({gradesActive: true})
    }

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
      gamesActive: false,
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
      gamesActive: false,
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
      gamesActive: false,
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
      gamesActive: false,
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
      gamesActive: false,
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
      gamesActive: false,
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
      gamesActive: false,
    })
  };

  switchGames = () => {
    this.setState({
      announcementsActive: false,
      lessonsActive: false,
      homeworkActive: false,
      discussionActive: false,
      myStudentsActive: false,
      regradeRequestsActive: false,
      gradesActive: false,
      gamesActive: true,
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

              <NavLink className="navLinks" to={`/ScribeScholars/HomePage/${this.props.code}/announcements`} onClick={this.switchAnnouncement}
                       active={this.state.announcementsActive}>Announcements</NavLink>

              <NavLink className="navLinks" to={`/ScribeScholars/HomePage/${this.props.code}/lessons`} onClick={this.switchLessons} active={this.state.lessonsActive}>In-Class Lessons</NavLink>


              <NavLink className="navLinks" to={`/ScribeScholars/HomePage/${this.props.code}/homework`} onClick={this.switchHomework} active={this.state.homeworkActive}>Homework</NavLink>


              <NavLink className="navLinks" to={`/ScribeScholars/HomePage/${this.props.code}/games`} onClick={this.switchGames} active={this.state.gamesActive}>Class Games</NavLink>

              <NavLink className="navLinks" to={`/ScribeScholars/HomePage/${this.props.code}/discussion`} onClick={this.switchDiscussions} active={this.state.discussionActive}>Discussion
                Board</NavLink>

            {this.state.gotRole && this.state.role === "teacher"
              ?

                  <NavLink className="navLinks" to={`/ScribeScholars/HomePage/${this.props.code}/myStudents`} onClick={this.switchMyStudents} active={this.state.myStudentsActive}>My Students</NavLink>

              :

                <NavLink className="navLinks" to={`/ScribeScholars/HomePage/${this.props.code}/grades`} onClick={this.switchGrades} active={this.state.gradesActive}>Grades</NavLink>


            }

            {this.state.gotRole && this.state.role === "teacher"
              ?
              <NavLink onClick={this.switchRegradeRequests} active={this.state.regradeRequestsActive} code={this.props.code} uid={this.state.uid} className="navLinks" to={`/ScribeScholars/HomePage/${this.props.code}/regradeRequests`}>
                Regrade Requests
              </NavLink>
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

          {this.state.discussionActive
            ?
            <div>
              <div>
                <DiscussionBoard classCode={this.props.path} code={this.props.code} role={this.props.role} uid={this.props.uid} />
              </div>
            </div>
            :
            <div>
            </div>
          }

          {this.state.homeworkActive
            ?
            <div>
              <HomeworkTable uid={this.props.uid} code = {this.props.classCode} lessonNumber = {this.props.lessonNumber} homeworks={this.props.homeworks} />
            </div>
            :
            <div>
            </div>
          }
          {this.state.lessonsActive
            ?
            <AssignTable uid={this.props.uid} code={this.props.classCode} lessonNumber={this.props.lessonNumber} assignments={this.props.assignments} />
            :
            <div>
            </div>
          }

          {this.state.myStudentsActive
            ?
            <MyStudents code={this.props.classCode} uid={this.props.uid}/>
            :
            <div>
            </div>
          }
          {this.state.gradesActive
            ?
            <GradesTable code={this.props.classCode} uid={this.props.uid}/>
            :
            <div>
            </div>
          }
          {this.state.regradeRequestsActive
            ?
            <RegradeTable code={this.props.classCode} uid={this.props.uid}/>
            :
            <div>
            </div>
          }
          {this.state.gamesActive
            ?
            <GameTable code={this.props.code} uid={this.props.uid} lessonNumber = {this.props.lessonNumber} games={this.props.games}/>
            :
            <div>
            </div>
          }
        </div>
      )
  }
}

export default ClassHome;
