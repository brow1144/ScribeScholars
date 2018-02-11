import React, { Component } from 'react';

import { Button, Container, Row, Col} from 'reactstrap';

import './SetPersonal.css';

class SetPersonal extends Component {

    render() {
        return (
           /* <div className={"test"}>
                <b> Walter's Settings Page</b>
            </div>*/
            <Container fluid>
                <Row className={"Filler"}> </Row>
                <Row className={"BannerRow"}>
                    <Col xs={"12"} sm={"12"} md={"12"} lg={"12"} xl={"12"} className={"BannerCol"}>
                        <h1>Walter Jacquette's Personal Settings:</h1>
                    </Col>
                </Row>
            </Container>
        );

    }

}
export default SetPersonal