import React from 'react'


import {Button, Row, Col } from 'reactstrap';

import { NavLink as RouterLink } from 'react-router-dom';


import './AssignStyle.css'

const QuizCards = (props) => {

    return (
        <Row>
            {Object.keys(props.quizzes).map((key, index) => {
                return<Col xs={12} key={key} className={"assPad"}>
                    <RouterLink to={"/ScribeScholars/HomePage/"+props.code+"/myStudents/"+props.quizzes[index].colRef+"/"+props.quizzes[index].id}>
                        <Button size="lg" className={"assButt"} key={key} block>
                            <h1 className={"assTitle"}>
                                {props.quizzes[index].name}
                            </h1>
                            <h2 className={"assText"}>Max Score: {props.quizzes[index].max}</h2>
                        </Button>
                    </RouterLink>
                </Col>
            })}
        </Row>
    )
};

export default QuizCards