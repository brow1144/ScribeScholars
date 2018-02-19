import React, { Component } from 'react';
import {Card, CardTitle, CardText, CardDeck, CardSubtitle, CardBody } from 'reactstrap';

class AnnAcc extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        return (
            <div>
                <CardDeck>
                    <Card>
                        <CardBody>
                            <CardTitle>Chapter 3 due tomorrow</CardTitle>
                            <CardSubtitle>Homework</CardSubtitle>
                            <CardText>Don't forget that chapter 3 is due by tomorrow morning!</CardText>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <CardTitle>Chapter 2 due tomorrow</CardTitle>
                            <CardSubtitle>Homework</CardSubtitle>
                            <CardText>Don't forget that chapter 2 is due by tomorrow morning!</CardText>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <CardTitle>Chapter 1 due tomorrow</CardTitle>
                            <CardSubtitle>Homework</CardSubtitle>
                            <CardText>Don't forget that chapter 1 is due by tomorrow morning!</CardText>
                        </CardBody>
                    </Card>
                </CardDeck>
            </div>
        );
    }
}

export default AnnAcc;