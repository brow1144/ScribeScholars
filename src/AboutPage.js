import React, { Component } from 'react';

import AboutBar from './AboutBar'

import img from './classroom.png'
import './AboutPage.css'

class AboutPage extends Component {
    render() {
        return (
            <div>
                <div className={"container"}>
                    <div className="nav">
                        <AboutBar/>
                    </div>
                </div>
            </div>
        )
    }
};

export default AboutPage