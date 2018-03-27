import React, { Component } from 'react';

import { Progress } from 'reactstrap';

class TableElement extends Component {

render() {

    const individualStudent = this.props.studentsData[this.props.index];

    return (
      <tbody>
        <tr>
          <th scope="row">{this.props.index + 1}</th>
          <td>{individualStudent.firstName} {individualStudent.lastName}</td>
          <td>{this.props.scoresMap[individualStudent.uid]}%</td>
          <td>
            <div className="text-center">{this.props.progressMap[individualStudent.uid]}%</div>
            <Progress animated color="success" value={this.props.progressMap[individualStudent.uid]}/>
          </td>
        </tr>
      </tbody>
    );
  }
}

export default TableElement;
