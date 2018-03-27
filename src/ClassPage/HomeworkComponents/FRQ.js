import React, { Component } from 'react';

import { Col, FormGroup, Label, Input } from 'reactstrap';


class FRQ extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <Col sm={{size: 10, offset: 1}}>
        <FormGroup tag={"fieldset"}>
          <legend className={"RadioTitle"}>{this.props.name}: Question {this.props.currentQuestion}</legend>
          <legend className={"RadioTitle"}>{this.props.prompt}</legend>
          <Col sm={{size: 10, offset: 1}}>
            <Input onChange={(ev) => this.props.setFRQ(ev.target.value)} value={this.props.frqResponse} style={{height: '20rem'}} type="textarea"
                   name="here" id="exampleText"/>
          </Col>
        </FormGroup>
      </Col>


    );
  }
}

export default FRQ