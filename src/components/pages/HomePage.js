import React from 'react';
// import SearchBar from '../../containers/SearchBar'
import MonsterList from '../../containers/MonsterList'
import CombatantList from '../../containers/CombatantList'
import MonsterDetail from '../../containers/MonsterDetail'

function HomePage(props) {
  const {user} = props
  return (
    <div className="row">
      <div className="col-sm-3">
        <MonsterList user={user}/>
      </div>
      <div className="col-sm-5">
        <CombatantList/>
      </div>
      <div className="col-sm-4">
        <MonsterDetail
        />
      </div>
    </div>
  )
}

export default HomePage
