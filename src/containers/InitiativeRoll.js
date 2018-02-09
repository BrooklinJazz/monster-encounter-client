import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../actions/index";
// import {Button} from 'reactstrap'

class InitiativeRoll extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div
        onClick={() => this.props.rollInitiatives()}
        >InitiativeRoll</div>
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
    rollInitiatives: payload => dispatch(actions.rollInitiatives(payload))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(InitiativeRoll);
