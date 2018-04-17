import React from 'react'


import {Row, Col, Button } from 'reactstrap';
import { NavLink as RouterLink } from 'react-router-dom';

import './AssignStyle.css'

const HomeCards = (props) => {

    return (
        <Row>
            {Object.keys(props.homeworks).map((key, index) => {
                return <Col xs={12} key={key} className={"assPad"}>
                    <RouterLink to={"/ScribeScholars/HomePage/"+props.code+"/myStudents/"+props.homeworks[index].colRef+"/"+props.homeworks[index].id}>
                        <Button size="lg" className={"assButt"} key={key} block>
                            <h1 className={"assTitle"}>
                                {props.homeworks[index].name}
                            </h1>
                            <h2 className={"assText"}>Max Score: {props.homeworks[index].max}</h2>
                        </Button>
                    </RouterLink>
                </Col>
            })}
        </Row>
    )
};

export default HomeCards