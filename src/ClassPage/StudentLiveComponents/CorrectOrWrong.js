import React, {Component} from 'react';

class StudentTable extends Component {

  render() {

    if (this.props.ans === '0') {
      return (
        <td style={{color: "#F45531"}}>
          Incorrect
        </td>
      );
    } else if (this.props.ans === '1') {
      return (
        <td style={{color: "#21CE99"}}>
          Correct
        </td>
      );
    } else if (this.props.ans === '2') {
      return (
        <td style={{color: "#4753ff"}}>
          Not Started
        </td>
      );
    }
  }
}

export default StudentTable;
