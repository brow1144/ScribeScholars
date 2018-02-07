import React, { Component } from 'react';

import Sidebar from 'react-sidebar';

import SidebarTabs from './SidebarTabs';

import './HomePage.css';

const mql = window.matchMedia(`(min-width: 800px)`);

class HomePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mql: mql,
      docked: props.docked,
      open: props.open
    };

  }

  onSetSidebarOpen = (open) => {
    this.setState({sidebarOpen: open});
  };

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, sidebarDocked: mql.matches});
  };

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  };

  mediaQueryChanged = () => {
    this.setState({sidebarDocked: this.state.mql.matches});
  };

  render() {

    let sidebarContent = <SidebarTabs />;

    // var sidebarProps = {
    //   sidebar: this.state.sidebarOpen,
    //   docked: this.state.sidebarDocked,
    //   onSetOpen: this.onSetSidebarOpen
    // };

    const sidebarStyles = {
      sidebar: {
        backgroundColor: 'f3f3f3',
        width: '8em',
        textAlign: 'center',
      }
    };

    return (
      <Sidebar styles={sidebarStyles}
               sidebar={sidebarContent}
               open={this.state.sidebarOpen}
               docked={this.state.sidebarDocked}
               onSetOpen={this.onSetSidebarOpen}>
        <p>Main Section</p>
      </Sidebar>
    );
  }
}

export default HomePage;
