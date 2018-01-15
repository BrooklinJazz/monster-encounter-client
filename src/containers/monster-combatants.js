import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index"
// import { selectMonster } from '../actions/index';
// import { bindActionCreators} from 'redux';

// let monsterCombatantsArr = []
class MonsterCombatants extends Component {
  renderList() {
    return this.props.monsterCombatants.map((monster, index) => {
      // define a current hp value to be modified later as the user inputs
      monster.CurrentHp = monster.HP.Value
      console.log(monster.CurrentHp);
      console.log(monster);
      return (
        <li
          key={index}
          onClick={() => this.props.selectMonster(monster)}
          className="list-group-item"
        >
          {monster.Name}
          <form>
            <input
              value={monster.HP.Value}
              onClick={event => event.stopPropagation()}
              />
          </form>
          <div>
            HP: {monster.HP.Value}
          </div>
          <div>
            AC: {monster.AC.Value}
          </div>
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

function mapDispatchToProps(dispatch) {
  // Whenever SelectMonster is called, the result should be passed to all
  // of our reducers
  return {
    selectMonster: monster => dispatch(actions.selectMonster(monster))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MonsterCombatants);
