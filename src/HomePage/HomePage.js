import React, { Component } from 'react';

import { firestore } from "../base";
import { Button } from 'reactstrap';

import Sidebar from 'react-sidebar';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import Side from './Side';

import './HomePage.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const mql = window.matchMedia(`(min-width: 800px)`);

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class HomePage extends Component {

  constructor(props) {
    super(props);


    this.state = {
      uid: props.uid,

      classes: [{
        class: null,
        teacher: null,
      }],

      dates: [{
        title: null,
        start: null,
        end: null,
        }],

      mql: mql,
      docked: props.docked,
      open: props.open,
      sideButtonVisibility: !props.docked,
    };
  }

  dockSideBar = () => {
    if (this.state.sidebarDocked)
      this.setState({
        sidebarOpen: false,
        sideButtonVisibility: true,
      });
    else
      this.setState({
        sidebarOpen: true,
        sideButtonVisibility: false,
      });
  };


  onSetSidebarOpen = (open) => {
    this.setState({
      sidebarOpen: open,
      sideButtonVisibility: true,
    });
  };

  componentWillMount() {
    this.getClasses();
    mql.addListener(this.mediaQueryChanged);
    this.setState({
      mql: mql,
      sidebarDocked: mql.matches,
      sideButtonVisibility: !this.state.mql.matches,
    });
  };

  getClasses = () => {
    let docRef = firestore.collection("users").doc(this.state.uid);
    let self = this;

    docRef.get().then(function(doc) {
      if (doc.exists) {
        self.setState({
          classes: doc.data().classes,
        });
        self.getDeadlines();
      } else {
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    })

  };

  getDeadlines = () => {

    let object = [{}];

    let self = this;

    for(let j in self.state.classes) {

      let docRef = firestore.collection("users").doc(self.state.classes[j].teacher);
      let dateRef = docRef.collection(self.state.classes[j].class).doc("deadlines");


      dateRef.get().then(function (doc) {
        if (doc.exists) {
          let data = doc.data();
          //let object = [{}];
          for (let i in data.array) {
            object.unshift( {
              title: data.array[i].title,
              start: new Date(data.array[i].year, data.array[i].month, data.array[i].day),
              end: new Date(data.array[i].year, data.array[i].month, data.array[i].day),
            })
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

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  };

  mediaQueryChanged = () => {
    this.setState({
      sidebarDocked: this.state.mql.matches,
      sideButtonVisibility: !this.state.mql.matches,
    });
  };

  eventStyleGetter = () => {
    let style = {
      backgroundColor: '#21ce99',
    };

    return {
      style: style
    };
  };

  render() {

    let sidebarContent = <Side classes={this.state.classes} />;

    const sidebarStyles = {
      sidebar: {
        backgroundColor: 'f3f3f3',
        width: '8em',
        textAlign: 'center',
      },
      overlay: {
        backgroundColor: '#f3f3f3'
      },
    };

    const calendarStyles = {
      padding: "5em 0em 0em 5em",
      height: "55rem",
      width: "85rem"
    };

    return (

      <Sidebar styles={sidebarStyles}
               sidebar={sidebarContent}
               open={this.state.sidebarOpen}
               docked={this.state.sidebarDocked}
               onSetOpen={this.onSetSidebarOpen}>

        {this.state.sideButtonVisibility
          ?
          <Button outline onClick={this.dockSideBar}>
            <i className="fas fa-bars"/>
          </Button>
          :
          null
        }

        <BigCalendar
          events={this.state.dates}
          style={calendarStyles}
          defaultDate={new Date()}
          eventPropGetter={(this.eventStyleGetter)}
        />

      </Sidebar>
    );
  }
}

export default HomePage;
