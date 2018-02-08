import React from 'react';
import SearchBar from '../../containers/SearchBar'
import MonsterList from '../../containers/MonsterList'
import CombatantList from '../../containers/CombatantList'
import Rolls from '../../containers/Rolls'
import MonsterDetail from '../../containers/MonsterDetail'

function HomePage(props) {
  return (
    <div className="row">
      <div className="col-sm-4">
        <SearchBar/>
        <MonsterList/>
      </div>
      <div className="col-sm-4">
        <CombatantList/>
        <Rolls />
      </div>
      <div className="col-sm-4">
        <MonsterDetail
        />
      </div>
    </div>
  )
}

export default HomePage
