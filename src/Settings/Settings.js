import React, { Component } from 'react';
import { Button } from 'reactstrap';

import Sidebar from 'react-sidebar';
import SettingsSide from './SettingsSide';

import SetClassroom from './SetClassroom';
import SetPersonal from './SetPersonal';


import './Settings.css'
import {firestore} from "../base";


const mql = window.matchMedia(`(min-width: 800px)`);


class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: props.uid,

            personalPage: true,
            name: null,
            email: null,
            phoneN: null,
            descript: null,

            mql: mql,
            docked: props.docked,
            open: props.open,
            sideButtonVisibility: !props.docked,
            classes: [{
                class: null,
                teacher: null,
            }],
        };
        this.getEmail();
        this.getPhone();
        this.getDescript();
        this.getClasses();
        this.getName();
    }

    /*componentDidUpdate() {
        console.log("Forcing State Update")
    }*/


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
        mql.addListener(this.mediaQueryChanged);
        this.setState({
            mql: mql,
            sidebarDocked: mql.matches,
            sideButtonVisibility: !this.state.mql.matches,
        });
    };

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
        this.setState(this.state);
    };

    mediaQueryChanged = () => {
        this.setState({
            sidebarDocked: this.state.mql.matches,
            sideButtonVisibility: !this.state.mql.matches,
        });
    };

    flipToClass = () => {
      this.setState({
          personalPage: false,
      });
    };

    flipToPersonal = () => {
        this.setState({
            personalPage: true,
        });
    };

    getName = () => {
        let docRef = firestore.collection("users").doc(this.state.uid);
        let self = this;

        docRef.get().then(function(doc) {
            if (doc.exists) {
                self.setState({
                    name: doc.data().name,
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
        let sidebarContent = <SettingsSide flipc={this.flipToClass.bind(this)} flipp={this.flipToPersonal.bind(this)}/>;

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

        if (this.state.name === null)
            return false;
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
                    <br/>
                }

                {this.state.personalPage
                        ?
                        <SetPersonal
                            uid={this.state.uid}
                            name={this.state.name}
                            email={this.state.email}
                            phoneN={this.state.phoneN}
                            descript={this.state.descript}
                            updateP={this.updatePersonal.bind(this)}
                        />
                        :
                        <SetClassroom
                            uid={this.state.uid}
                            name={this.state.name}
                            email={this.state.email}
                            phoneN={this.state.phoneN}
                            descript={this.state.descript}
                            classes={this.state.classes}
                        />
                }

            </Sidebar>
        );
    }
}

export default Settings
