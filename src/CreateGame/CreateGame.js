import React, {Component} from 'react';
import {Container, Row, Col, Input, Label, Form, FormGroup, Button} from 'reactstrap';

import {firestore} from '../base';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import MCQForm from "./MCQGame";
import 'react-accessible-accordion/dist/react-accessible-accordion.css';
import '../CreateActivity/CreateActivity.css';

class CreateGame extends Component {

  constructor(props){
    super(props);
    this.onTitleChange = this.onTitleChange.bind(this);

    this.state = ({
      uid: props.uid,
      role: this.props.role,
      class: this.props.class,

      gameQuestions: [],
      totalPoints: 0,
      title: "",
      classStudents: [],
      submitted: false,
    });

    this.getClassStudents();
  }

  getClassStudents(){
    let self = this;
    let studentArray = [];
    let classRef = firestore.collection("classes").doc(self.props.class);
    classRef.get().then(function (doc){
      if(doc.exists){
        studentArray = doc.data().students;
        self.setState({
          classStudents: studentArray,
        });
      } else {
        console.log("Class doc does not exist");
      }
    }).catch(function (error){
      console.log(error);
    });
  };

  onTitleChange = (ev) => {
    this.setState({
      title: ev.target.value,
    });
  };

  publishGame = (ev) => {
    ev.preventDefault();
    //TODO have alert for if title is empty
    let self = this;
    let gameCode = CreateGame.getCode();
    let userScores = [];

    for(let k = 0; k < self.state.classStudents.length; k++){
      let userObj = {
        uid: self.state.classStudents[k],
        score: 0,
        prevCorrect: false,
      };
      userScores.push(userObj);
    }

    let pointArray = [];
    for(let i = 0; i < self.state.gameQuestions.length; i++){
      pointArray.push(0);
    }

    let gameData = {
      active: false,
      bonusStage: false,
      lobbyStage: false,
      mcStage: false,
      scoreStage: false,
      name: self.state.title,
      questIndex: 0,
      questScores: pointArray,
      questions: self.state.gameQuestions,
      userScores: userScores,
    };

    let gameRef = firestore.collection("classes").doc(self.props.class).collection("games").doc(gameCode);
    gameRef.get().then(function () {

      gameRef.set(gameData)
        .then(function() {
          self.setState({
            submitted: true,
          });
        }).catch(function(error){
        console.log(error);
      });
    }).catch(function (error) {
      console.log("Error getting document: ", error);
    });


  };

  addGameQuestion = (ev) => {
    ev.preventDefault();
    let self = this;
    let tempArr = this.state.gameQuestions;
    let tempQ = {
      correctAns: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      prompt: "",
      strAns: "",
    };
    tempArr.push(tempQ);

    self.setState({
      gameQuestions: tempArr,
    });
  };

  //Generate New Homework code
  static getCode = () => {
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += Math.floor(Math.random() * 10);
    }
    return code;
  };

  recordQuestion = (quest, index) => {
    let tempArr = this.state.gameQuestions;

    tempArr.splice(index, 1, quest);

    let tempTotalPoints = this.state.totalPoints + tempArr[index].points;

    this.setState({
      questions: tempArr,
      totalPoints: tempTotalPoints,
    });
  };

  render(){

    if(this.state.submitted){
      return (
        <Container fluid className={"ContainerRules"}>
          <hr style={{marginRight: '-20px', marginLeft: '-20px'}}/>
          <Row className={"Filler"}> </Row>

          <div>
            <h2 className='notBold'>
              Successfully Created "{this.state.title}"!
            </h2>
          </div>
        </Container>
      );
    }

    return (
      <Container fluid className={"ContainerRules"}>
        <hr style={{marginRight: '-20px', marginLeft: '-20px'}}/>
        <Row className={"Filler"}> </Row>

        <div>
          <Row>
            <Form style={{marginLeft: '2rem'}} onSubmit={this.addGameQuestion}>

              <Label size="lg" for="exampleNumber" sm={10} md={8}> Game Title:</Label>
              <FormGroup row>
                <Col sm={10} md={12}>
                  <Input bsSize="lg" type="username" name="title" id="exampleNumber" onChange={this.onTitleChange}/>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={2} md={10}>
                  <br/>
                  <Button color={"info"} size={"lg"}>Add Game Question</Button>
                </Col>
              </FormGroup>
            </Form>
          </Row>

          <br/>
          <br/>


          <Col xs={10} lg={8}>
            {
              this.state.gameQuestions.length !== 0
                ?
                <Accordion>
                  {this.state.gameQuestions.map((quest, index) => {
                    return (<AccordionItem key={index}>
                        <AccordionItemTitle><h3> Question {index + 1}:</h3>
                        </AccordionItemTitle>
                        <AccordionItemBody className={"accordBody"}>
                          <MCQForm question={quest} index={index}
                                   recordQuestion={this.recordQuestion}/>
                        </AccordionItemBody>
                      </AccordionItem>

                    )
                  })}
                </Accordion>
                :
                <div/>
            }
          </Col>


          <br/>
          <Col xs={{size: 4, offset: 3}} lg={{size: 4, offset: 3}}>
            <Button color={"secondary"} size={"lg"} onClick={this.publishGame} block>
              Publish Game
            </Button>
          </Col>
        </div>

        <Row className={"Filler"}> </Row>
        <Row className={"Filler"}> </Row>

      </Container>
    );

  }

}

export default CreateGame