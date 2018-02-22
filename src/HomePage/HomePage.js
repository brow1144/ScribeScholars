import React, { Component } from 'react';

import { firestore } from "../base";
import { Row, Col } from 'reactstrap';

import Sidebar from 'react-sidebar';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import Side from './Side';
import HomeNav from './HomeNav'
import Cards from './Cards'

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
      uid: props.uid,

      firstName: null,
      lastName: null,

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

      width: window.innerWidth,

      mql: mql,
      docked: props.docked,
      open: props.open,
    };
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

    docRef.get().then(function(doc) {
      if (doc.exists) {
        if (doc.data().classes !== null) {
          self.setState({
            classes: doc.data().classes,
          });
          self.getDeadlines();
          self.getAnnouncements();
        }
        if (doc.data().firstName !== null && doc.data().lastName !== null) {
          self.setState({
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
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


    let sidebarContent = <Side uid={this.state.uid} classes={this.state.classes} />;

    const sidebarStyles = {
      sidebar: {
        backgroundColor: '##f2f2f2',
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

    // If Screen is Big
    if (this.state.width > 600) {
      return (

        <Sidebar styles={sidebarStyles}
                 sidebar={sidebarContent}
                 open={this.state.sidebarOpen}
                 docked={this.state.sidebarDocked}
                 onSetOpen={this.onSetSidebarOpen}>

          <HomeNav firstName={this.state.firstName} lastName={this.state.lastName} expand={this.dockSideBar} width={this.state.width}/>
          <Row>

            <Col md="1"/>
            <Col md="8">
              <BigCalendar
                events={this.state.dates}
                style={calendarStyles}
                defaultDate={new Date()}
                eventPropGetter={(this.eventStyleGetter)}
              />
            </Col>
            <Col md="3"/>
          </Row>

          <hr className="divider" />
          <b className="annTest">Announcements</b>

            <div className="announcementsDiv">
              <Cards announcements={this.state.announcements}/>
            </div>

        </Sidebar>
      );
      // If Screen is Small
    } else {
      return (
        <Sidebar styles={sidebarStyles}
                 sidebar={sidebarContent}
                 open={this.state.sidebarOpen}
                 docked={this.state.sidebarDocked}
                 onSetOpen={this.onSetSidebarOpen}>

          <HomeNav firstName={this.state.firstName} lastName={this.state.lastName} expand={this.dockSideBar} width={this.state.width}/>

          <hr className="divider" />
          <b>Announcements</b>

          <div className="announcementsDiv">
            <Cards announcements={this.state.announcements}/>
          </div>

        </Sidebar>
      );
    }
  }
}

export default HomePage;
