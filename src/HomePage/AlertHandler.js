import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class AlertHandler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    }
  }

  onDismiss = () => {
    this.setState({
      visible: false,
    });
  };

  render() {

    return (
      <Alert color="primary" hidden={!this.props.showAlerts}
             isOpen={this.state.visible} toggle={this.onDismiss}>
        {this.props.text}
      </Alert>
    )
  }
}

export default AlertHandler