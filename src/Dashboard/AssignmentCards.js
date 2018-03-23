import React from 'react'

import {Card, CardHeader, CardTitle, CardText, CardSubtitle, CardBody, Row, Col } from 'reactstrap';

const AssignmentCards = (props) => {

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
                    </Col>
                })}
            </Row>
        </div>
    )
};

export default AssignmentCards