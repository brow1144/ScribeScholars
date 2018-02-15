import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

import classnames from 'classnames';
import './AboutBar.css';
import picPar from './parentChild.jpg';
import logo from './logo.svg';

class AboutBar extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        return (
            <div className={"container"}>
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}><h2>Students</h2></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}><h2>Teachers</h2></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }}><h2>Administrators</h2></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '4' })} onClick={() => { this.toggle('4'); }}><h2>Parents</h2></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '5' })} onClick={() => { this.toggle('5'); }}><h2>Contact Us</h2></NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col className={"col"}>
                                <h3 className={"title"}>Students</h3>
                                <p>Kennedy's time in office was marked by high tensions with communist states in the Cold War. He increased the number of American military advisers
                                    in South Vietnam by a factor of 18 over President Dwight D. Eisenhower. In April 1961, he authorized a failed joint-CIA attempt to overthrow the
                                    Cuban government of Fidel Castro in the Bay of Pigs Invasion.[2] He subsequently rejected Operation Northwoods plans by the Joint Chiefs of Staff
                                    to orchestrate false flag attacks on American soil in order to gain public approval for a war against Cuba. In October 1962, U.S. spy planes discovered
                                    that Soviet missile bases had been deployed in Cuba; the resulting period of tensions, termed the Cuban Missile Crisis, nearly resulted in the breakout
                                    of a global thermonuclear conflict. Domestically, Kennedy presided over the establishment of the Peace Corps and supported the African-American Civil Rights Movement,
                                    but he was largely unsuccessful in passing his New Frontier domestic policies. Kennedy continues to rank highly in historians' polls of U.S. presidents and with the general public.
                                    His average approval rating of 70% is the highest of any president in Gallup's history of systematically measuring job approval</p>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col className={"col"}>
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                            <Col className={"col"}>
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={"col"}>
                                <h1>Look at me</h1>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="4">
                        <Row>
                            <img className="picPar center" alt="logo" src={picPar}/>
                        </Row>
                        <Row>
                            <Col className={"col"}>
                                <h3 className={"title"}>Parents</h3>
                                <p>
                                    How we make your role as a parent an integrated part of our classrooms
                                    ScribeScholars is designed in order to create a simple and easy-to-use system for
                                    parents to monitor their child’s performance in the classroom from a safe distance.
                                    Once linked to your child’s account, a parent has the access to see everything that the child can see.<br />
                                <br />This includes the ability to see:<br /><br />
                                    <ul id="bgLogo">
                                        <li>All currently enrolled classes</li><br />
                                        <li>All assigned homeworks</li><br />
                                        <li>All curriculum posted by the teacher (Course Schedule, Syllabus, Book List, etc.)</li><br />
                                        <li>Students current grades</li><br />
                                        <li>Dynamically calculated GPA</li><br />
                                        <li>Current Rank in each class</li><br />
                                        <li>Any posts that your child has made or has been a part of on the class forum</li><br />
                                    </ul><br />
                                    Simply Navigate to your My Children tab and select the desired child to view all of the above options.
                                    </p>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="5">
                        <Row>
                            <img className="conLogo center" alt="logo" src={logo}/>
                        </Row>
                        <Row>
                            <Col className={"col"}>
                                <h3 className={"title"}>Contact Us</h3>
                                <p>
                                    For any questions you may have, bugs you’d like fixed, or features you’d like added, you can reach our team at:
                                    <p className="ssColor email">scribescholars@gmail.com</p>

                                </p>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}


export default AboutBar