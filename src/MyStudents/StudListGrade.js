import React from 'react'
import {FormGroup, Input, Row, Col} from 'reactstrap';
const StudListGrade = (props) => {

    return (
        <tbody>
        {Object.keys(props.students).map((key, index) => {
            return (
                <tr key={key}>
                    <th scope="row">{index + 1}</th>
                    <td>{props.students[index].name}</td>
                    <td>{props.students[index].email}</td>
                    <td>
                        <FormGroup>
                            <Row>
                                <Col xs={4}/>
                                <Col xs={4}>
                                    <Input name="text" id="exampleText"/>
                                </Col>
                                <Col xs={4}>

                                </Col>
                            </Row>
                        </FormGroup>
                    </td>
                </tr>
            )
        })
        }
        </tbody>
    )
};

export default StudListGrade