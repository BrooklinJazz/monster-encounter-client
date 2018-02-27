import React from 'react';
import CombatantModeList from '../../containers/CombatantModeList'
import MonsterDetail from '../../containers/MonsterDetail'

function CombatPage(props) {
  return (
    <div className="row">
      <div className="col-sm-8">
        <CombatantModeList />
      </div>
      <div className="col-sm-4">
        <MonsterDetail />
      </div>
    </div>
  )
}

export default CombatPage
