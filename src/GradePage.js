import React, { Component } from 'react';
import { firestore } from './base.js';
import Text from 'react-native';

import ReactList from 'react-list';
import logo from './logo.svg'

class GradePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            uid: props.uid,
            studentName: null,
            assignments: [],
        }

        this.getAssignments();
    }

    getAssignments() {
        let self = this;

        let teacherRef = firestore.collection("users").doc(self.state.uid);
        teacherRef.get().then(function (doc) {
            if (doc.exists) {
                if (doc.data().assignments != null) {
                    self.setState({
                        assignments: doc.data().assignments,
                        name: doc.data().firstName + " " + doc.data().lastName,
                    });
                }
            } else {
                console.log("user not found");
            }
        }).catch(function (error) {
            console.log("Error getting document: ", error);
        });
    }

    renderAssignment = (i) => {
        return (
            <Text style={{fontSize: 20,  fontWeight: 'bold'}}>
                Hi
            </Text>
        );
    }

    render() {
        return (
          <div className="text-center">
              <div className="Absolute-Center is-Responsive">

                  <div className="form-group">
                      <img src={logo} alt="" width="100" height="100"/>
                  </div>

                  <div className="form-group">
                      <h3 className="h3 font-weight-normal">{this.state.name}'s Grades</h3>
                  </div>

                  <div style={{overflow: 'auto', maxHeight: 400}}>

                      <ReactList
                          itemRenderer={this.renderAssignment}
                          length={this.state.assignments.length}
                          type='uniform'
                      />
                  </div>

              </div>
          </div>
        );
    }

}

export default GradePage;