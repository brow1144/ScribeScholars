import React from 'react'

import {NavLink, Card, CardText,CardTitle, Row, Col } from 'reactstrap';

const InClassCards = (props) => {

    return (
        <div>
            {Object.keys(props.inclass).map((key, index) => {
                return<Row key={key} className={"assPad"}>
                    <Col>
                        <NavLink href="#">
                            <Card body key={key} className="text-center">
                                <CardTitle className={"assTitle"}>
                                    {props.inclass[index].name}
                                </CardTitle>
                                <CardText className={"assText"}>Max Score: {props.inclass[index].max}</CardText>
                            </Card>
                        </NavLink>
                    </Col>
                </Row>
            })}
        </div>
    )
};

export default InClassCards