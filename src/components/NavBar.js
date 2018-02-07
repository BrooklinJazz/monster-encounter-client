import React from 'react';
import {Link} from 'react-router-dom';
import ClearRolls from '../containers/ClearRolls'
import ClearCombatant from '../containers/ClearCombatant';
import { Button } from 'reactstrap';
import InitiativeRoll from '../containers/InitiativeRoll'

function NavBar(props) {
  const {user, onSignOutClick = () => {}} = props;

  const handleSignOut = event => {
    event.preventDefault();
    onSignOutClick();
  };
  return (
    <nav
      style={{
        padding: '10px',
        display: 'flex',
      }}
    >
    <Button color="default">
      <Link to="/">Home</Link>
    </Button>
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
  )
}

export default NavBar
