import React, {Component} from 'react'

class Power extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    // TODO filter objContent for regex expressions looking for rollables i.e
    // (2d6 + 8) or +5 or +10. create a function that rolls dice on click.
    const {ArrOfObj = []} = this.props
    const {Title = ''} = this.props
    const ArrOfObjMap = ArrOfObj.map( obj => {
      return (
        <div key={obj.Name}>
          <div >
            <strong>{obj.Name}:</strong> {obj.Content}
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
