import React, {Component} from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { convScoreToMod } from "../../helpers"

class Stat extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {Name = '', Value = 0} = this.props
    return (
      <div
        onClick={() => this.props.d20Roll(convScoreToMod(Value))}>
        <h4>{Name}</h4>
        <p>
          {Value}
        </p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props inside of MonsterList
  // console.tron.log(state);
  const { rolls } = state.monsters;
  return {
    rolls
  };
}

// Anything returned from this function will end up as props
// on the MonsterList container
function mapDispatchToProps(dispatch) {
  // Whenever selectCombatant is called, the result should be passed to all
  // of our reducers
  return {
    d20Roll: payload =>
    dispatch(actions.d20Roll(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stat);
