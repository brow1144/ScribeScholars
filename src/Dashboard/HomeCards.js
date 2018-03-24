import React from 'react'

import {NavLink, Card,CardText, CardTitle, Row, Col, Button } from 'reactstrap';

import './AssignStyle.css'

const HomeCards = (props) => {

    return (
        <Row>
            {Object.keys(props.homeworks).map((key, index) => {
                return <Col xs={12} key={key} className={"assPad"}>
                    <NavLink style={{textDecoration: 'none'}} to="/#">
                        <Button size="lg" className={"assButt"} key={key} block>
                            <h1 className={"assTitle"}>
                                {props.homeworks[index].name}
                            </h1>
                            <h2 className={"assText"}>Max Score: {props.homeworks[index].max}</h2>
                        </Button>
                    </NavLink>
                </Col>
            })}
        </Row>
    )
};

export default HomeCards