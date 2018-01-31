import React, {Component} from 'react'
import {replaceRollsRegex} from '../../helpers'


class Power extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {ArrOfObj = []} = this.props
    const {Title = ''} = this.props
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
