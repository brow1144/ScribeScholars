import React, { Component } from 'react';

import { Button, Container, Row, Col, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalFooter, ModalBody} from 'reactstrap';

import { firestore , storageRef } from "../base";
import firebase from '../base.js';

import './SetPersonal.css';

class SetPersonal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: props.uid,
            name: props.name,
            email: props.email,
            phoneN: props.phoneN,
            descript: props.descript,
            modal: false,
        };

        this.toggle = this.toggle.bind(this);
        this.resetPass = this.resetPass.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    resetPass = () => {
        this.toggle();
        firebase.auth().sendPasswordResetEmail(
            this.state.email)
            .then(function () {
                console.log("Reset Email Sent")
            })
            .catch(function () {
                console.log("Cannot send reset email")
            });
    };

  onFormSubmit = (ev) => {
        ev.preventDefault();
        let self = this;
        let user = firestore.collection("users").doc(this.state.uid);

        let userEmail = firebase.auth().currentUser;
        userEmail.updateEmail(ev.target.email.value).then(function () {
           console.log("Email Reset")
        }).catch(function() {console.log("Email Error Occurred")});

        user.update({
            "email": ev.target.email.value,
            "phone": ev.target.number.value,
            "descript": ev.target.descriptText.value,

        }).then(function() {
           console.log("Document Updated.")
        });
        self.props.updateP(ev.target.email.value, ev.target.number.value, ev.target.descriptText.value);
        self.setState({
            email: ev.target.email.value,
            phone: ev.target.number.value,
            descript: ev.target.descriptText.value,
        });
    };


  /**
   *
   * Method to handle retrieving users file -> uploading it to
   * firebase storage -> save it in firestore database.
   *
   * 1. Prevent default handling of files because
   *    I need to save files to firebase after selection
   * 2. Save File to firebase under user ID
   * 3. Save imageURL to users database.
   *
   * @param ev Event to retreive the file picker
   */
  handlePicture = (ev) => {
      ev.preventDefault();
      let self = this;
      let reader = new FileReader();

      let file = ev.target.files[0];

      reader.onloadend = () => {
        self.setState({
          file: file,
        });
      };

      let imageUrl = null;
      let userImageRef = storageRef.ref().child(`${this.state.uid}`);

      userImageRef.put(file).then(function(snapshot) {
        imageUrl = snapshot.metadata.downloadURLs[0];
        console.log('Uploaded a blob or file!');
      }).then(() => {

        let user = firestore.collection("users").doc(self.state.uid);

        user.update({
          'userImage': imageUrl,
        }).then(function() {
          console.log("Document Updated.")
        });

      })
    };


    render() {
        return (

            <Container fluid className={"ContainerRules"}>
                <Row className={"Filler"}> </Row>
                <Row className={"BannerRow"}>
                    <Col xs={"12"} sm={"12"} md={"12"} lg={"12"} xl={"12"} className={"BannerCol"}>
                        <h1>{this.state.name}'s Personal Settings:</h1>
                    </Col>
                </Row>
                <Row className={"Filler"}> </Row>
                <Row className={"Filler"}> </Row>
                <Row className={"BoxForm"}>
                    <Col xs={"12"}>
                        <Form onSubmit={this.onFormSubmit}>
                            <FormGroup row>
                                <Label size="lg" for="exampleEmail" sm={2}>Email:</Label>
                                <Col sm={6}>
                                    <Input bsSize="lg" type="email" name="email" id="exampleEmail" defaultValue={this.state.email}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label size="lg" for="exampleNumber" sm={2}>Phone Number:</Label>
                                <Col sm={6}>
                                    <Input bsSize="lg" type="username" name="number" id="exampleNumber" defaultValue={this.state.phoneN} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label size="lg" for="exampleText" sm={2}>Profile Description:</Label>
                                <Col sm={6}>
                                    <Input bsSize="lg" type="textarea" name="descriptText" id="exampleText" defaultValue={this.state.descript} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label size="lg" for="exampleFile" sm={2}>Profile Picture:</Label>
                                <Col sm={10}>
                                    <Input onChange={this.handlePicture} bsSize="lg" type="file" name="file" id="exampleFile" />
                                    <FormText size="lg" color="muted">
                                        Please only upload an image for your picture.
                                    </FormText>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={{ size:6, offset: 2}}>
                                    <Button className={"PasswordButton"} size={"lg"} onClick={this.toggle}>Reset Password</Button>
                                    <Modal size={"lg"} isOpen={this.state.modal} toggle={this.toggle}>
                                        <ModalHeader toggle={this.toggle}>Password Reset</ModalHeader>
                                        <ModalBody className={"ModalFonts"}>
                                            Are you sure you want to reset your password? (An email will be sent to your account)
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button size={"lg"} color="info" onClick={(this.resetPass)}>Send Reset Email</Button>
                                            <Button size={"lg"} color="secondary" onClick={this.toggle}>Close</Button>
                                        </ModalFooter>
                                    </Modal>
                                </Col>
                            </FormGroup>
                            <FormGroup check row>
                                <Col sm={{ size: 8, offset: 7 }}>
                                    <Button color={"info"} size={"lg"}>Update Information</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );

    }

}
export default SetPersonal