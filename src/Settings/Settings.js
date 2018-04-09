import React, { Component } from 'react';

import SetClassroom from './SetClassroom';
import SetPersonal from './SetPersonal';


import './Settings.css'
import { firestore } from "../base";

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: props.uid,

            role: this.props.role,

            personalPage: true,
            name: null,
            email: null,
            phoneN: null,
            descript: null,

            // classes: [{
            //     class: null,
            //     teacher: null,
            //     code:null,
            // }],
          classes: this.props.classes,
        };
        this.getRole();
        this.getEmail();
        this.getPhone();
        this.getDescript();
        //this.getClasses();
        this.getName();
    }

    componentDidUpdate() {

    }

  getRole = () => {
    let docRef = firestore.collection("users").doc(this.state.uid);
    let self = this;

    docRef.get().then(function(doc) {
      if (doc.exists) {
        self.setState({
          role: doc.data().role,
        });
      } else {
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  };

    getName = () => {
        let docRef = firestore.collection("users").doc(this.state.uid);
        let self = this;

        docRef.get().then(function(doc) {
            if (doc.exists) {
                self.setState({
                    name: doc.data().firstName,
                });
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

    };

    getEmail = () => {
        let docRef = firestore.collection("users").doc(this.state.uid);
        let self = this;

        docRef.get().then(function(doc) {
            if (doc.exists) {
                self.setState({
                    email: doc.data().email,
                });
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

    };

    getPhone = () => {
        let docRef = firestore.collection("users").doc(this.state.uid);
        let self = this;

        docRef.get().then(function(doc) {
            if (doc.exists) {
                self.setState({
                    phoneN: doc.data().phone,
                });
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

    };

    getDescript = () => {
        let docRef = firestore.collection("users").doc(this.state.uid);
        let self = this;

        docRef.get().then(function(doc) {
            if (doc.exists) {
                self.setState({
                    descript: doc.data().descript,
                });
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

    };

    getClasses = () => {
        let docRef = firestore.collection("users").doc(this.state.uid);
        let self = this;

        docRef.get().then(function(doc) {
            if (doc.exists) {
                self.setState({
                    classes: doc.data().classes,
                    teacher: doc.data().teacher,
                    code: doc.data().code,
                });
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        })

    };

    updatePersonal = (mail, number, descriptText) => {
        this.setState({
            email: mail,
            phoneN: number,
            descript: descriptText,
        });
    };

    render() {

      const actions = {
        updateClasses: this.props.updateClasses,
        updateRole: this.props.updateRole,
        updateAnnouncements: this.props.updateAnnouncements,
        updateUserImage: this.props.updateUserImage,
        toggleGPA: this.props.toggleGPA,
        toggleAlerts: this.props.toggleAlerts,
        selectClass: this.props.selectClass,
        updateClassPicture: this.props.updateClassPicture,
        getClassAnnouncments: this.props.getClassAnnouncments,
      };

        if (this.state.name === null)
            return false;
        
        return (
            <div>

                {this.props.personalPage
                        ?
                        <SetPersonal
                            {...actions}
                            updateUserImage={ this.props.updateUserImage }
                            userImage={ this.props.userImage }
                            uid={this.state.uid}
                            name={this.state.name}
                            role={this.state.role}
                            email={this.state.email}
                            phoneN={this.state.phoneN}
                            descript={this.state.descript}
                            showGPA={this.props.showGPA}
                            showAlerts={this.props.showAlerts}
                            updateP={this.updatePersonal.bind(this)}
                        />
                        :
                        <SetClassroom
                            {...actions}
                            updateClasses={ this.props.updateClasses }
                            role={this.state.role}
                            uid={this.state.uid}
                            name={this.state.name}
                            email={this.state.email}
                            phoneN={this.state.phoneN}
                            descript={this.state.descript}
                            classes={this.props.classes}
                        />
                }

            </div>
        );
    }
}

export default Settings
