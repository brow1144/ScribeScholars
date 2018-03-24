import React from 'react'

import {NavLink, Card,CardText, CardTitle, Row, Col } from 'reactstrap';

const HomeCards = (props) => {

    return (
        <div>
            {Object.keys(props.homeworks).map((key, index) => {
                return<Row key={key} className={"assPad"}>
                    <Col>
                        <NavLink href="#">
                            <Card body key={key} className="text-center">
                                <CardTitle className={"assTitle"}>
                                    {props.homeworks[index].name}
                                </CardTitle>
                                <CardText className={"assText"}>Max Score: {props.homeworks[index].max}</CardText>

                            </Card>
                        </NavLink>
                    </Col>
                </Row>
            })}
        </div>
    )
};

export default HomeCards