import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions/index"
import CombatantMode from "../containers/CombatantMode"

class CombatantModeList extends Component {
  constructor(props) {
    super(props);
  }
// renders a list of Combatants
  renderList() {
    const {CombatantList = []} = this.props
    return CombatantList.map((combatant, index) => {
      return (
        <div key={index}>
          <li className="list-group-item col-sm-4">
            <CombatantMode combatant={combatant} index={index}/>
          </li>
        </div>
      )
    });
  }
// if there are no combatants Do not render the list
  render() {
    const {CombatantList = []} = this.props
    if (!CombatantList) {
      return <div>Select a CombatantList to get started</div>;
    }
    // if there are combatants in Combatant list then render the list
    return <ul className="list-group">{this.renderList()}</ul>;
  }
}

function mapStateToProps(state) {
  const {CombatantList} = state.monsters;
  return {CombatantList};
}

function mapDispatchToProps(dispatch) {
  return {
    changeCombatantHp: monster => dispatch(actions.changeCombatantHp(monster)),
    removeCombatant: monster => dispatch(actions.removeCombatant(monster))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CombatantModeList);
