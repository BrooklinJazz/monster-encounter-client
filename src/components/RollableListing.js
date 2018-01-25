import React, { Component } from 'react';

class RollableListing extends Component {
  constructor(props) {
    super(props)

  }
  // TODO function for rolling saveObj.Value + d20
  render() {
    const {Title = ''} = this.props
    const {valuesArrOfObj} = this.props
    const valuesArrOfObjMap = valuesArrOfObj.map( obj => {
      return (
        <div key={obj.Name}>
          <div >
            {obj.Name}: <span className="rollableMod">{obj.Modifier}</span>
          </div>

        </div>
      )
    })
    return (
      <div><strong>{Title}:</strong>{valuesArrOfObjMap}</div>
    )
  }
}


export default RollableListing
