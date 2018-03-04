import React, { Component } from 'react';

import { Button, Container, Row, Col, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalFooter, ModalBody} from 'reactstrap';

import { firestore , storageRef } from "../base";
import firebase from '../base.js';

import 'video-react/dist/video-react.css';
import ReactPlayer from 'react-player'
import { Player } from 'video-react';

class VideoActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return(
            <div className='player-wrapper'>
                <ReactPlayer
                    url='https://www.youtube.com/watch?v=VAB8ShsX1U4'
                    className='react-player'
                    width='100%'
                    height='100%'
                />
            </div>
        );
    }
}

export default VideoActivity