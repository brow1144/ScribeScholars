import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import {firestore} from "../base";

class AlertHandler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hiddenAlerts: props.hiddenAlerts,
      visible: true,
    }
  }

  onDismiss = () => {
    this.setState({
      visible: false,
    });

    // add alert to list of hidden alerts
    let tmpHiddenAlerts = [];
    if (this.state.hiddenAlerts != null)
      tmpHiddenAlerts = this.state.hiddenAlerts.concat(this.props.alert.name);
    else
      tmpHiddenAlerts = [].concat(this.props.alert.name);

    let studentRef = firestore.collection("users").doc(this.props.uid);

    studentRef.set({
      hiddenAlerts: tmpHiddenAlerts,
    }, {merge: true}
    ).catch((error) => {
      console.log("Error getting document:", error);
    });
  };

  render() {
    return (
      <Alert color="primary" hidden={!this.props.showAlerts}
             isOpen={this.state.visible} toggle={this.onDismiss}>
        {this.props.alert.name + this.props.alert.text}
      </Alert>
    )
  }
}

export default AlertHandler