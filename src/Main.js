import React, { Component } from 'react';

import { firestore } from "./base.js";

import { Route, Switch } from 'react-router-dom';

import HomePage from './HomePage/HomePage';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {

      selectedClass: null,
      className: null,

      classAnnouncements: [{
        title: null,
        subtitle: null,
        message: null,
        class: null,
      }],

      uid: this.props.uid,
      showGPA: null,
      showAlerts: null,

      userImage: null,

      classImage: null,

      role: null,

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

      homeworks: [{
        lessonCode: null,
        maxScore: null,
        name: null,
        class: null,
        questions: null,
      }],

      assignments: [{
        lessonCode: null,
        maxScore: null,
        name: null,
        class: null,
        questions: null,
      }],

      myAssignments: [],
    }
  }

  componentWillMount() {
    this.getRole();
  }

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
          self.updateDates(self.state.dates);
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
          self.updateAnnouncements(self.state.announcements);
        }).catch(function (error) {
          console.log("Error getting document:", error);
        });
      }
      object.pop();

      self.setState({
        announcements: object
      });
    };

    getClassImage = (classImage) => {
      let docRef = firestore.collection("classes").doc(classImage);
      let self = this;

      docRef.get().then(function (doc) {
        if (doc.exists) {
          self.setState({
            classImage: doc.data().classImage,
          });

        } else {
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      })
    };

    updateClasses = (classes) => {
      this.setState({
        classes: classes,
      });
      this.getAnnouncements();
      this.getDeadlines();
    };

    updateDates = (dates) => {
      this.setState({
        dates: dates,
      });
    };

    updateRole = (role) => {
      this.setState({
        role: role,
      });
    }

    updateAnnouncements = (announcements) => {
      this.setState({
        announcements: announcements,
      })
    };

    updateUserImage = (userImage) => {
      this.setState({
        userImage: userImage,
      })
    };

    selectClass = (classCode) => {
      //console.log(classCode);
      this.setState({
        selectedClass: classCode,
      });
      this.getClassAnnouncements(classCode);
      this.getClassImage(classCode);
      this.getAssignments(classCode);
      this.getHomeworks(classCode);
    };

    updateClassPicture = (classImage) => {
      this.setState({
        classImage: classImage,
      });
      this.getClassImage(classImage);
    };

    getClassAnnouncements = (classCode) => {

      let object = [{}];

      let self = this;

      let docRef = firestore.collection("classes").doc(classCode);

      docRef.get().then(function (doc) {
        if (doc.exists) {
          let data = doc.data();
          self.setState({
            className: data.class,
          });
          for (let i in data.announcements) {
            if (data.announcements.hasOwnProperty(i)) {
              object.unshift({
                class: data.announcements[i].class,
                title: data.announcements[i].title,
                subtitle: data.announcements[i].subtitle,
                message: data.announcements[i].message,
              });
              self.setState({
                classAnnouncements: object,
              })
            }
          }
        } else {
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });

      object.pop();

      self.setState({
        classAnnouncements: object
      });
    };

    getShowGPA = () => {
      let self = this;

      let studentRef = firestore.collection("users").doc(this.state.uid);

      studentRef.get().then((doc) => {
        if (doc.exists) {
          self.setState({
            showGPA: doc.data().showGPA,
          });
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    };

  getShowAlerts = () => {
    let self = this;

    let studentRef = firestore.collection("users").doc(this.state.uid);

    studentRef.get().then((doc) => {
      if (doc.exists) {
        self.setState({
          showAlerts: doc.data().showAlerts,
        });
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  toggleGPA = () => {
      let old_state = this.state.showGPA;

      this.setState({
        showGPA: !this.state.showGPA,
      });

      let studentRef = firestore.collection("users").doc(this.state.uid);

      studentRef.update({
        "showGPA": !old_state,
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    };

  toggleAlerts = () => {
    let old_state = this.state.showAlerts;

    this.setState({
      showAlerts: !this.state.showAlerts,
    });

    let studentRef = firestore.collection("users").doc(this.state.uid);

    studentRef.update({
      "showAlerts": !old_state,
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  getAssignments = (classCode) => {

    let object = [{}];

    let self = this;

    let docRef = firestore.collection("classes").doc(classCode).collection("inClass");

    docRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {

        object.unshift({
          lessonCode: doc.id,
          maxScore: doc.data().maxScore,
          name: doc.data().name,
          class: classCode,
          questions: doc.data().questions,
        });
        self.setState({
          assignments: object,
        })

      })
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

    object.pop();

    self.setState({
      assignments: object
    });
  };

  getRole = () => {
    let self = this;
    let studentRef = firestore.collection("users").doc(this.state.uid);

    studentRef.get().then((doc) => {
      if (doc.exists) {
        self.setState({
          role: doc.data().role,
        });
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  getHomeworks = (classCode) => {

    let object = [{}];

    let self = this;

    let docRef = firestore.collection("classes").doc(classCode).collection("homework");

    docRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        object.unshift({
          lessonCode: doc.id,
          maxScore: doc.data().maxScore,
          name: doc.data().name,
          class: classCode,
          questions: doc.data().questions,
        });
        self.setState({
          homeworks: object,
        })
      })
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

    object.pop();

    self.setState({
      homeworks: object
    });

  };

    render()
    {
      const data = {
        uid: this.state.uid,
        role: this.state.role,
        classes: this.state.classes,
        showGPA: this.state.showGPA,
        showAlerts: this.state.showAlerts,
        dates: this.state.dates,
        announcements: this.state.announcements,
        userImage: this.state.userImage,
        selectedClass: this.state.selectedClass,
        className: this.state.className,
        classAnnouncements: this.state.classAnnouncements,
        classImage: this.state.classImage,
        assignments: this.state.assignments,
        homeworks: this.state.homeworks,
      };

      const actions = {
        updateClasses: this.updateClasses,
        updateDates: this.updateDates,
        updateRole: this.updateRole,
        getRole: this.getRole,
        updateAnnouncements: this.updateAnnouncements,
        updateUserImage: this.updateUserImage,
        getShowGPA: this.getShowGPA,
        toggleGPA: this.toggleGPA,
        getShowAlerts: this.getShowAlerts,
        toggleAlerts: this.toggleAlerts,
        selectClass: this.selectClass,
        updateClassPicture: this.updateClassPicture,
        getClassAnnouncements: this.getClassAnnouncements,
        getAssignments: this.getAssignments,
        getHomeworks: this.getHomeworks,
      };

    return (
      <Switch>

        <Route path="/HomePage/:class/lesson/create-activity" render={(match) => (
          <HomePage
            class={match.match.params.class}
            assType="Lesson"
            page="createActivity"
            {...data}
            {...actions}
          />
        )}/>

        <Route path="/HomePage/:class/homework/create-activity" render={(match) => (
          <HomePage
            class={match.match.params.class}
            assType="Homework"
            page="createActivity"
            {...data}
            {...actions}
          />
        )}/>

        <Route path="/HomePage/:class/lessons/liveFeed/:lessonNumber/:uid" render={(match) => (

          <HomePage
            studUid={match.match.params.uid}
            class={match.match.params.class}
            lessonNumber={match.match.params.lessonNumber}
            page="studentLiveFeed"
            {...data}
            {...actions}
          />
        )}/>

        <Route path="/HomePage/:class/lessons/liveFeed/:lessonNumber" render={(match) => (

          <HomePage
            class={match.match.params.class}
            lessonNumber={match.match.params.lessonNumber}
            page="liveFeed"
            {...data}
            {...actions}
          />
        )}/>
          <Route path="/HomePage/:class/lessons/liveFeed/:lessonNumber/:uid" render={(match) => (
            this.state.role  === "teacher"
              ?
                <HomePage
                  studUid={match.match.params.uid}
                  class={match.match.params.class}
                  lessonNumber={match.match.params.lessonNumber}
                  page="studentLiveFeed"
                  {...data}
                  {...actions}
                />
              :
                <Route path="/homepage/:class" render={(match) => (
                  <HomePage
                    path={match.match.params.class}
                    page="classes"
                    {...data}
                    {...actions}
                  />
                )}/>
          )}/>

          <Route path="/HomePage/:class/lessons/liveFeed/:lessonNumber" render={(match) => (
            this.state.role  === "teacher"
              ?
            <HomePage
              class={match.match.params.class}
              lessonNumber={match.match.params.lessonNumber}
              page="liveFeed"
              {...data}
              {...actions}
            />
              :
              <Route path="/homepage/:class" render={(match) => (
                <HomePage
                  path={match.match.params.class}
                  page="classes"
                  {...data}
                  {...actions}
                />
              )}/>
          )}/>
        }

        <Route path="/HomePage/:class/lessons/:lessonNumber" render={(match) => (

          <HomePage
            class={match.match.params.class}
            lessonNumber={match.match.params.lessonNumber}
            page="inclass"
            {...data}
            {...actions}
          />

        )}/>

        <Route path="/HomePage/:class/homework/:lessonNumber" render={(match) => (
          this.state.role === "teacher"
            ?
            <HomePage
              class={match.match.params.class}
              lessonNumber={match.match.params.lessonNumber}
              page="liveFeed"
              {...data}
              {...actions}
            />
            :
            <HomePage
              class={match.match.params.class}
              lessonNumber={match.match.params.lessonNumber}
              page="homeworks"
              {...data}
              {...actions}
            />
        )}/>

          <Route path="/HomePage/:class/myStudents/:assCol/:assKey" render={(match) => (

              <HomePage
                  class={match.match.params.class}
                  assCol={match.match.params.assCol}
                  assKey={match.match.params.assKey}
                  page="gradingPage"
                  {...data}
                  {...actions}
              />
          )}/>

        <Route path="/homepage/:class/:tab" render={(match) => (
          <HomePage
            tab={match.match.params.tab}
            path={match.match.params.class}
            page="classes"
            {...data}
            {...actions}
          />
        )}/>

        <Route path="/homepage/:class" render={(match) => (
          <HomePage
            tab='announcements'
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