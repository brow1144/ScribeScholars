import React from 'react'

import {NavLink,Card, CardHeader, CardTitle, CardText, CardSubtitle, CardBody, Row, Col } from 'reactstrap';

const StudList = (props) => {

    return (
        <div>
            <Row>
                {Object.keys(props.announcements).map((key, index) => {
                    return <Col sm={4} key={key}>
                        <Card key={key}>
                            <CardHeader>{props.announcements[index].class}</CardHeader>
                            <CardBody>
                                <CardTitle>{props.announcements[index].title}</CardTitle>
                                <CardSubtitle>{props.announcements[index].subtitle}</CardSubtitle>
                                <CardText>{props.announcements[index].message}</CardText>
                            </CardBody>
                        </Card>
                        <br />

                        <Row className={"assPad"}>
                            <Col>
                                <NavLink href="#">
                                    <Card body className="text-center">
                                        <CardTitle className={"assTitle"}>

                                            {props.announcements[index].name}

                                        </CardTitle>
                                    </Card>
                                </NavLink>
                            </Col>
                        </Row>
                        <br/>

                    </Col>



                })}
            </Row>
        </div>
    )
};

export default StudList