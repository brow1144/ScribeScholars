import React, { Component } from 'react';

import { firestore } from "../base";
import { Row, Col } from 'reactstrap';

import Sidebar from 'react-sidebar';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import Side from './Side';
import HomeNav from './HomeNav';
import Cards from './Cards';
import AlertHandler from './AlertHandler';
import ClassHome from '../ClassPage/ClassHome';
import LiveFeed from '../ClassPage/LiveFeed';
import GradingPage from '../MyStudents/GradingPage';

import CreateActivity from '../CreateActivity/CreateActivity';
import CreateGame from '../CreateGame/CreateGame';
import EditActivity from '../EditActivity/EditActivity'

import Settings from '../Settings/Settings';
import StudentMC from '../ClassPage/GameComponents/StudentMC';

import './HomePage.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import GenHomework from "../ClassPage/HomeworkComponents/GenHomework";
import GenAssignment from "../ClassPage/LiveComponents/GenAssignment";

import EventButton from "./EventButton"

import StudentLiveFeed from "../ClassPage/StudentLiveFeed";
import TeacherGame from "../ClassPage/GameComponents/TeacherGame";

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

      uid: this.props.uid,

      userImage: this.props.userImage,

      role: props.getRole(),

      classes: [{
        class: null,
        teacher: null,
        code: null,
      }],

      announcements: [{
        title: null,
        subtitle: null,
        message: null,
        class: null,
      }],

      dates: [],
      calendarEvents: [],

      lessonNumber: this.props.lessonNumber,
      class: this.props.class,

      personalPage: true,

      width: window.innerWidth,

      mql: mql,
      docked: props.docked,
      open: props.open,

      myAssignments: [],
      eventButtonOpen: true,

      alerts: [],
      hiddenAlerts: [],

      classWeighting: [],
    };
  }

  getClassWeighting = () => {
    let self = this;
    let tmpClassWeighting = [];

    for (let i in this.state.classes) {
      if (this.state.classes.hasOwnProperty(i)) {
        let classRef = firestore.collection("classes").doc(this.state.classes[i].code);

        classRef.get().then((doc) => {
          if (doc.exists) {
            tmpClassWeighting.push({
              code: self.state.classes[i].code,
              inClassWeight: doc.data().inClassWeight / 100,
              homeworkWeight: doc.data().homeworkWeight / 100,
            });

            classRef.get().then(() => {
              if (parseInt(i, 10) === self.state.classes.length - 1) {
                self.setState({
                  classWeighting: tmpClassWeighting,
                });

                self.getMyAssignments();
              }
            }).catch((error) => {
              console.log("Error getting document: ", error);
            });
          }
        }).catch((error) => {
          console.log("Error getting document: ", error);
        });
      }
    }
  };

  // calculate GPA for a student
  calcGPA = () => {
    let grades = [];

    for (let i in this.state.classWeighting) {
      if (this.state.classWeighting.hasOwnProperty(i)) {
        let grade = this.getGrade(this.state.classWeighting[i].code, this.state.classWeighting[i].inClassWeight, this.state.classWeighting[i].homeworkWeight);

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

    /*if (!isNaN(gpa)) {
      let studentRef = firestore.collection("users").doc(this.state.uid);
      studentRef.set({
        gpa: gpa,
      }, {merge: true}
      ).catch((error) => {
        console.log("Error getting document:", error);
      });
    }*/

    return gpa;
  };

  // get grade in a specific class
  getGrade = (code, inClassWeight, homeworkWeight) => {
    let inClassTotal = 0;
    let homeworkTotal = 0;
    let inClassMax = 0;
    let homeworkMax = 0;

    for (let i in this.state.myAssignments) {
      if (this.state.myAssignments.hasOwnProperty(i)) {
        if (this.state.myAssignments[i].data.class === code && this.state.myAssignments[i].data.score != null) {
          if (this.state.myAssignments[i].type === "inClass") {
            inClassTotal += this.state.myAssignments[i].data.score;
            inClassMax += this.state.myAssignments[i].data.maxScore;
          } else if (this.state.myAssignments[i].type === "homework") {
            homeworkTotal += this.state.myAssignments[i].data.score;
            homeworkMax += this.state.myAssignments[i].data.maxScore;
          }
        }
      }
    }

    let grade;

    if (inClassMax !== 0 && homeworkMax !== 0)
      grade = ((inClassTotal / inClassMax) * inClassWeight + (homeworkTotal / homeworkMax) * homeworkWeight) * 100;
    else if (inClassMax !== 0)
      grade = (inClassTotal / inClassMax) * 100;
    else if (homeworkMax !== 0)
      grade = (homeworkTotal / homeworkMax) * 100;

    if (grade % 1 !== 0)
      grade = Math.round(grade * 100) / 100;

    return grade;
  };

  // get all assignments for a student (GPA)
  getMyAssignments = () => {
    let self = this;
    let studentRef = firestore.collection("users").doc(this.state.uid);

    studentRef.get().then((doc) => {
      if (doc.exists) {
        self.getAssignmentsOfType("homework");
        self.getAssignmentsOfType("inClass");
        self.getAssignmentsOfType("games");

        studentRef.get().then(() => {
          let gpa = self.calcGPA();
          self.setState({
            gpa: gpa,
          });
        });
      }
    }).catch((error) => {
      console.log("Error getting document: ", error);
    });
  };

  getAssignmentsOfType = (type) => {
    let self = this;

    firestore.collection("users").doc(this.state.uid).collection(type).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.data().score != null) {
          self.setState({
            myAssignments: self.state.myAssignments.concat({data: doc.data(), type: type}),
          });
        }
      });
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
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
    this.props.getShowAlerts();
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
            hiddenAlerts: doc.data().hiddenAlerts,
          });

          self.getUserImage();
          self.getCalendarEvents();
          //self.getDeadlines();
          self.getAnnouncements();
        }
        if (doc.data().firstName !== null && doc.data().lastName !== null && doc.data().role !== null) {
          self.setState({
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            role: doc.data().role,
          }, () => {
            if (self.state.role === "student")
              self.getClassWeighting();
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
   *  Known issue:  alerts will not work with multiple deadlines with the same title.
   */
  isHidden = (name) => {
    for (let i in this.state.hiddenAlerts) {
      if (this.state.hiddenAlerts[i] === name)
        return true;
    }

    return false;
  };

  getAlerts = () => {
    let now = new Date(Date.now());   // get current time
    let tmpAlerts = [];
    let self = this;

    console.log(this.state.dates);
    console.log(this.state.dates.length);

    this.state.dates.forEach(function(date) {
      console.log(date);
      let diff = (date.end - now) / (60 * 60 * 1000);  // get difference in hours
      if (diff >= 0 && diff < 24 && !self.isHidden(date.title)) {  // if deadline is less than 24 hours away
        let endHours = date.end.getHours();
        let endWord;
        let endTime;

        if (endHours > 12) {
          endWord = "tonight";
          endTime = (endHours - 12) + ":" + date.end.getMinutes() + " PM";
        } else {
          endWord = "today";
          endTime = endHours + ":" + date.end.getMinutes() + " AM";
        }

        tmpAlerts.push({name: date.title, text: " is due " + endWord + " at " + endTime});
      }
    });

    this.setState({
      alerts: tmpAlerts,
    });
  };

  /**
   *
   * This method goes through all the students homeworks and inClass
   * assignments, gets the due date from them, and adds them to dates.
   *
   */
  getDeadlines = () => {
    console.log('reached get Deadlines');
    let self = this;
    let dates = [];

    for (let j in self.state.classes) {
      let homeworkRef = firestore.collection("classes").doc(self.state.classes[j].code).collection('homework');

      homeworkRef.get().then((docs) => {
        docs.forEach((doc) => {
          if (doc.data().due != null){
            let deadline = {};
            deadline.title = doc.data().name;
            deadline.start = new Date(doc.data().due);
            deadline.end = new Date(doc.data().due);
            dates.push(deadline);
          }
        });

      }).catch((error) => {
        console.log("Error getting document:", error);
      });

      homeworkRef = firestore.collection("classes").doc(self.state.classes[j].code);
      homeworkRef.get().then(() => {
        if(parseInt(j, 10) === self.state.classes.length-1) {
          console.log('reached end of getdeadlines');
          self.getInClassDates(dates);
        }
      });
    }

  };


  getInClassDates = (dates) => {
    console.log('reached get inclass');
    let self = this;
    for (let j in self.state.classes) {

      let inClassRef = firestore.collection("classes").doc(self.state.classes[j].code).collection('inClass');
      inClassRef.get().then((docs) => {
        docs.forEach((doc) => {
          if (doc.data().due != null) {
            let deadline = {};
            deadline.title = doc.data().name;
            deadline.start = new Date(doc.data().due);
            deadline.end = new Date(doc.data().due);
            dates.push(deadline);
          }
        });
      }).catch((error) => {
        console.log("Error getting document:", error);
      });

      inClassRef = firestore.collection("classes").doc(self.state.classes[j].code);
      inClassRef.get().then(() => {
        if (parseInt(j, 10) === self.state.classes.length - 1) {
          console.log('reached end of getdeadlines');
          self.handleDates(dates);
        }
      });
    }
  };

  handleDates = (dates) => {
    console.log('reached handle dates')
    let self = this;
    let allEvents = dates;
    for(let i = 0; i < self.state.calendarEvents.length; i++){
      allEvents.push(self.state.calendarEvents[i]);
    }

    self.setState({
      dates: allEvents,
    }, () => {
      self.getAlerts();
      self.props.updateDates(self.state.dates);
      self.forceUpdate();
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
   * Get Calendar Events from Firebase
   * Calendar Events are manually created by the user where deadlines are added by teacher
   * when an assignment is created
   *
   * Called after getAnnouncements() from getClasses()
   *
   * Format for calendar events is
   * name: ''
   * time: MM/DD/YYYY TT:TT
   *
   */

  getCalendarEvents = () => {
    let self = this;
    let userRef = firestore.collection("users").doc(this.state.uid);

    userRef.get().then(function (doc){
      if (doc.exists){
        let data = doc.data();
        for (let i in data.events) {
          if (data.events.hasOwnProperty(i)) {
            let object = {
              title: data.events[i].title,
              start: new Date(data.events[i].start),
              end: new Date(data.events[i].end),
            };
            let cEvents = self.state.calendarEvents;
            cEvents.push(object);

            self.setState({
              calendarEvents: cEvents,
            });
          }
        }
      } else {
        console.log("No such document!");
      }
    }).then(function (){
      self.getDeadlines();
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
      games: this.props.games,
    };

    const actions = {
      updateClasses: this.props.updateClasses,
      updateRole: this.props.updateRole,
      updateAnnouncements: this.props.updateAnnouncements,
      updateUserImage: this.props.updateUserImage,
      toggleGPA: this.props.toggleGPA,
      toggleAlerts: this.props.toggleAlerts,
      selectClass: this.props.selectClass,
      updateClassPicture: this.props.updateClassPicture,
      getClassAnnouncements: this.props.getClassAnnouncements,
      getAssignments: this.props.getAssignments,
      getHomeworks: this.props.getHomeworks,
      getGames: this.props.getGames,
    };

    if (this.props.page === "home") {
      // If Screen is Big
      if (this.state.width > 600) {

        return (
          <Sidebar {...sideData}>

            <HomeNav firstName={this.state.firstName} lastName={this.state.lastName} gpa={this.state.gpa}
                     expand={this.dockSideBar}
                     showGPA={this.props.showGPA}
                     role={this.props.role}
                     width={this.state.width}/>

            <Row>
              <Col md="1"/>
              <Col md="7">
                {Object.keys(this.state.alerts).map((key, index) =>
                  <AlertHandler key={index} alert={this.state.alerts[index]} uid={this.state.uid}
                                showAlerts={this.props.showAlerts} hiddenAlerts={this.state.hiddenAlerts}/>
                )
                }
              </Col>
            </Row>

            <Row>
              <Col md="1"/>
              <Col md="7">
                <BigCalendar
                  selectable
                  events={this.state.dates}
                  style={calendarStyles}
                  defaultDate={new Date()}
                  eventPropGetter={(this.eventStyleGetter)}
                  onSelectEvent={event => alert(event.title)}
                />
              </Col>

              <Col md="3">
                <EventButton uid={this.state.uid} expanded={this.state.eventButtonOpen} role={this.state.role}/>
              </Col>
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
                     role={this.props.role}
                     width={this.state.width}/>

            <Row>
              <Col md="1"/>
              <Col md="7">
                {Object.keys(this.state.alerts).map((key, index) =>
                  <AlertHandler key={index} alert={this.state.alerts[index]} uid={this.state.uid}
                                showAlerts={this.props.showAlerts} hiddenAlerts={this.state.hiddenAlerts}/>
                )
                }
              </Col>
            </Row>

            <Row>
              <Col md="1"/>
              <Col md="7">
                <BigCalendar
                  toolbar={false}
                  selectable
                  events={this.state.dates}
                  style={calendarStyles}
                  defaultDate={new Date()}
                  eventPropGetter={(this.eventStyleGetter)}
                  onSelectEvent={event => alert(event.title)}
                />
              </Col>
              <Col md="3"/>
            </Row>

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
                    role={this.props.role} personalPage={this.state.personalPage} uid={this.state.uid}
                    showGPA={this.props.showGPA} showAlerts={this.props.showAlerts}/>
        </Sidebar>
      );

    } else if (this.props.page === "classes") {

      return (
        <Sidebar {...sideData}>

          <HomeNav firstName={""} lastName={""} expand={this.dockSideBar}
                   width={this.state.width}/>

          <ClassHome classCode={this.props.path} tab={this.props.tab} {...classData} {...actions} lessonNumber={this.props.lessonNumber} class={this.props.class} uid={this.state.uid} role={this.state.role}/>


        </Sidebar>
      );
    } else if (this.props.page === "liveFeed") {

      return (
        <Sidebar {...sideData}>

          <HomeNav firstName={"In-Class Live Feed"} lastName={""} expand={this.dockSideBar}
                   width={this.state.width}/>

          <Row>
            <Col>
              <LiveFeed {...classData} class={this.props.class} lessonNumber={this.props.lessonNumber} uid={this.state.uid}/>
            </Col>
          </Row>
        </Sidebar>
      );

    } else if (this.props.page === "studGame"){
      return (
        <Sidebar {...sideData}>

          <HomeNav firstName={"In-Class Game: Student"} lastName={""} expand={this.dockSideBar}
                   width={this.state.width}/>

          <Row>
            <Col>
              <StudentMC {...classData} class={this.props.class} lessonNumber={this.props.lessonNumber} uid={this.state.uid}/>
            </Col>
          </Row>
        </Sidebar>
      );
    } else if (this.props.page === "teachGame"){
        return (
            <Sidebar {...sideData}>

                <HomeNav firstName={"In-Class Game: Teacher"} lastName={""} expand={this.dockSideBar}
                         width={this.state.width}/>

                <Row>
                    <Col>
                        <TeacherGame {...classData} class={this.props.class} lessonNumber={this.props.lessonNumber} uid={this.state.uid}/>
                    </Col>
                </Row>
            </Sidebar>
        );
    } else if (this.props.page === "studentLiveFeed") {

      return (
        <Sidebar {...sideData}>

          <HomeNav firstName={"Individual Student Live Feed"} lastName={""} expand={this.dockSideBar}
                   width={this.state.width}/>

          <Row>
            <Col>
              <StudentLiveFeed {...classData} class={this.props.class} lessonNumber={this.props.lessonNumber} studUid={this.props.studUid}/>
            </Col>
          </Row>
        </Sidebar>
      );

    } else if (this.props.page === "createActivity") {
        return (
            <Sidebar {...sideData}>

                <HomeNav firstName={"Create: " + this.props.assType} lastName={""} expand={this.dockSideBar}
                         width={this.state.width}/>

                <Row>
                    <Col>
                        <CreateActivity {...classData} class={this.props.class} assType={this.props.assType}
                                        uid={this.state.uid}/>
                    </Col>
                </Row>
            </Sidebar>
        );

    } else if (this.props.page === "createGame") {
      return (
        <Sidebar {...sideData}>

          <HomeNav firstName={"Create: Game"} lastName={""} expand={this.dockSideBar}
                   width={this.state.width}/>

          <Row>
            <Col>
              <CreateGame {...classData} class={this.props.class} uid={this.state.uid}/>
            </Col>
          </Row>
        </Sidebar>
      );

    } else if (this.props.page === "editActivity") {
            return (
                <Sidebar {...sideData}>
                    <HomeNav firstName={"Editing: " + this.props.assType} lastName={""} expand={this.dockSideBar}
                             width={this.state.width}/>
                    <Row>
                        <Col>
                            <EditActivity {...classData} class={this.props.class} assType={this.props.assType}
                                          uid={this.state.uid} lessonNumber={this.props.lessonNumber}/>
                        </Col>
                    </Row>
                </Sidebar>
            );

    } else if (this.props.page === "homeworks") {

      return (
        <Sidebar {...sideData}>

          <HomeNav firstName={"Homework"} lastName={""} expand={this.dockSideBar}
                   width={this.state.width}/>

          <GenHomework {...classData} {...actions} uid = {this.state.uid} code = {this.props.class} homeworkNumber = {this.props.lessonNumber} />

        </Sidebar>
      );
    } else if (this.props.page === "inclass") {

      return (
        <Sidebar {...sideData}>

          <HomeNav firstName={"Inclass Assignment"} lastName={""} expand={this.dockSideBar}
                   width={this.state.width}/>


          <GenAssignment uid = {this.state.uid}  code = {this.props.class} lessonNumber = {this.props.lessonNumber} />

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
