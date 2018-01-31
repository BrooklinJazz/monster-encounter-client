import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../actions/index"

class ClearCombatant extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <button
        className="btn btn-default"
        onClick={() => this.props.clearCombatants()}
        >Clear Combatants</button>
    )
  }
}


function mapStateToProps(state) {
  const {CombatantList} = state.monsters;
  return {CombatantList};
}

function mapDispatchToProps(dispatch) {
  // Whenever selectCombatant is called, the result should be passed to all
  // of our reducers
  return {
    clearCombatants: payload => dispatch(actions.clearCombatants(payload))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ClearCombatant);
