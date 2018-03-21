import React, { Component } from 'react';

import { firestore } from "../base";
import { Row, Col } from 'reactstrap';

import Sidebar from 'react-sidebar';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import Side from './Side';
import HomeNav from './HomeNav';
import Cards from './Cards';
import ClassHome from '../ClassPage/ClassHome';
import LiveFeed from '../ClassPage/LiveFeed';

import Settings from '../Settings/Settings';

import './HomePage.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const mql = window.matchMedia(`(min-width: 600px)`);

BigCalendar.momentLocalizer(moment);

class HomePage extends Component {

  constructor(props) {
    super(props);


    /**
     * State of the Homepage
     *
     * uid: |String| current user firebase identifier.
     *
     * classes: |Object of arrays|students array of objects holding their class name and teacher identifier
     *
     * width: |Boolean| used for screen side recognition for calendar
     *
     * mql: |Boolean| used for screen size recognition sidebar
     *
     * docked: |Boolean| set sidebar to show or hide;
     *
     * open: |Boolean| set sidebar to show or hide;
     *
     **/
    this.state = {
      page: this.props.page,

      firstName: null,
      lastName: null,

      uid: props.uid,

      userImage: this.props.userImage,

      role: this.props.role,

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

      assignments: [{
        code: null,
        maxscore: null,
        name: null,
      }],

      personalPage: true,

      width: window.innerWidth,

      mql: mql,
      docked: props.docked,
      open: props.open,
    };
  }

  // calculate GPA for a student
  calcGPA = () => {
    let grades = [];

    for (let i in this.state.classes) {
      if (this.state.classes.hasOwnProperty(i)) {
        let grade = this.getGrade(this.state.classes[i].code);

        if (!isNaN(grade))
          grades.push(grade);
      }
    }

    let points = 0;
    let maxPoints = grades.length;

    for (let i in grades) {
      if (grades[i] >= 92.5)
        points += 4;
      else if (89.5 <= grades[i] && grades[i] < 92.5)
        points += 3.7;
      else if (86.5 <= grades[i] && grades[i] < 89.5)
        points += 3.3;
      else if (82.5 <= grades[i] && grades[i] < 86.5)
        points += 3;
      else if (79.5 <= grades[i] && grades[i] < 82.5)
        points += 2.7;
      else if (76.5 <= grades[i] && grades[i] < 79.5)
        points += 2.3;
      else if (72.5 <= grades[i] && grades[i] < 76.5)
        points += 2;
      else if (69.5 <= grades[i] && grades[i] < 72.5)
        points += 1.7;
      else if (66.5 <= grades[i] && grades[i] < 69.5)
        points += 1.3;
      else if (62.5 <= grades[i] && grades[i] < 66.5)
        points += 1;
      else if (59.5 <= grades[i] && grades[i] < 62.5)
        points += 0.7;
      else if (grades[i] < 59.5)
        points += 0;
    }

    let gpa = points / maxPoints;

    if (gpa % 1 !== 0)
      gpa = Math.round(gpa * 100) / 100;

    return gpa;
  };

  // get grade in a specific class
  getGrade = (code) => {
    let total = 0;
    let max = 0;

    for (let i in this.state.myAssignments) {
      if (this.state.myAssignments.hasOwnProperty(i)) {
        if (this.state.myAssignments[i].code === code && this.state.myAssignments[i].maxscore != null) {
          total += this.state.myAssignments[i].score;
          max += this.state.myAssignments[i].maxscore;
        }
      }
    }

    let grade = (total / max) * 100;

    if (grade % 1 !== 0)
      grade = Math.round(grade * 100) / 100;

    return grade;
  };




  componentDidUpdate() {
  }

  /**
   *
   * Method called before components are loaded
   * on the page.
   *
   * 1. Gets classes from firebase
   *
   * 2. Sets screen size action listener
   *
   * 3. Sets sidebar visibility
   *
   */
  componentWillMount() {
    this.props.getShowGPA();
    this.getClasses();
    mql.addListener(this.mediaQueryChanged);
    window.addEventListener('resize', this.handleWindowChange);
    this.setState({
      mql: mql,
      sidebarDocked: mql.matches,
    });

  };

