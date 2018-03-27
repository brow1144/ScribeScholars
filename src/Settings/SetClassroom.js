import React, { Component } from 'react';

import { firestore , storageRef } from "../base";

import { NavLink } from 'react-router-dom'

import { Label, InputGroupText, InputGroup, InputGroupAddon, Button, Container, Row, Col, Form, FormGroup, Alert, Input, ModalBody, ModalFooter, ModalHeader, Modal } from 'reactstrap';

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import './SetClassroom.css';
import 'react-accessible-accordion/dist/react-accessible-accordion.css';

class SetClassroom extends Component {
    constructor(props) {
      super(props);

      this.state = {
        uid: props.uid,
        deletionCode: null,
        modal: false,

        role: this.props.role,

        newClass: null,
        newClassCode: null,
        newClassTeacher: null,

        tempStudents: [],
        tempClassList: [],

        classes: this.props.classes,

        students: null,

        file: null,

        makeAnn: null,

        errorCode: "",
        visible: false,

        kyleVisible: false,
        annVisible: false,
      };
    }

    checkClasses = () => {
      let self = this;

      // get student's classes
      let studentRef = firestore.collection("users").doc(self.state.uid);
      studentRef.get().then(function(doc) {
        if (doc.exists) {
          if (doc.data().classes != null) {
            self.setState({
              classes: doc.data().classes,
            });
          }

          self.joinClass(studentRef);
        } else {
          console.log("user not found");
        }
      }).catch(function(error) {
        console.log("Error getting document: ", error);
      });
    };

    joinClass = (studentRef) => {
      let self = this;

      // check if student is already in class
      if (self.state.classes != null) {
        for (let i in self.state.classes) {
          if (self.state.classes[i].code === self.state.newClassCode) {
            self.setState({
              errorCode: "Already enrolled in this class",
              visible: true,
            });
            return;
          }
        }
      }

      // create new temporary class
      let tmpNewClass = [{
        class: self.state.newClass,
        code: self.state.newClassCode,
        teacher: self.state.newClassTeacher,
      }];

      // add temporary class to classes
      if (self.state.classes != null) {
        self.setState({
          classes: self.state.classes.concat(tmpNewClass),
        });
      } else {
        self.setState({
          classes: tmpNewClass,
        });
      }

      studentRef.update({
        classes: self.state.classes,
      }).then(function() {
        console.log("Successfully updated classes list");
      }).catch(function(error) {
        console.log("Error updating document: ", error);
      });

      self.props.updateClasses(self.state.classes);

      // add student to class roster
      let docRef = firestore.collection("classes").doc(self.state.newClassCode);
      docRef.get().then(function(doc) {
        if (doc.exists) {
          if (self.state.students != null) {
            self.setState({
              students: self.state.students.concat(self.state.uid),
            });
          } else {
            self.setState({
              students: self.state.uid,
            })
          }
          docRef.update({
            students: self.state.students,
          }).then(function() {
            console.log("Successfully updated students list");
          }).catch(function(error) {
            console.log("Error updating document: ", error);
          });
        } else {
          self.setState({
            errorCode: "Class not found",
            visible: true,
          });
        }
      }).catch(function(error) {
        console.log("Error getting document: ", error);
      });
    };

