import React, {Component} from 'react';

import {Container, Row, Col, Input, Label, Form, FormGroup, Button} from 'reactstrap';

import '../CreateActivity/CreateActivity.css';

class CreateGame extends Component {

  constructor(props){
    super(props);

    this.setState({
      uid: props.uid,
      role: this.props.role,
      class: this.props.class,
    });
  }

  render(){

    return (
      <Container fluid className={"ContainerRules"}>
        <hr style={{marginRight: '-20px', marginLeft: '-20px'}}/>
        <Row className={"Filler"}> </Row>

        <div>
          <Row>
            <Form style={{marginLeft: '2rem'}} onSubmit={this.onFormSubmit}>

              <Label size="lg" for="exampleNumber" sm={10} md={8}> Game Title:</Label>
              <FormGroup row>
                <Col sm={10} md={12}>
                  <Input bsSize="lg" type="username" name="title" id="exampleNumber"/>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={2} md={10}>
                  <br/>
                  <Button color={"info"} size={"lg"}>Add Question</Button>
                </Col>
              </FormGroup>
            </Form>
          </Row>

          <br/>
          <br/>


          <Col xs={10} lg={8}>

          </Col>


          <br/>
          <Col xs={{size: 4, offset: 3}} lg={{size: 4, offset: 3}}>
            <Button color={"secondary"} size={"lg"} block onClick={this.publishAss}>Publish</Button>
          </Col>
        </div>

        <Row className={"Filler"}> </Row>
        <Row className={"Filler"}> </Row>

    </Container>
  );

  }

}

export default CreateGame