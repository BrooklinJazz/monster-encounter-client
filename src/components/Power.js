import React, {Component} from 'react'
import {replaceRollsRegex} from '../../helpers'


class Power extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    // Where Title is the descriptor of the array of objects
    // and the ArrOfObj is and array of objects with the key
    // `Name` i.e. Multi-Attack and `Content` as a string describing the creatures Power.
    const {ArrOfObj = []} = this.props
    const {Title = ''} = this.props
    // map through the ArrOfObj and replace obj.Content string
    // with clickable Components D20Roll and PowerRoll
    const ArrOfObjMap = ArrOfObj.map( obj => {
      return (
        <div className="propertyBlock" key={obj.Name}>
          {/* i.e. Bite */}
          <h4><strong>{obj.Name} </strong></h4>
          {/* i.e. Melee Weapon Attack: <D20Roll>+6</D20Roll> to hit, reach 5 ft., one target. Hit: 1 piercing damage plus 7 <PowerRoll>(3d4)</PowerRoll> poison damage. */}
          <div className="propertyBlock-text">
            {replaceRollsRegex(obj.Content)}
          </div>
        </div>
      )
    })
    return (
      <div className="actions">
        {
          Title.length > 0 ? <h3>{Title}</h3> : <div />
        }
        {/* <h3>{Title}</h3> */}
        {/* <div>{ArrOfObjMap}</div> */}
        {ArrOfObjMap}
      </div>
    )
  }
}

export default Power
