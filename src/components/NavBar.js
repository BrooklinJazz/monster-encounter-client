import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ClearRolls from '../containers/ClearRolls'
import ClearCombatant from '../containers/ClearCombatant';
import { Button } from 'reactstrap';
import InitiativeRoll from '../containers/InitiativeRoll'
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
  DropdownItem } from 'reactstrap';


class NavBar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {user, onSignOutClick = () => {}} = this.props;

    const handleSignOut = event => {
      event.preventDefault();
      onSignOutClick();
    };
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand tag={Link} to="/">Roll Initiative</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/saves">Saves</NavLink>
            </NavItem>
            <NavLink tag={Link} to="/saves">Saves</NavLink>
          </Nav>
        </Navbar>
        <nav
          style={{
            padding: '10px',
            display: 'flex',
          }}
          >
            <Button color="default">
              <Link to="/">Home</Link>
            </Button>

            <Button color="default">
              <Link to="/saves">Save Files</Link>
            </Button>
            <QuickSave user={user} />

            <Link to="/combat">Combat Mode</Link>
            <ClearRolls />
            <ClearCombatant />
            <InitiativeRoll />
            {
              user ? ([
                <span
                  key='1'
                  style={{marginLeft: 'auto', marginRight: '20px'}}
                  >
                    Hello, {user.full_name}
                  </span>,
                  <a
                    onClick={handleSignOut}
                    key='2'
                    href="#"
                    style={{marginRight: '20px'}}
                    >
                      Sign Out
                    </a>
                  ]) : (
                    <Link
                      style={{marginLeft: 'auto', marginRight: '20px'}}
                      to="/sign_in"
                      >
                        {/* DEBUG Sign in still shows until refresh */}
                        Sign In
                      </Link>
                    )
                  }
                </nav>

              </div>
            )

  }
}

export default NavBar
