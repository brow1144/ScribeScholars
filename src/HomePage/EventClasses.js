import React from 'react'
import {FormGroup,Label, Input } from 'reactstrap';

const EventClasses = (props) => {
    console.log(props.classes);
    if (props.classes !== undefined && props.classes !== null && props.classes.length !== 0) {
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
        return (
            <Input type="select" name="select">
                <option>Do Not Add To Class</option>
            </Input>
        )
    }
};

export default EventClasses