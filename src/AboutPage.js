import React, { Component } from 'react';

import AboutBar from './AboutBar'

import img from './classroom.png'
import './AboutPage.css'

class AboutPage extends Component {
    render() {
        return (
            <div>
                <div className={"container"}>
                    <div className="nav"> /*This is the top of the page*/
                        <AboutBar/>
                    </div>
                    <div className={"picture"}>
                        <img src={img}/>
                    </div>
                    <div className={"rect"}>Text here</div>
                    <div className={"picture"}>
                        <img src={img}/>
                    </div>
                </div>
            </div>
        )
    }
};

export default AboutPage