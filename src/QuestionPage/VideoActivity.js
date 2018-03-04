import React, { Component } from 'react';

import { Button, Container, Row, Col, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalFooter, ModalBody} from 'reactstrap';

import { firestore , storageRef } from "../base";
import firebase from '../base.js';

import 'video-react/dist/video-react.css';
import { Player } from 'video-react';

class VideoActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return(
            <div>
                <Player
                    playsInline
                    poster="/assets/poster.png"
                    src="https://www.youtube.com/watch?v=VAB8ShsX1U4"
                />
            </div>
        );
    }
}

export default VideoActivity