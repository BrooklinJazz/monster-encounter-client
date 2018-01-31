import React, {Component} from 'react'
import {replaceRollsRegex} from '../../helpers'


class Power extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    // TODO filter objContent for regex expressions looking for rollables i.e
    // (2d6 + 8) or +5 or +10. create a function that rolls dice on click.
    const {ArrOfObj = []} = this.props
    const {Title = ''} = this.props
    // const filterTest = replaceRollsRegex(ArrOfObj[0].Content)
    // console.log(filterTest);
    // console.log('FILTER XDX', replaceRollsRegex('this (1d6) (1d6) (1d12) (1d12) (12d6) (12d6) (12d12) (12d12) (1d6 + 1) (1d6 + 1) (1d6 + 12) (1d6 + 12) (1d12 + 1) (1d12 + 1) (1d12 + 12) (1d12 + 12) (12d12 + 1) (12d12 + 1) (12d12 + 12) (12d12 + 12) is working'));
    // console.log('Filter Bite', replaceRollsRegex('Melee Weapon Attack: +15 to hit, reach 15 ft., one target. Hit: 19 (1d12 + 1) (2d10 + 8) piercing damage.'));
    //   console.log('FILTER XDX FUNCTION', filterXDX(obj.Content));
    const ArrOfObjMap = ArrOfObj.map( obj => {
      return (
        <div key={obj.Name}>
          <div >
            <strong>{obj.Name}:</strong> {replaceRollsRegex(obj.Content)}
          </div>

        </div>
      )
    })
    return (
      <div>
        <div><strong>{Title}</strong></div>
        <div>{ArrOfObjMap}</div>
      </div>
    )
  }
}

export default Power
