import React, {Component} from 'react';

import { Alert, Col, FormGroup, Form, Button, Label, Input} from 'reactstrap';

import './FIBForm.css';

class FIBForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          visible: false,
          errorMessage: '',
        }

    }

    onFormSubmit = (ev) => {
        ev.preventDefault();
      if (ev.target.promptQ.value === '' || ev.target.points.value === '' || ev.target.blankAns.value === ''){
        this.setState({errorMessage: 'You didn\'t enter sufficient information!'});
        this.setState({ visible: true });
        return;
      }

        let quest = {
            type: "FIB",
            prompt: ev.target.promptQ.value,
            correctAns: ev.target.blankAns.value,
            points: parseInt(ev.target.points.value, 10),
        };

        this.props.recordQuestion(quest, this.props.index);
    };

  onDismiss = () => {
    this.setState({ visible: false });
  };

    render() {
        return (
            <Form onSubmit={this.onFormSubmit} style={{paddingLeft: '1rem'}}>
                <br/>
                <FormGroup row>
                    <Label size="lg" for="exampleNumber" sm={3}>Question Prompt:</Label>

                    <Col sm={6}>
                        <Input bsSize="lg" type="username" name="promptQ" id="exampleNumber"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label size="lg" for="exampleNumber" sm={3}>Correct Answer:</Label>

                    <Col sm={6}>
                        <Input bsSize="lg" type="username" name="blankAns" id="exampleNumber"/>
                    </Col>
                </FormGroup>
                <br/>
                <FormGroup row>
                  <Label size="lg" for="examplePoints" sm={3}>Points:</Label>

                  <Col sm={2}>
                    <Input bsSize="lg" type="number" name="points" id="examplePoints" defaultValue="1"/>
                  </Col>
                </FormGroup>
                <br/>
              <Col xs={{size: 6, offset: 3}} style={{paddingLeft: '0'}}>
                <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                  {this.state.errorMessage}
                </Alert>
              </Col>
                <FormGroup check style={{paddingLeft: '0'}}>
                    <Col sm={{size: 6, offset: 3}} style={{paddingLeft: '0'}}>
                        <Button color={"secondary"} size={"lg"} block>Save Question</Button>
                    </Col>
                </FormGroup>
            </Form>

        );
    }
}

export default FIBForm