import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../actions/index";
// import {Button} from 'reactstrap'
import FontAwesome from 'react-fontawesome'

class InitiativeRoll extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
        <FontAwesome
          onClick={() => this.props.rollInitiatives()}
          className="super-crazy-colors"
          name="play-circle"
          size="2x"
          style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
        />
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
