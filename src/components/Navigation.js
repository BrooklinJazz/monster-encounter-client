import React from 'react';
import {Link} from 'react-router-dom';
import ClearRolls from '../containers/ClearRolls'
import ClearCombatant from '../containers/ClearCombatant';
import { Button } from 'reactstrap';
import QuickSave from '../containers/QuickSave'
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
        <NavbarBrand tag={Link} to="/">D&D Battle Master</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem className="navItem">
            <NavLink tag={Link} to="/">Home</NavLink>
          </NavItem>
          {/* <NavItem className="navItem">
            <NavLink className="navItem" tag={Link} to="/combat">Combat Mode</NavLink>
          </NavItem> */}
          <NavItem className="navItem">
            <NavLink className="navItem" tag={Link} to="/saves">Save Files</NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink className="navItem" tag={Link} to="/new_player">Create Player</NavLink>
          </NavItem>
          {/* TODO fix the hover on QuickSave and Clear Rolls.*/}
          <NavItem className="navItem">
            <NavLink><QuickSave user={user} /></NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink><ClearRolls /></NavLink>
          </NavItem>
          {/* <NavItem className="navItem">
            <NavLink><ClearCombatant /></NavLink>
          </NavItem> */}

        {
          user ? ([
            <div>
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
            <NavItem>
              <NavLink
                className="signing"
                style={{marginLeft: 'auto', marginRight: '20px'}}
                to="/sign_in">
                {/* DEBUG Sign in still shows until refresh */}
                Sign In
              </NavLink>
            </NavItem>
          )
        }
      </Nav>
    </Navbar>
)
}

export default NavBar
