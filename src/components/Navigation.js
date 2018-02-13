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


function NavBar(props) {
  const {user, onSignOutClick = () => {}} = props;

  const handleSignOut = event => {
    event.preventDefault();
    onSignOutClick();
  };
  return (
    <Navbar color="faded" light expand="md">
      <NavbarBrand tag={Link} to="/">
      <FontAwesome
        name='d-and-d'
        size='2x'
        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
      />
      D&D Battle Master
    </NavbarBrand>
    <Nav className="ml-auto" navbar>
      <NavItem className="navItem">
        <NavLink className="navLink" tag={Link} to="/">Home</NavLink>
      </NavItem>
      {/* <NavItem className="navItem">
      <NavLink className="navItem" tag={Link} to="/combat">Combat Mode</NavLink>
    </NavItem> */}
    <NavItem className="navItem">
      <NavLink  className="navLink" tag={Link} to="/new_player">Create Player</NavLink>
    </NavItem>
    <NavItem className="navItem">
      <NavLink  className="navLink" tag={Link} to="/saves">Save Files</NavLink>
    </NavItem>
    <NavItem className="navItem">
      <NavLink className="navLink"><QuickSave user={user} /></NavLink>
    </NavItem>

    {
      user ? ([
        <div className="pull-right">
          <NavItem className="navItem">
            <NavLink
              className="userName"
              key='1'
              style={{marginLeft: '20px', marginRight: '0px'}}>
              Hello, {user.full_name}
            </NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink
              className="signing"
              onClick={handleSignOut}
              key='2'
              href="#">
              Sign Out
            </NavLink>
          </NavItem>
        </div>
      ]) : (
        <div className="pull-right">
          <NavItem className='navItem '>
            <NavLink
              className="signing "
              // style={{marginLeft: 'auto', marginRight: '20px'}}
              tag={Link}
              to="/sign_in">
              {/* DEBUG Sign in still shows until refresh */}
              Sign In
            </NavLink>
          </NavItem>
          <NavItem className='navItem '>
            <NavLink
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

export default NavBar
