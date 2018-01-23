import React, {Component} from "react";
// import {connect} from "react-redux";
// import * as actions from "../actions/index"

class Combatant extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   showComponent: false
    // };
    // this._onButtonClick = this._onButtonClick.bind(this);
    // this.focusTextInput = this.focusTextInput.bind(this);
  }
  render() {
    const {combatant = {}} = this.props
    return (
      <div
        // onClick={() => this.props.selectCombatant(combatant)}
        // >
        <p>{combatant.Name}</p>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  // Whenever selectCombatant is called, the result should be passed to all
  // of our reducers
  return {
    selectCombatant: monster => dispatch(actions.selectCombatant(monster)),
    // changeCombatantHp: monster => dispatch(actions.changeCombatantHp(monster)),
    // removeCombatant: monster => dispatch(actions.removeCombatant(monster))
  };
}


export default Combatant
