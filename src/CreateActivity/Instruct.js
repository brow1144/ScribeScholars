import React, { Component } from 'react';

import { Container, Row, Col, FormGroup, Label, Input} from 'reactstrap';


import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import './Instruct.css';

class Instruct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "",
            question: this.props.question,
        }

    }


    render() {
        return(
            <Container fluid>
                <Row>
                    <Col xs={7} style={{borderStyle: 'solid', marginRight: '2rem'}}>
                        <p>Hey there bud</p>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <Card>
                            <CardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
                            <CardBody>
                                <CardTitle>Card title</CardTitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button href="#">Button</Button>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs={4} style={{backgroundColor: 'red'}}>
                        <p>Hey there bud</p>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </Col>
                </Row>

            </Container>

        );
    }
}

export default Instruct