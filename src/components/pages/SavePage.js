import React from 'react';

import Fights from '../../containers/Fights'
import SaveFight from '../../containers/SaveFight'

function SavePage(props) {
  const {user = [], history = {}} = props
  console.log(props.user);
  return (
    <div className="row">
      <div className="col-sm-10">
        <SaveFight user={user} />
        <Fights user={user} history={history} />
      </div>
    </div>
  )
}

export default SavePage