  /**
   *
   * Method called when component is leaving
   *
   * Removes screen size action listener
   *
   */
  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
    window.removeEventListener('resize', this.handleWindowChange)
  };

  /**
   *
   * When window size changes, update state width
   *
   */
  handleWindowChange = () => {
    this.setState({
      width: window.innerWidth,
    })
  };

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

    docRef.get().then(function (doc) {
      if (doc.exists) {
        if (doc.data().classes !== null) {
          self.setState({
            classes: doc.data().classes,
            myAssignments: doc.data().assignments, // NEW *****************
          });

          let gpa = self.calcGPA();
          self.setState({
            gpa: gpa,
          });

          self.getUserImage();
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
      self.props.updateClasses(self.state.classes);
      self.props.updateRole(self.props.role);
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

  };

  getUserImage = () => {
    let docRef = firestore.collection("users").doc(this.state.uid);
    let self = this;

    docRef.get().then(function (doc) {
      if (doc.exists) {
        self.setState({
          userImage: doc.data().userImage,
        });

      } else {
        console.log("No such document!");
      }
      self.props.updateUserImage(doc.data().userImage);
    }).catch(function (error) {
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

    for (let j in self.state.classes) {

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
        self.props.updateDates(self.state.dates);
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

    for (let j in self.state.classes) {

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
        self.props.updateAnnouncements(self.state.announcements);
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    }
    object.pop();

    self.setState({
      announcements: object
    });

  };


  /**
   *
   * Toggle side bar from hidden side bar button
   *
   */
  dockSideBar = () => {
    if (this.state.sidebarDocked)
      this.setState({
        sidebarOpen: false,
      });
    else
      this.setState({
        sidebarOpen: true,
      });
  };


  /**
   *
   * Set state when side bar is open
   *
   * @param open: |Boolean|
   */
  onSetSidebarOpen = (open) => {
    this.setState({
      sidebarOpen: open,
    });
  };

  /**
   *
   * Screen size changes called by the action listener
   *
   */
  mediaQueryChanged = () => {
    this.setState({
      sidebarDocked: this.state.mql.matches,
    });
  };

  /**
   *
   * Sets color of dates on calendar
   *
   * @returns {{style: {backgroundColor: string}}}
   */
  eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: '#21ce99',
      }
    };
  };

  flipToClass = () => {
    this.setState({
      personalPage: false,
      sidebarOpen: false,
    });
  };

  flipToPersonal = () => {
    this.setState({
      personalPage: true,
      sidebarOpen: false,
    });
  };

  /**
   *
   * Method called to add components to the webpage
   *
   * 1. Creates the side bar
   *
   * 2. Set sidebar styles
   *
   * 3. Set calendar styles
   *
   * 4. Render
   *
   *    a. All wrapped in a side bar
   *        A. If the screen is large enough show
   *           Side bar, if not show button to expand
   *        B. Add Calendar to page
   *
   * @returns {XML}
   */
  render() {

    let sidebarContent = <Side selectedClass={this.props.selectedClass} selectClass={this.props.selectClass}
                               userImage={this.props.userImage} updateUserImage={this.props.updateUserImage}
                               flipClass={this.flipToClass.bind(this)} flipPersonal={this.flipToPersonal.bind(this)}
                               page={this.props.page} uid={this.state.uid} classes={this.props.classes}/>;

    const sidebarStyles = {
      sidebar: {
        backgroundColor: '#f2f2f2',
        width: '8em',
        textAlign: 'center',
      },
      overlay: {
        backgroundColor: '#f3f3f3'
      },
    };

    const calendarStyles = {
      height: "60em",
    };

    const sideData = {
      styles: sidebarStyles,
      sidebar: sidebarContent,
      open: this.state.sidebarOpen,
      docked: this.state.sidebarDocked,
      onSetOpen: this.onSetSidebarOpen,
    };

    const classData = {
      code: this.props.selectedClass,
      className: this.props.className,
      classAnnouncements: this.props.classAnnouncements,
      path: this.props.path,
      classImage: this.props.classImage,
      assignments: this.props.assignments,
      homeworks: this.props.homeworks,
    };

    const actions = {
      updateClasses: this.props.updateClasses,
      updateRole: this.props.updateRole,
      updateAnnouncements: this.props.updateAnnouncements,
      updateUserImage: this.props.updateUserImage,
      toggleGPA: this.props.toggleGPA,
      selectClass: this.props.selectClass,
      updateClassPicture: this.props.updateClassPicture,
      getClassAnnouncements: this.props.getClassAnnouncements,
      getAssignments: this.props.getAssignments,
      getHomeworks: this.props.getHomeworks,
    };

    if (this.props.page === "home") {
      // If Screen is Big
      if (this.state.width > 600) {

        return (
          <Sidebar {...sideData}>

            <HomeNav firstName={this.state.firstName} lastName={this.state.lastName} gpa={this.state.gpa}
                     expand={this.dockSideBar}
                     showGPA={this.props.showGPA}
                     width={this.state.width}/>
            <Row>
              <Col md="1"/>
              <Col md="8">
                <BigCalendar
                  events={this.props.dates}
                  style={calendarStyles}
                  defaultDate={new Date()}
                  eventPropGetter={(this.eventStyleGetter)}
                />
              </Col>
              <Col md="3"/>
            </Row>

            <hr className="divider"/>
            <b className="annTest">Announcements</b>

            <div className="announcementsDiv">
              <Cards announcements={this.props.announcements}/>
            </div>
          </Sidebar>
        );

        // If Screen is Small
      } else {

        return (
          <Sidebar {...sideData}>

            <HomeNav firstName={this.state.firstName} lastName={this.state.lastName} gpa={this.state.gpa}
                     expand={this.dockSideBar}
                     showGPA={this.props.showGPA}
                     width={this.state.width}/>

            <hr className="divider"/>
            <b className="annTest">Announcements</b>

            <div className="announcementsDiv">
              <Cards announcements={this.state.announcements}/>
            </div>

          </Sidebar>
        );

      }
    } else if (this.props.page === "settings") {

      return (
        <Sidebar {...sideData}>

          <HomeNav firstName={""} lastName={""} expand={this.dockSideBar}
                   width={this.state.width}/>

          <Settings {...actions} classes={this.props.classes} userImage={this.state.userImage}
                    updateUserImage={this.props.updateUserImage} updateClasses={this.props.updateClasses}
                    role={this.props.role} personalPage={this.state.personalPage} uid={this.state.uid} showGPA={this.props.showGPA}/>
        </Sidebar>
      );

    } else if (this.props.page === "classes") {

      return (
        <Sidebar {...sideData}>

          <HomeNav firstName={""} lastName={""} expand={this.dockSideBar}
                   width={this.state.width}/>

          <ClassHome {...classData} {...actions} selectedClass={this.props.selectedClass}/>

        </Sidebar>
      );
    } else if (this.props.page === "liveFeed") {

      return (
        <Sidebar {...sideData}>

          <HomeNav firstName={"Personal Finance"} lastName={""} expand={this.dockSideBar}
                   width={this.state.width}/>

          <Row>
            <Col>
              <LiveFeed />
            </Col>
          </Row>
        </Sidebar>
      );

    } else {
      return (
        <p>UH OH!</p>
      );
    }
  }
}
export default HomePage
