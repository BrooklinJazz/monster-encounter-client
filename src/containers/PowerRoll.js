import React, {Component} from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/index";


class PowerRoll extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {roll} = this.props

    return (
      <div className="PowerRoll rollableUnderline"
        onClick={() => this.props.sidedDiceRoll(roll)}
        >
          {roll}
        </div>
    )
  }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props inside of MonsterList
  const { rolls } = state.monsters;
  return {
    rolls
  };
}

function mapDispatchToProps(dispatch) {
  // Whenever selectCombatant is called, the result should be passed to all
  // of our reducers
  return {
    sidedDiceRoll: payload =>
    dispatch(actions.sidedDiceRoll(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PowerRoll);
