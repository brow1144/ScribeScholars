import React from 'react'

import {NavLink, Card, CardTitle, Row, Col } from 'reactstrap';

const AssignmentCards = (props) => {

    return (
        <div>
                {Object.keys(props.homeworks).map((key, index) => {
                    return <Col sm={4} key={key}>
                        <Row className={"assPad"}>
                            <Col>
                                <NavLink href="#">
                                    <Card body key={key} className="text-center">
                                        <CardTitle className={"assTitle"}>
                                            {props.homeworks[index].name}
                                        </CardTitle>
                                    </Card>
                                </NavLink>
                            </Col>
                        </Row>
                        <br/>
                    </Col>
                })}
        </div>
    )
};

export default AssignmentCards