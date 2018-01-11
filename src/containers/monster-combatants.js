import React, { Component } from "react";
import { connect } from "react-redux";
// import { selectMonster } from '../actions/index';
// import { bindActionCreators} from 'redux';

// let monsterCombatantsArr = []
class MonsterCombatants extends Component {
  renderList() {
    // NOTE bug where cannot select monster with same key result is flatten
    return this.props.monsterCombatants.map((monster, index) => {
      return (
        <li
          key={index}
          // onClick={() => this.props.selectMonster(monster)}
          className="list-group-item"
        >
          {monster.Name}
        </li>
      );
    });
  }
  render() {
    if (!this.props.monsterCombatants) {
      return <div>Select a monsterCombatants to get started</div>;
    }
    // monsterCombatantsArr.push(this.props.monsterCombatants);
    // console.log(monsterCombatantsArr);
    return <ul className="list-group col-sm-4">{this.renderList()}</ul>;
  }
}

function mapStateToProps(state) {
  const { monsterCombatants } = state.monsters;
  return { monsterCombatants };
}

// function mapDispatchToProps(dispatch) {
//   // Whenever SelectMonster is called, the result should be passed to all
//   // of our reducers
//   return bindActionCreators({ selectMonster: selectMonster}, dispatch)
// }

export default connect(mapStateToProps)(MonsterCombatants);
