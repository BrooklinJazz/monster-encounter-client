import React, {Component} from 'react';
import Roll from '../components/Roll'
import { connect } from "react-redux";

class Rolls extends Component {
  constructor(props) {
    super(props)
  }
  renderList() {
    const {rolls = []} = this.props
    return rolls.map( (obj, index) => {
      return (
        <div key={index}>
          <Roll rolled={obj.rolled} roll={obj.roll} result={obj.result}/>
        </div>
      )
    })
  }
  render() {
    return <div>{this.renderList()}</div>
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
