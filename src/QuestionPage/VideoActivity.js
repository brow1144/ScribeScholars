import React, { Component } from 'react';
import ReactPlayer from 'react-player'

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
                    controls
                />
            </div>
        );
    }
}

export default VideoActivity