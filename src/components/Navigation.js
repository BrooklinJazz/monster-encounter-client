import React from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'reactstrap';
import QuickSave from '../containers/QuickSave'
import FontAwesome from 'react-fontawesome'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';


function Navigation(props) {
  const {user, onSignOutClick = () => {}} = props;

  const handleSignOut = event => {
    event.preventDefault();
    onSignOutClick();
  };
  return (
    <Navbar key="Navbar" color="faded" light expand="md">
      <NavbarBrand key="NavbarBrand" tag={Link} to="/">
      Monster Encounter
    </NavbarBrand>
    <Nav key="Nav" className="ml-auto" navbar>
      <NavItem key="HomeItem" className="navItem">
        <NavLink key="HomeLink" className="navLink" tag={Link} to="/">Home</NavLink>
      </NavItem>
      {/* <NavItem className="navItem">
      <NavLink className="navItem" tag={Link} to="/combat">Combat Mode</NavLink>
    </NavItem> */}
    <NavItem key="CreatePlayerItem" className="navItem">
      <NavLink  key="CreatePlayerLink" className="navLink" tag={Link} to="/new_player">Create Player</NavLink>
    </NavItem>
    <NavItem key="SaveFilesItem" className="navItem">
      <NavLink  key="SaveFilesLink" className="navLink" tag={Link} to="/saves">Save Files</NavLink>
    </NavItem>
    <NavItem key="QuickSaveItem" className="navItem">
      <NavLink key="QuickSaveLink" className="navLink"><QuickSave user={user} /></NavLink>
    </NavItem>

    {
      user ? ([
        <div key="pull-right" className="pull-right">
          <NavItem key="UserNameItem" className="navItem">
            <NavLink
              key="UserNameLink"
              className="userName"
              key='1'
              style={{marginLeft: '20px', marginRight: '0px'}}>
              Hello, {user.full_name}
            </NavLink>
          </NavItem>
          <NavItem key="SignOutItem" className="navItem">
            <NavLink
              key="SignOutLink"
              className="signing"
              onClick={handleSignOut}
              key='2'
              href="#">
              Sign Out
            </NavLink>
          </NavItem>
        </div>
      ]) : (
        <div key="pull-right" className="pull-right">
          <NavItem key="SignInItem" className='navItem '>
            <NavLink
              key="SignInLink"
              className="signing "
              // style={{marginLeft: 'auto', marginRight: '20px'}}
              tag={Link}
              to="/sign_in">
              {/* DEBUG Sign in still shows until refresh */}
              Sign In
            </NavLink>
          </NavItem>
          <NavItem key="SignUpItem" className='navItem '>
            <NavLink
              key="SignUpLink"
              className="signing "
              tag={Link}
              // style={{marginLeft: 'auto', marginRight: '20px'}}
              to="/sign_up">
              {/* DEBUG Sign in still shows until refresh */}
              Sign Up
            </NavLink>
          </NavItem>
        </div>
      )
    }
  </Nav>
</Navbar>
)
}

export default Navigation
