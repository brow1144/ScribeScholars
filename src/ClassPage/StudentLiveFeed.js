import React, { Component } from 'react';

class StudentLiveFeed extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    return (
      <div>
        <p>{this.props.class}</p>
        <p>{this.props.lessonNumber}</p>
        <p>{this.props.uid}</p>
      </div>
    );
  }
}

export default StudentLiveFeed;
