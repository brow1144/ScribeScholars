import React, { Component } from 'react';
import { firestore } from './base.js';

import ReactListView from "react-list-view";
import logo from './logo.svg'

class GradePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: props.uid,
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
                    });
                }
            } else {
                console.log("user not found");
            }
        }).catch(function (error) {
            console.log("Error getting document: ", error);
        });
    }

    render() {
        return (
          <div className="text-center">
              <div className="Absolute-Center is-Responsive">

                  <div className="form-group">
                      <img src={logo} alt="" width="100" height="100"/>
                  </div>

                  <ReactListView
                      style={{
                          height: 400,
                          width: 400,
                      }}
                      rowCount={this.state.assignments.length}
                      rowHeight={40}
                      renderItem={(x, y, style) =>
                          <div style={style}>
                              {this.state.assignments[y].name} {this.state.assignments[y].score}/{this.state.assignments[y].maxscore}
                          </div>
                      }
                  />

              </div>
          </div>
        );
    }

}

export default GradePage;