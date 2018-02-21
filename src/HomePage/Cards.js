import React from 'react'

import {Card, CardTitle, CardText, CardDeck, CardSubtitle, CardBody, Row, Col } from 'reactstrap';

const Cards = (props) => {

  return (
    <div>
      <Row>
        <Col sm={{ size: 'auto', offset: 1 }}>
          <CardDeck>
            {Object.keys(props.announcements).map((key, index) => {
              return <Card key={key}>
                        <CardBody>
                          <CardTitle>{props.announcements[index].title}</CardTitle>
                          <CardSubtitle>{props.announcements[index].subtitle}</CardSubtitle>
                          <CardText>{props.announcements[index].message}</CardText>
                        </CardBody>
                      </Card>
            })}
          </CardDeck>
        </Col>
      </Row>

    </div>
  )
};

export default Cards
