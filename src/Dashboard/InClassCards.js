import React from 'react'


import {Button, Row, Col } from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom';

import './AssignStyle.css'

const InClassCards = (props) => {

    return (
        <Row>
            {Object.keys(props.inclass).map((key, index) => {
                return<Col xs={12} key={key} className={"assPad"}>
                    <RouterLink to={"/ScribeScholars/HomePage/"+props.code+"/myStudents/"+props.inclass[index].colRef+"/"+props.inclass[index].id}>
                        <Button size="lg" className={"assButt"} key={key} block>
                            <h1 className={"assTitle"}>
                                {props.inclass[index].name}
                            </h1>
                            <h2 className={"assText"}>Max Score: {props.inclass[index].maxScore}</h2>
                        </Button>
                    </RouterLink>
                </Col>
            })}
        </Row>
    )
};

export default InClassCards