    onFormSubmit = (ev) => {
      ev.preventDefault();
      let self = this;

      let code = ev.target.classCode.value;
      let newName = ev.target.className.value;

      if (newName === "") {
        this.setState({
          kyleVisible: true,
        });
        return;
      } else {
        this.setState({
          kyleVisible: false,
        })
      }


      let docRef = firestore.collection("classes").doc(code);

      docRef.update({
        class: newName,
      })
        .then(function() {
          console.log("Document successfully updated!");
        }).catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });

      docRef.get().then(function(doc) {
        if (doc.exists) {
          let data= doc.data();
          let announcements = data.announcements;

          for (let k in announcements) {
            announcements[k].class = newName;
          }

          docRef.update({
            announcements: announcements,
          })
            .then(function() {
              console.log("Document successfully updated!");
              self.props.getClassAnnouncments(code);
            }).catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
        } else {
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });


      let tclasses = [];
      let teacherRef = firestore.collection("users").doc(self.state.uid);
      teacherRef.get().then(function(doc) {
        if (doc.exists) {
          let data = doc.data();
          tclasses = data.classes;

          for (let j in tclasses) {
            if (tclasses[j].code === code)
              tclasses[j].class = newName;
          }

          teacherRef.update({
            classes: tclasses,
          })
            .then(function() {
              console.log("Document successfully updated!");
            }).catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
          self.props.updateClasses(tclasses);
        } else {
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });


      docRef.get().then(function(doc) {
        if (doc.exists) {
          let data= doc.data();
          let students = data.students;

          for (let i in students) {
            let classes = [];

            let studentsRef = firestore.collection("users").doc(students[i]);
            studentsRef.get().then(function(doc) {
              if (doc.exists) {
                let data = doc.data();
                classes = data.classes;

                for (let j in classes) {
                  if (classes[j].code === code)
                    classes[j].class = newName;
                }

                studentsRef.update({
                  classes: classes,
                })
                  .then(function() {
                    console.log("Document successfully updated!");
                  }).catch(function(error) {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error);
                });
                //self.props.updateClasses(classes);
              } else {
                console.log("No such document!");
              }
            }).catch(function(error) {
              console.log("Error getting document:", error);
            });

          }

        } else {
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    };

  onJoinClass = (ev) => {
    ev.preventDefault();
    let self = this;

    let code = ev.target.classCode.value;
    ev.target.reset();

    if (code !== "") {
      let docRef = firestore.collection("classes").doc(code);
      docRef.get().then(function (doc) {
        if (doc.exists) {
          let data = doc.data();
          self.setState({
            newClass: data.class,
            newClassCode: code,
            newClassTeacher: data.teacher,
            students: data.students,
          });

          self.checkClasses();
        } else {
          self.setState({
            errorCode: "Class not found",
            visible: true,
          });
        }
      }).catch(function (error) {
        console.log("Error getting document: ", error);
      });
    } else {
      self.setState({
        errorCode: "Please enter a 6-digit code",
        visible: true,
      });
    }
  };

    handleDeleteClick = (classCode) => {
        let self = this;

        self.setState({modal: false,});
        let classRef = firestore.collection("classes").doc(classCode);
        let studentRef = firestore.collection("users").doc(self.state.uid);

        classRef.get().then(function(doc) {
            self.setState({
                tempStudents: doc.data().students
            });
            let i = self.state.tempStudents.indexOf(self.state.uid);
            self.state.tempStudents.splice(i,1);
            classRef.update({
                students: self.state.tempStudents
            }).then(function() {
                console.log("Student list updated")
            })

        });

        studentRef.get().then(function(doc) {
            self.setState({
                tempClassList: doc.data().classes
            });
/*            let i = self.state.tempClassList.indexOf(classCode);*/
            let i = 0;
            for (let j = 0; j < self.state.tempClassList.length; j++)
            {
                if (self.state.tempClassList[j].code === classCode)
                {
                    i = j;
                    break;
                }
            }
            self.state.tempClassList.splice(i,1);
            studentRef.update({
                classes: self.state.tempClassList,
            }).then(function() {
                self.setState({
                    classes: self.state.tempClassList,
                });
                console.log("Class list updated");
                self.props.updateClasses(self.state.classes);
            })

        });
    };

    handlePicture = (ev) => {
      ev.preventDefault();

      let classCode = ev.target.className;
      classCode = classCode.substring(0, 6);

      let self = this;
      let reader = new FileReader();
      let file = ev.target.files[0];

      reader.onloadend = () => {
        self.setState({
          file: file,
        });
      };


      let imageUrl = null;
      let userImageRef = storageRef.ref().child(`${classCode}`);
      userImageRef.put(file).then(function(snapshot) {
        imageUrl = snapshot.metadata.downloadURLs[0];
        console.log('Uploaded a blob or file!');
      }).then(() => {
        let classes = firestore.collection("classes").doc(classCode);

        classes.update({
          'classImage': imageUrl,
        }).then(function() {
          console.log("Document Updated.")
        });

      });

    };

    handleNewAnn = (ev, classCode) => {
      ev.preventDefault();
      let self = this;

      let subtitle = ev.target.subtitle.value;
      let title = ev.target.title.value;
      let message = ev.target.message.value;

      if (subtitle === "" || title === ""  || message === "") {
        this.setState({
          annVisible: true,
        });
        return;
      } else {
        this.setState({
          annVisible: false,
        })
      }

      let classRef = firestore.collection("classes").doc(classCode);

      classRef.get().then(function(doc) {
        if (doc.exists) {
          if (doc.data().announcements != null) {
            self.setState({
              announcements: doc.data().announcements,
              newTitle: title,
              newSubtitle: subtitle,
              newMessage: message,
              class: doc.data().class,
            });
            self.addAnnouncement(classRef);
          }
        } else {
          console.log("user not found");
        }
      }).catch(function(error) {
        console.log("Error getting document: ", error);
      });
    };

    addAnnouncement = (classRef) => {
      let self = this;
      let tmpNewAnnouncement = [{
        message: self.state.newMessage,
        subtitle: self.state.newSubtitle,
        title: self.state.newTitle,
        class: self.state.class,
      }];

      // add temporary class to classes
      if (self.state.announcements != null) {
        self.setState({
          announcements: self.state.announcements.concat(tmpNewAnnouncement),
        });
      } else {
        self.setState({
          announcements: tmpNewAnnouncement,
        });
      }

      classRef.update({
        announcements: self.state.announcements,
      }).then(function() {
        console.log("Successfully updated classes announcements");

      }).catch(function(error) {
        console.log("Error updating document: ", error);
      });

    };

    onDismiss = () => {
      this.setState({
        visible: false,
      });
    };

    toggle = (codeToDelete) => {
        this.setState({
            deletionCode: codeToDelete,
            modal: !this.state.modal,
        });
    };

  onKyleDismiss = () => {
    this.setState({ visible: false });
  };

    render() {

      if (this.state.file !== null) {
        this.handleFirebase();
      }

       return(
            <Container fluid className={"ContainerRules"}>
                <Row className={"Filler"}> </Row>
                <Row className={"BannerRow"}>
                    <Col xs={"12"} sm={"12"} md={"12"} lg={"12"} xl={"12"} className={"BannerCol"}>
                        <h1>{this.props.name}'s Classroom Settings:</h1>
                    </Col>
                </Row>
                <Row className={"Filler"}> </Row>
                <Row className={"Filler"}> </Row>
                <Row className={"BoxForm"}>
                    <Col xs={"5"}>
                        <div>

                          {this.state.role === "student" && this.props.classes != null && this.props.classes.length !== 0
                            ?
                            <Accordion>
                                {this.props.classes != null && Object.keys(this.props.classes).map((key, index) => {
                                    return <AccordionItem key={key}>
                                        <AccordionItemTitle>
                                            <h3>
                                                {this.props.classes[index].class}
                                            </h3>
                                        </AccordionItemTitle>
                                        <AccordionItemBody className={"accordBody"}>
                                            <div>
                                                <h5 className={"codeText"}>
                                                    Class Code: {this.props.classes[index].code}
                                                </h5>
                                                <span onClick={ () => this.toggle(this.props.classes[index].code)} className={"clickableIcon float-right"}>
                                                    <i style={{cursor: 'pointer'}} className="fas fa-trash-alt" />
                                                </span>
                                            </div>
                                        </AccordionItemBody>
                                    </AccordionItem>
                                })}
                            </Accordion>
                            :
                            null
                          }

                          {this.state.role === "teacher" && this.props.classes != null && this.props.classes.length !== 0
                            ?
                            <Accordion>
                              {this.props.classes != null && Object.keys(this.props.classes).map((key, index) => {
                                return <AccordionItem key={key}>
                                  <AccordionItemTitle>
                                    <h3>
                                      {this.props.classes[index].class}
                                    </h3>
                                  </AccordionItemTitle>
                                  <AccordionItemBody className={"accordBody"}>
                                    <div className="inside">
                                      <Row>
                                        <Col className="codeText" xs="12" md="12">
                                          Class Code: {this.props.classes[index].code}
                                        </Col>
                                      </Row>

                                      <hr/>

                                      <p className="skinnyFont">Upload Class Image</p>

                                      <Alert color="info" >
                                        Only PNG and JPEG Images Accepted!
                                      </Alert>
                                      <Row>
                                        <Col className="picIcon" xs="12" md="12">
                                          <Input onChange={this.handlePicture} type="file" name="file" id="exampleFile" className={this.props.classes[index].code} />
                                        </Col>
                                      </Row>

                                      <hr/>
                                      <p className="skinnyFont">Change Class Name</p>

                                        <Row>
                                          <Col sm="12">
                                            <Form onSubmit={this.onFormSubmit}>
                                              <Input className={"hidden"} id="classCode" name="classCode" defaultValue={this.props.classes[index].code} />

                                              <FormGroup row>
                                                <Col xs="7">
                                                  {this.state.kyleVisible ?
                                                    <Alert color="danger" isOpen={this.state.kyleVisible}>
                                                      Please Enter a valid class name
                                                    </Alert>
                                                  :
                                                    null
                                                  }
                                                  <InputGroup size="10">
                                                    <InputGroupAddon addonType="prepend">Class Name</InputGroupAddon>
                                                    <Input bsSize="md" type="username" name="className" id="exampleClassName" defaultValue={this.props.classes[index].class} />
                                                  </InputGroup>

                                                </Col>
                                              </FormGroup>
                                              <Button outline color="success" size={"lg"}>
                                                <i className="far fa-save" />
                                              </Button>
                                              <span className="deleteIcon" onClick={ () => this.toggle(this.props.classes[index].code)}>
                                                <i className="fas fa-trash-alt picIcon"/>
                                              </span>
                                            </Form>
                                          </Col>
                                        </Row>
                                      <hr />
                                      <p className="skinnyFont">Add an Announcement</p>

                                      <Form onSubmit={(ev) => this.handleNewAnn(ev, this.props.classes[index].code)}>

                                          <Alert color="danger" isOpen={this.state.annVisible}>
                                            Please Enter a valid announcement name
                                          </Alert>

                                          <Row className={"rowt"}>
                                            <Col>
                                              <Label check>
                                                <Input type="select" name="subtitle">
                                                  <option>Test</option>
                                                  <option>Quiz</option>
                                                  <option>Homework</option>
                                                  <option>Misc.</option>
                                                </Input>
                                              </Label>
                                            </Col>
                                          </Row>
                                          <br />

                                          <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                              <InputGroupText>Title</InputGroupText>
                                            </InputGroupAddon>
                                            <Input name="title" />
                                          </InputGroup>
                                          <br />

                                          <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                              <InputGroupText>Message</InputGroupText>
                                            </InputGroupAddon>
                                            <Input name="message" type="textarea" />
                                          </InputGroup>
                                          <br />

                                          <Button type="submit" outline color="success" size={"lg"}>
                                            <i className="far fa-arrow-alt-circle-right" />
                                          </Button>
                                        </Form>
                                        <hr/>
                                      <p className="skinnyFont">Dashboard Info</p>
                                        <NavLink style={{textDecoration: 'none'}} to={`/DashboardInfo`}>
                                            <Button type="submit" outline color="success" size={"lg"}>
                                                <i className="far fa-arrow-alt-circle-right" />
                                            </Button>
                                        </NavLink>
                                    </div>
                                  </AccordionItemBody>
                                </AccordionItem>
                              })}
                            </Accordion>
                            :
                            null
                          }


                          <Modal size={"lg"} isOpen={this.state.modal} toggle={this.toggle}>
                          <ModalHeader toggle={this.toggle}>Leave Course</ModalHeader>
                            <ModalBody className={"ModalFonts"}>
                              Are you sure you want to leave this class? (You can rejoin!)
                            </ModalBody>
                            <ModalFooter>
                              <Button size={"lg"} color="info" onClick={() => this.handleDeleteClick(this.state.deletionCode)}>Leave Class</Button>
                              <Button size={"lg"} color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                          </Modal>
                        </div>

                        <Row className={"Filler"}> </Row>
                        <Row className={"Filler"}> </Row>

                      {this.state.role === "student"
                        ?
                        <Form onSubmit={this.onJoinClass}>
                            <FormGroup row check>
                                <Col xs={{ size: 10, offset: 0}} sm={{ size: 5, offset: 2}} md={{ size: 5, offset: 2}} lg={{ size: 4, offset: 2}}>
                                    <Input bsSize="lg" type="classCode" name="classCode" id="classToAdd" placeholder="Class Code"/>
                                    <Row className={"Filler"}> </Row>
                                </Col>
                                <Col sm={{ size: 5, offset: 2}}>
                                  <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                                    {this.state.errorCode}
                                  </Alert>
                                </Col>
                                <Col sm={{ size: 3, offset: 2}}>
                                  <Button size={"lg"}>Join This Class</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                        :
                        <Col >
                          <Row>
                            <NavLink style={{ textDecoration: 'none' }} to={`/create-class`}>
                              <Button type="submit" className="createClassButton" size ="lg" block>Create Class!</Button>
                            </NavLink>
                          </Row>
                        </Col>
                      }

                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SetClassroom