import React from 'react';

function PropertyLine(props) {
  const {Name = '', Value = '', Notes = ''} = props

  return (
      <div className="listing"><strong>{Name}</strong> {Value} {Notes}</div>
  )
}

export default PropertyLine
