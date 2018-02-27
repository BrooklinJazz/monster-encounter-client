import React from 'react';

import Fights from '../../containers/Fights'
import SaveFight from '../../containers/SaveFight'

function SavePage(props) {
  const {user = [], history = {}} = props
  return (
    <div>
      <div className="row">
        <div className="col-sm-4 col-sm-offset-5">
          <SaveFight user={user} />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-10 col-sm-offset-1">
          <Fights user={user} history={history} />
        </div>
      </div>
    </div>

  )
}

export default SavePage
