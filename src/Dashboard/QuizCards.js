import React from 'react'

import {NavLink, Card, CardTitle, CardText, Row, Col } from 'reactstrap';

const QuizCards = (props) => {

    return (
        <div>
            {Object.keys(props.quizzes).map((key, index) => {
                return<Row key={key} className={"assPad"}>
                    <Col>
                        <NavLink href="#">
                            <Card body key={key} className="text-center">
                                <CardTitle className={"assTitle"}>
                                    {props.quizzes[index].name}
                                </CardTitle>
                                <CardText className={"assText"}>Max Score: {props.quizzes[index].max}</CardText>
                            </Card>
                        </NavLink>
                    </Col>
                </Row>
            })}
        </div>
    )
};

export default QuizCards