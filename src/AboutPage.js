import React, { Component } from 'react';

import AboutBar from './AboutBar';

import logo from './logo.svg';
import top from './wood.jpeg';
import './AboutPage.css';

class AboutPage extends Component {
    render() {
        return (
            <div>
                <div className={"container"}>
                    <div className={"intro"}>
                        <img className="topPic" src={top}/>
                    </div>
                    <div className={"about"}>
                        <img className="logo" src={logo}/>
                        <h1>About</h1>
                    </div>
                    <div className="nav">
                        <AboutBar/>
                    </div>
                </div>
            </div>
        )
    }
};

export default AboutPage