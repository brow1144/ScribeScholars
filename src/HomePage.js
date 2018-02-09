import React, { Component } from 'react';

import { Button } from 'reactstrap';

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
      open: props.open,
      sideButtonVisibility: !props.docked,
    };
  }

  dockSideBar = () => {
    if (this.state.sidebarDocked)
      this.setState({
        sidebarOpen: false,
        sideButtonVisibility: true,
      });
    else
      this.setState({
        sidebarOpen: true,
        sideButtonVisibility: false,
      });
  };


  onSetSidebarOpen = (open) => {
    this.setState({
      sidebarOpen: open,
      sideButtonVisibility: true,
    });
  };

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({
      mql: mql,
      sidebarDocked: mql.matches,
      sideButtonVisibility: !this.state.mql.matches,
    });
  };

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  };

  mediaQueryChanged = () => {
    this.setState({
      sidebarDocked: this.state.mql.matches,
      sideButtonVisibility: !this.state.mql.matches,
    });
  };

  render() {

    let sidebarContent = <SidebarTabs />;

    const sidebarStyles = {
      sidebar: {
        backgroundColor: 'f3f3f3',
        width: '8em',
        textAlign: 'center',
      },
      content: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflowY: 'scroll',
        WebkitOverflowScrolling: 'touch',
        transition: 'left .3s ease-out, right .3s ease-out',
      },
      overlay: {
        zIndex: 1,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        visibility: 'hidden',
        transition: 'opacity .3s ease-out, visibility .3s ease-out',
        //backgroundColor: 'rgba(0,0,0,.3)',
        backgroundColor: '#f3f3f3'
      },
    };

    return (
      <Sidebar styles={sidebarStyles}
               sidebar={sidebarContent}
               open={this.state.sidebarOpen}
               docked={this.state.sidebarDocked}
               onSetOpen={this.onSetSidebarOpen}>

        {this.state.sideButtonVisibility
          ?
          <Button outline onClick={this.dockSideBar}>
            <i className="fas fa-bars"/>
          </Button>
          :
          <b>Main Section</b>
        }

      </Sidebar>
    );
  }
}

export default HomePage;
