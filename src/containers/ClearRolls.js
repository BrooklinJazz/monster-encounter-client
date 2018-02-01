import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../actions/index";
import { Button } from 'reactstrap';

class ClearRolls extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Button
        color="default"
        onClick={() => this.props.clearRolls()}
        >Clear Rolls</Button>
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
    clearRolls: payload => dispatch(actions.clearRolls(payload))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ClearRolls);
