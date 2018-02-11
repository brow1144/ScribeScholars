import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

import classnames from 'classnames';
import './AboutBar.css';
import picB from './students2.jpg';

class AboutBar extends React.Component {

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
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col className={"col"}>
                                <h3 className={"title"}>Student</h3>
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
                </TabContent>
            </div>
        );
    }
}


export default AboutBar