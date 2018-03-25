import React, { Component } from 'react';

import {Form, FormGroup, Col, Input, Label, Button} from 'reactstrap';

class VideoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return(
            <Form onSubmit={this.onFormSubmit} style={{paddingLeft: '1rem'}}>
                <br/>
                <FormGroup row>
                    <Label size="lg" for="exampleNumber" sm={2}>Question Prompt:</Label>

                    <Col sm={6}>
                        <Input bsSize="lg" type="username" name="promptQ" id="exampleNumber"/>
                    </Col>
                </FormGroup>
                <br/>
                <FormGroup check>
                    <Col sm={{size: 10}}>
                        <Button color={"secondary"} size={"lg"} block>Save Question</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default VideoForm