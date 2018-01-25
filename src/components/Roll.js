import React, { Component } from 'react';

class Roll extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {rolled, roll, result} = this.props
    return (
      <div>
        <div>{rolled} {roll} {result} <input type="number" defaultValue={result}></input> <button>Delete</button></div>

      </div>
    )
  }
}

export default Roll
