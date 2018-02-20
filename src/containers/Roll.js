import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { bindActionCreators } from "redux";
import FontAwesome from 'react-fontawesome'

class Roll extends Component {
  constructor(props) {
    super(props)
  }
  // TODO change the Delete in the Delete button to be a check mark. style the number input


  render() {
    const {rolled, roll, result, index} = this.props
    return (
      <div className="row">
        <div className="rollContainer pull-right one-edge-shadow float-right ">
          <div>Rolled: {rolled} -> {roll} = <strong>{result}</strong></div>
          <FontAwesome
            className="rollCheck"
            onClick={() => this.props.deleteRoll(index)}
            name='check'
            size='2x'
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
          />
        </div>

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
    deleteRoll: payload =>
    dispatch(actions.deleteRoll(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Roll);
