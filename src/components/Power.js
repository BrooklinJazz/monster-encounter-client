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
        <div className="propertyBlock" key={obj.Name}>
          {/* <div > */}
          <h4><strong>{obj.Name} </strong></h4>
          <div className="propertyBlock-text">
            {replaceRollsRegex(obj.Content)}
          </div>
          {/* </div> */}
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
