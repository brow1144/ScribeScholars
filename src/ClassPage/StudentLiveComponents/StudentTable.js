import React, { Component } from 'react';

import { Col, Table } from 'reactstrap';

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

          <tbody>
          <tr>
            <th scope="row">1</th>
            <td>First Question</td>
            <td><i style={{color: '#F45531'}} className="fas fa-times"/></td>
          </tr>
          </tbody>
          <tbody>
          <tr>
            <th scope="row">1</th>
            <td>First Question</td>
            <td><i style={{color: '#21CE99'}} className="fas fa-check" /></td>
          </tr>
          </tbody>
          <tbody>
          <tr>
            <th scope="row">1</th>
            <td>First Question</td>
            <td><i style={{color: '#21CE99'}} className="fas fa-check"/></td>
          </tr>
          </tbody><tbody>
        <tr>
          <th scope="row">1</th>
          <td>First Question</td>
          <td><i style={{color: '#21CE99'}} className="fas fa-check"/></td>
        </tr>
        </tbody>


        </Table>
      </Col>
    );
  }
}

export default StudentTable;
