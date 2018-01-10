import React, {Component} from 'react';
import {connect} from 'react-redux';

let monsterCombatantArr = []
class MonsterCombatants extends Component {
  renderList() {
    return monsterCombatantArr.map((monster) => {
      return (
        <li
          key={monster.Name}
          onClick={() => this.props.selectMonster(monster)}
          className="list-group-item">
          {monster.Name}
        </li>
      )
    })
  }
  render() {
    if (!this.props.monsterCombatant) {
      return <div>Select a monsterCombatant to get started</div>
    }
    monsterCombatantArr.push(this.props.monsterCombatant)
    console.log(monsterCombatantArr);
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return {monsterCombatant: state.activeMonster};
}

export default connect(mapStateToProps)(MonsterCombatants)
