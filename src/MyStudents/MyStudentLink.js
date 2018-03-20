import React, {Component} from 'react';
import {Button, Container, Row, Col, Card, CardTitle, CardText, Table, NavLink} from 'reactstrap';


class MyStudentLink extends Component {
    constructor(props) {
        super(props);

        this.state = {
            announcements: [{
                title: null,
                subtitle: null,
                message: null,
                class: null,
            }],

            announcementsActive: true,
            lessonsActive: false,
            homeworkActive: false,
            discussionActive: false,
            myStudentsActive: false
        };

    }


    render() {
        return (
            <div>
                <Container>
                    <Button color="success">
                        MyStudents
                    </Button>
                </Container>
            </div>

        )
    }
} export default MyStudentLink