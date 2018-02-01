import React from 'react';
import {Link} from 'react-router-dom';
import ClearRolls from '../containers/ClearRolls'
import ClearCombatant from '../containers/ClearCombatant';
import { Button } from 'reactstrap';

function NavBar(props) {
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
    </nav>
  )
}

export default NavBar
