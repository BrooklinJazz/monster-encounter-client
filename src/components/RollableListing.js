import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { bindActionCreators } from "redux";

class RollableListing extends Component {
  constructor(props) {
    super(props)

  }
  // TODO function for rolling saveObj.Value + d20
  render() {
    const {Title = ''} = this.props
    const {ArrOfObj} = this.props
    const ArrOfObjMap = ArrOfObj.map( obj => {
      return (
        <div key={obj.Name}>
          <div >
            {obj.Name}: <span
              className="rollableMod"
              onClick={() => this.props.d20Roll(obj.Modifier)}
              >{obj.Modifier}</span>
          </div>

        </div>
      )
    })
    return (
      <div><strong>{Title}:</strong>{ArrOfObjMap}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RollableListing);
