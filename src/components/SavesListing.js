import React, { Component } from 'react';

// Originally wanted to name SavesListing as Saves but this caused a conflict with the Saves Constant in MonsterDetail

class SavesListing extends Component {
  constructor(props) {
    super(props)

  }
  // TODO function for rolling saveObj.Value + d20
  render() {
    const {Saves} = this.props
    const SavesMap = Saves.map( saveObj => {
      return (
        <div key={saveObj.Name}>
          <div >
            {saveObj.Name}: <span className="rollableMod">{saveObj.Modifier}</span>
          </div>

        </div>
      )
    })
    return (
      <div><strong>Saves:</strong>{SavesMap}</div>
    )
  }
}


export default SavesListing
