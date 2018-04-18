import React from 'react'
import {Row, Col, Button } from 'reactstrap';

import './AssignStyle.css'

// Old RouterLink format for reference
//<RouterLink to={"/ScribeScholars/HomePage/"+props.code+"/myStudents/"+props.homeworks[index].colRef+"/"+props.homeworks[index].id}>

const HomeCards = (props) => {
    return (
        <Row>
            {Object.keys(props.homeworks).map((key, index) => {
                return <Col xs={12} key={key} className={"assPad"}>
                        <Button size="lg" onClick={() => props.goToAssignment(props.homeworks[index])}
                                className={"assButt"} key={key} block>
                            <h1 className={"assTitle"}>
                                {props.homeworks[index].name}
                            </h1>
                            <h2 className={"assText"}>Max Score: {props.homeworks[index].maxScore}</h2>
                        </Button>
                </Col>
            })}
        </Row>
    )
};

export default HomeCards