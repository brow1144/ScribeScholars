import React, { Component } from 'react';

import {Table, Container, Row, Col } from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom'

import { firestore } from '../base.js'

import './Table.css'

class AssignTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      role: null,
    }
  }

  componentWillMount() {
    this.getRole();
  }

  getRole = () => {
    let docRef = firestore.collection("users").doc(this.props.uid);
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

  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col className={"makeSpace"}>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className={"homeworkTitle"}>In-class Assignments</p>
            </Col>
          </Row>
          <Row>
            <Col className={"makeSpace"}>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <p className={"pText"}>Available Assignments</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Table>
                <thead>
                <tr>
                  <th>Assignment</th>
                  <th>Max Score</th>
                  <th>Links</th>
                </tr>
                </thead>
                {this.props.assignments
                  ?
                  <tbody>
                  {Object.keys(this.props.assignments).map((key, index) => {
                    return <tr key={key}>
                      <td>{this.props.assignments[index].name}</td>
                      <td>{this.props.assignments[index].maxscore}</td>
                      <td>
                        {this.state.role === "teacher" ?
                          <RouterLink
                            to={`/ScribeScholars/HomePage/${this.props.code}/lessons/liveFeed/${this.props.assignments[index].lessonCode}`}>
                            Link
                          </RouterLink>
                          :
                          <RouterLink
                            to={`/ScribeScholars/HomePage/${this.props.code}/lessons/${this.props.assignments[index].lessonCode}`}>
                            Link
                          </RouterLink>
                        }
                      </td>
                    </tr>
                  })}
                  </tbody>
                  :
                  <tbody>
                  </tbody>
                }

              </Table>
            </Col>
          </Row>
          <Row>
            <Col className={"moreSpace"}>
                {this.state.role === "teacher"
                    ?
                    <RouterLink to={`/ScribeScholars/HomePage/${this.props.code}/lesson/create-activity`}>
                        Create New In Class Lesson
                    </RouterLink>
                    :
                    <div/>
                }
            </Col>
          </Row>
          <Row>
            <Col className={"moreSpace"}>
            </Col>
          </Row>
        </Container>

      </div>
    )
  }
}


export default AssignTable

//
//EXAMPLE CODE FROM WALTERS INITIAL TEMPLATES
//

//
//VIDEO EXAMPLE
//
/*
import React, { Component } from 'react';
import ReactPlayer from 'react-player'

class VideoActivity extends Component {
    constructor(this.props) {
        super(this.props);
        this.state = {}
    }
    render() {
        return(
            <div className='player-wrapper'>
                <ReactPlayer
                    url='https://www.youtube.com/watch?v=VAB8ShsX1U4'
                    className='react-player'
                    controls
                />
            </div>
        );
    }
}

export default VideoActivity
 */

//
//MCQ EXAMPLE
//
/*
import React, { Component } from 'react';

import { Col, FormGroup, Label, Input} from 'reactstrap';

import './MCQ.css';

class MCQ extends Component {
    constructor(this.props) {
        super(this.props);
        this.state = {
            selectedOption: "",
            question: this.this.props.question,
        }

    }


    render() {
        return(
            <FormGroup tag={"fieldset"}>
                <legend className={"RadioTitle"}>#1 This Is The Question Header?</legend>
                <Col sm={{ size:10 }} >
                    <FormGroup>
                        <Label className={"RadioLabel"}>
                            <Input className={"RadioButton"} type="radio" name="radio1" />{' '}
                            <p>Possible Answer Number 1</p>
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label className={"RadioLabel"}>
                            <Input className={"RadioButton"} type="radio" name="radio1" />{' '}
                            <p>Possible Answer Number 2</p>
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label className={"RadioLabel"}>
                            <Input className={"RadioButton"} type="radio" name="radio1"/>
                            <p>Possible Answer Number 3</p>
                        </Label>
                    </FormGroup>
                </Col>
            </FormGroup>

        );
    }
}

export default MCQ*/

//
//EXAMPLE FRQ
//
/*
import React, { Component } from 'react';

import { Col, FormGroup, Label, Input } from 'reactstrap';

import './FRQ.css';

class FRQ extends Component {
    constructor(this.props) {
        super(this.props);
        this.state = {
        }
    }


    render() {
        return(
            <FormGroup tag={"fieldset"}>
                <FormGroup row>
                    <Col sm={"6"}>
                        <Label className={"FRQTitle"} for="exampleText">#2 Free Response Question Goes Here</Label>
                        <Input style={{height: '20rem'}} type="textarea" name="text" id="exampleText" />
                    </Col>
                </FormGroup>
            </FormGroup>

        );
    }
}

export default FRQ*/
