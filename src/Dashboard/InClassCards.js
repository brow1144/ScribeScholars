import React from 'react'
import {Button, Row, Col } from 'reactstrap';

import './AssignStyle.css'

const InClassCards = (props) => {

    return (
        <Row>
            {Object.keys(props.inclass).map((key, index) => {
                return<Col xs={12} key={key} className={"assPad"}>
                    <Button size="lg" onClick={() => props.goToAssignment(props.inclass[index])}
                            className={"assButt"} key={key} block>
                        <h1 className={"assTitle"}>
                            {props.inclass[index].name}
                        </h1>
                        <h2 className={"assText"}>Max Score: {props.inclass[index].maxScore}</h2>
                    </Button>
                </Col>
            })}
        </Row>
    )
};

export default InClassCards