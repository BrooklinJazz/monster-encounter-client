import React from 'react';

function Roll(props) {
  const {rolled, roll, result} = props
  return (
    <div>
      <div>{rolled} {roll} {result}</div>
    </div>
  )
}

export default Roll
