import React from 'react'

import {NavLink, Button, Row, Col } from 'reactstrap';

import './AssignStyle.css'

const QuizCards = (props) => {

    return (
        <Row>
            {Object.keys(props.quizzes).map((key, index) => {
                return<Col xs={12} key={key} className={"assPad"}>
                    <NavLink style={{ textDecoration: 'none' }} to="/#">
                        <Button size="lg" className={"assButt"} key={key} block>
                            <h1 className={"assTitle"}>
                                {props.quizzes[index].name}
                            </h1>
                            <h2 className={"assText"}>Max Score: {props.quizzes[index].max}</h2>
                        </Button>
                    </NavLink>
                </Col>
            })}
        </Row>
    )
};

export default QuizCards