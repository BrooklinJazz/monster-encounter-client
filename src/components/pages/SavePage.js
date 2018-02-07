import React from 'react';

import Fights from '../../containers/Fights'
import SaveFight from '../../containers/SaveFight'

function SavePage(props) {
  const {user = []} = props
  console.log(props.user);
  return (
    <div className="row">
      <div className="col-sm-10">
        <Fights user={user} />
        <SaveFight user={user} />
      </div>
    </div>
  )
}

export default SavePage
