import React, {Component} from 'react';
import Roll from '../components/Roll'
import { connect } from "react-redux";

class Rolls extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {rolls} = this.props
    console.log(rolls);
    const rollsMap = rolls.map( (obj, index) => {
      return (
        <div key={index}>
          <Roll roll={obj.roll} value={obj.value}/>
        </div>
      )
    })
    return (
      <div>{rollsMap}</div>
    )
  }
}
function mapStateToProps(state) {
  // Whatever is returned will show up as props inside of Rolls
  // console.tron.log(state);
  const {rolls} = state.monsters;
  return {
    rolls
  };
}

export default connect(mapStateToProps)(Rolls);
