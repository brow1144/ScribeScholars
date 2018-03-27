import React, {Component} from 'react';

import {Col, Table} from 'reactstrap';

import CorrectOrWrong from './CorrectOrWrong';

class StudentTable extends Component {

  render() {

    return (
      <Col sm="12" md="4">
        <Table hover>
          <thead>
          <tr>
            <th>#</th>
            <th>Prompt</th>
            <th>Correct / Incorrect</th>
          </tr>
          </thead>

          {this.props.answerMap ?
            this.props.answerMap.map((key, index) => {
              return (
                <tbody key={index}>
                <tr>
                  <th scope="row">{index+1}</th>
                  <td>{`${this.props.promptArr[index]}`}</td>
                  <CorrectOrWrong ans={this.props.answerMap[index]} />
                </tr>
                </tbody>
              );
            })
            : null
          }


        </Table>
      </Col>
    );
  }
}

export default StudentTable;
