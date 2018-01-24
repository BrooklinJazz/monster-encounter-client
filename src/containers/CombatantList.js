import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions/index"
// import DamageInput from "../components/damage-input";
import Combatant from "../containers/Combatant"

// import { selectCombatant } from '../actions/index';
// import { bindActionCreators} from 'redux';

// let CombatantListArr = []
class CombatantList extends Component {
  constructor(props) {
    super(props);
  }

  renderList() {
    return this.props.CombatantList.map((combatant, index) => {
      return (
        <div>
          <li className="list-group-item">
            <Combatant combatant={combatant} index={index}/>
          </li>
        </div>
      )
    });
  }

  render() {
    if (!this.props.CombatantList) {
      return <div>Select a CombatantList to get started</div>;
    }
    // CombatantListArr.push(this.props.CombatantList);
    // console.log(CombatantListArr);
    return <ul className="list-group col-sm-4">{this.renderList()}</ul>;
  }
}

// anything in mapStateToProps will be this.props in the container above.
// this.props.CombatantList is the array of monster combatants
function mapStateToProps(state) {
  const {CombatantList} = state.monsters;
  return {CombatantList};
}

function mapDispatchToProps(dispatch) {
  // Whenever selectCombatant is called, the result should be passed to all
  // of our reducers
  return {
    // selectCombatant: monster => dispatch(actions.selectCombatant(monster)),
    changeCombatantHp: monster => dispatch(actions.changeCombatantHp(monster)),
    removeCombatant: monster => dispatch(actions.removeCombatant(monster))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CombatantList);
