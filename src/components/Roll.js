import React from 'react';

function Roll(props) {
  const {roll, value} = props
  return (
    <div>
      <div>{roll} {value}</div>
    </div>
  )
}

export default Roll
