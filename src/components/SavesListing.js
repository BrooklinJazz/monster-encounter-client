import React from 'react';

function SavesListing(props) {
  const {Name = '', Value = 0} = props
  return (
    <div className="statRow">
      <strong className="statName">{Name}</strong>
      <div className="statValue">{Value}</div>
    </div>
  )
}

export default SavesListing
