import React from 'react'
import {FormGroup,Label, Input } from 'reactstrap';

const EventClasses = (props) => {
    if (props.classes !== null) {
        return (
            <Input type="select" name="select">
                <option>Do Not Add To Class</option>
                {Object.keys(props.classes).map((key, index) => {
                    let thisCode = props.classes[index].code;
                    return <option key={key}>{props.classes[index].class} : {thisCode}</option>
                })}
            </Input>
        )
    } else {
        return
    }
};

export default EventClasses