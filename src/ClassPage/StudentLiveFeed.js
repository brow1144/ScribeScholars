import React, { Component } from 'react';

import { Row } from 'reactstrap';

import LineBreak from './LiveComponents/LineBreak';
import StudentStats from './StudentLiveComponents/StudentStats';
import StudentGraph from './StudentLiveComponents/StudentGraph';
import StudentTable from './StudentLiveComponents/StudentTable';

class StudentLiveFeed extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    return (
      <div>
        <hr />
        <br />

        <StudentStats />

        <LineBreak />

        <Row>
          <StudentGraph />
          <StudentTable />
        </Row>

      </div>
    );
  }
}

export default StudentLiveFeed;
