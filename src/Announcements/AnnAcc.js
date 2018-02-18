import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';

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
                <Card>
                    <CardBody>
                        <CardTitle>Chapter 3 due tomorrow</CardTitle>
                        <CardSubtitle>Homework</CardSubtitle>
                        <CardText>Don't forget that chapter 3 is due by tomorrow morning!</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default AnnAcc;