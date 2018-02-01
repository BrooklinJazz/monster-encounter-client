import React from 'react';
import {Link} from 'react-router-dom';
import ClearRolls from '../containers/ClearRolls'
import ClearCombatant from '../containers/ClearCombatant'

function NavBar(props) {
  return (
    <nav
      style={{
        padding: '10px',
        display: 'flex',
      }}
    >
    <Link style={{marginRight: '20px'}} to="/">Home</Link>
    <Link to="/combat">Combat Mode</Link>
    <ClearRolls />
    <ClearCombatant />
    </nav>
  )
}

export default NavBar
