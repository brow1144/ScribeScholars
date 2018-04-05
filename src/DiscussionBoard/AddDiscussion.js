import React, { Component } from 'react';

import { Row, Col, InputGroup, Form, InputGroupAddon, Input, Button, Alert} from 'reactstrap';

import '../DiscussionBoard/AddDiscussion.css';

class AddDiscussion extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      errorMessage: "",
    };
  }

  addQuestion = (ev) => {
    ev.preventDefault();
    let title = ev.target.title.value;
    let hashtag = ev.target.hashtag.value;
    let body = ev.target.body.value;

    if (title === '' && hashtag !== '' && body !== '') {
      this.setState({errorMessage: 'You forgot to enter a title!'});
      this.setState({ visible: true });
    } else if (title !== '' && hashtag === '' && body !== '') {
      this.setState({errorMessage: 'You forgot to enter a topic!'});
      this.setState({ visible: true });
    } else if (title !== '' && hashtag !== '' && body === '') {
      this.setState({errorMessage: 'You forgot to enter a message body!'});
      this.setState({ visible: true });
    } else if (title === '' || hashtag === '' || body === '') {
      this.setState({errorMessage: 'You forgot to enter multiple form fields!'});
      this.setState({ visible: true });
    } else
      this.setState({visible: false})

  };

  onDismiss = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <Row>
        <Col xs='0' md='2'/>
        <Col className='newQuestion' xs='12' md='8'>

          <br/>
          <h2 className='createDiscussion'>Create Discussion</h2>
          <hr/>

          <Row className='questionBox'>
            <Col xs='4' md='1'>
              <img className="userImage"
                   src='https://yt3.ggpht.com/a-/AJLlDp2XDF1qkCbGAr7HiDi6ywCWp3JfwN3vgN6ksA=s900-mo-c-c0xffffffff-rj-k-no'
                   alt="userIcon"/>
            </Col>
            <Col xs='8' md='5'>
              <h3 className='questionText'>
                Please enter a short discussion title
              </h3>
              <p className="searchSubTitle">
                by Kyle Brown
              </p>
            </Col>
            <Col xs='0' md='1'/>
            <Col xs='11' md='3'>
              <h4 className='hashtag'>
                # Please enter a one word topic
              </h4>
            </Col>
            <Col xs='10' md='1'>
              <Row>
                <p className='response'>
                  Teacher:
                </p>
                {this.props.discussion.teacherAns === ''
                ?
                  <i className="fas fa-check check"/>
                  :
                  <i className="fas fa-times times"/>
                }
              </Row>
              <Row>
                <p className='response'>
                  Student:
                </p>
                {this.props.discussion.studentAns === ''
                ?
                  <i className="fas fa-check check"/>
                  :
                  <i className="fas fa-times times"/>
                }
              </Row>
            </Col>
            <Col xs='11' md='1'>
              <h4 className='replyNum'>0</h4>
              <p className='replies'>Views</p>
            </Col>
          </Row>

          <hr/>

          <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
            {this.state.errorMessage}
          </Alert>

          <Form onSubmit={this.addQuestion}>
            <Row>
              <Col xs='8'>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Title</InputGroupAddon>
                  <Input name='title' placeholder="Please enter a short discussion title" />
                </InputGroup>
              </Col>
              <Col xs='4'>
              <InputGroup>
                <InputGroupAddon addonType="prepend">#</InputGroupAddon>
                <Input name='hashtag' placeholder="Please enter a one word topic" />
              </InputGroup>
              </Col>
            </Row>
            <br/>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Question</InputGroupAddon>
              <Input className='textArea' type="textarea" name="body" id="exampleText" />
            </InputGroup>

            <br/>

            <Button outline color='success'>Submit Discussion</Button>

          </Form>
          <br/>
        </Col>
        <Col xs='12' md='2'/>
      </Row>
    );
  }
}


export default AddDiscussion;