import React, {Component} from 'react'

import '../MyStudents/StudListGrade.css'

class StudList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expandedRows: [],
    };
  }

  handleRowClick = (uid) => {
    let newExpandedRows = [];

    if (this.state.expandedRows.includes(uid))
      newExpandedRows = this.state.expandedRows.filter((id) => id !== uid);
    else
      newExpandedRows = this.state.expandedRows.concat(uid);

    this.setState({
      expandedRows: newExpandedRows,
    });
  };

  renderItem = (student, index) => {
    let itemRows = [
      <tr key={index} className="curveLabel">
        <th scope="row">{parseInt(index) + 1}</th>
        <td>{student.grade}</td>
        <td onClick={() => this.handleRowClick(student.uid)} className="nameCell">{student.name}</td>
        <td>{student.email}</td>
        <td>
          <span onClick={() => this.props.showGraph(student.uid)}>
            <i className="fas fa-chart-bar graphIcon"/>
          </span>
        </td>
      </tr>
    ];

    if (this.state.expandedRows.includes(student.uid)) {
      itemRows.push(
        <tr key={"expanded-head-" + student.uid}>
          <th/>
          <th>Assignment</th>
          <th>Score</th>
          <th>Points Possible</th>
          <th/>
        </tr>
      );

      for (let i in this.props.assignments) {
        if (this.props.assignments.hasOwnProperty(i)) {
          if (this.props.assignments[i].uid === student.uid) {
            itemRows.push(
              <tr key={"expanded-" + i + "-" + student.uid} className="subRow">
                <td/>
                <td>{this.props.assignments[i].data.name}</td>
                <td>{this.props.assignments[i].data.score}</td>
                <td>{this.props.assignments[i].data.maxScore}</td>
                <td/>
              </tr>
            );
          }
        }
      }
    }

    return itemRows;
  };

  render() {
    let allItemRows = [];

    for (let i in this.props.students) {
      if (this.props.students.hasOwnProperty(i)) {
        let studentRow = this.renderItem(this.props.students[i], i);
        allItemRows = allItemRows.concat(studentRow);
      }
    }

    return (
      <tbody>
        {allItemRows}
      </tbody>
    )
  };
}

export default StudList