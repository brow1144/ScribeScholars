import React, { Component } from 'react';

import {Container, Row, Col, Input, Label, Form, FormGroup, Button} from 'reactstrap';


class StudentScore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: this.props.game,
    }
  };

  render() {
      return(
        <div>
          <br/>
          <h1 style={{textAlign: 'center'}}> Score Page Comp</h1>
        </div>
      );

  }
}
export default StudentScore