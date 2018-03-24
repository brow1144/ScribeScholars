import React, {Component} from 'react';

import {Progress} from 'reactstrap';
import {Redirect} from 'react-router'


class TableElement extends Component {

  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    }
  }


  studentLiveFeed = () => {
    this.setState({redirect: true});
  };

  render() {

    if (this.state.redirect) {
      return <Redirect push
                       to={`/HomePage/${this.props.class}/lessons/liveFeed/${this.props.lessonNumber}/${this.props.uid}`}/>;
    }

    const individualStudent = this.props.studentsData[this.props.index];

    return (
      <tbody style={{cursor: 'pointer'}} onClick={this.studentLiveFeed}>
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
