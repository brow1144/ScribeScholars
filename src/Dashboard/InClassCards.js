import React from 'react'

import {NavLink, Button, Row, Col } from 'reactstrap';

import './AssignStyle.css'

const InClassCards = (props) => {

    return (
        <Row>
            {Object.keys(props.inclass).map((key, index) => {
                return<Col xs={12} key={key} className={"assPad"}>
                    <NavLink style={{ textDecoration: 'none' }} to="/#">
                        <Button size="lg" className={"assButt"} key={key} block>
                            <h1 className={"assTitle"}>
                                {props.inclass[index].name}
                            </h1>
                            <h2 className={"assText"}>Max Score: {props.inclass[index].max}</h2>
                        </Button>
                    </NavLink>
                </Col>
            })}
        </Row>
    )
};

export default InClassCards