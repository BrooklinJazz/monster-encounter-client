import React, { Component } from 'react';

class RollableListing extends Component {
  constructor(props) {
    super(props)

  }
  // TODO function for rolling saveObj.Value + d20
  render() {
    const {Title = ''} = this.props
    const {ArrOfObj} = this.props
    const ArrOfObjMap = ArrOfObj.map( obj => {
      return (
        <div key={obj.Name}>
          <div >
            {obj.Name}: <span className="rollableMod">{obj.Modifier}</span>
          </div>

        </div>
      )
    })
    return (
      <div><strong>{Title}:</strong>{ArrOfObjMap}</div>
    )
  }
}


export default RollableListing
