import React, { Component } from 'react';

import { Col, FormGroup, Input } from 'reactstrap';


class FRQ extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    if(this.props.finalPage === false) {
      return (
        <Col sm={{size: 10, offset: 1}}>
          <FormGroup tag={"fieldset"}>
            <legend className={"RadioTitle"}>{this.props.name}: Question {this.props.currentQuestion}</legend>
            <legend className={"RadioTitle"}>{this.props.prompt}</legend>
            <Col sm={{size: 10, offset: 1}}>
              <Input onChange={(ev) => this.props.setFRQ(ev.target.value)} value={this.props.frqResponse}
                     style={{height: '20rem'}} type="textarea"
                     name="here" id="exampleText"/>

            </Col>
          </FormGroup>
        </Col>


      );
    }
    else {
      return (
        <Col sm={{size: 10, offset: 1}}>
          <h3>End of the assignment</h3>
        </Col>
      )
    }
  }
}

export default FRQ