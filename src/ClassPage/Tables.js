import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import {Table, Container, Card, CardHeader, CardTitle, CardText, CardSubtitle, CardBody, Row, Col } from 'reactstrap';

const Tables = (props) => {

    return (
        <div>
            {Object.keys(props.assignment).map((key, index) => {
                return
                    <div key={key}>
                        <tr>
                            <th scope="row">{props.assignment[index]}</th>
                            <td>{props.assignment[index].name}</td>
                            <td>yes</td>
                            <td>
                                <RouterLink to={`practiceQuestion`}>
                                    Link
                                </RouterLink>
                            </td>
                        </tr>
                    </div>
                })
            }

        </div>
    )
};

export default Tables