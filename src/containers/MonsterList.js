import React, { Component } from "react";
import { connect } from "react-redux";
// import { selectMonster } from "../actions/index";
import Monster from "../components/Monster"
import * as actions from "../actions/index";
import { bindActionCreators } from "redux";

class MonsterList extends Component {
  renderList() {
    console.log(this.props);
    return this.props.monsters.filter(monster => monster.Name.toLowerCase().includes(this.props.searchTerm)).map(monster => {
      return (
        <li
          key={monster.Name}
          onClick={() => this.props.addMonsterToCombatants(monster)}
          className="list-group-item"
        >
          <Monster monster={monster}/>
        </li>
      );
    });
  }

  render() {
    return <ul className="list-group col-sm-4">{this.renderList()}</ul>;
  }
}
function mapStateToProps(state) {
  // Whatever is returned will show up as props inside of MonsterList
  console.tron.log(state);
  const { monsters, searchTerm } = state.monsters;
  return {
    monsters,
    searchTerm
  };
}

// Anything returned from this function will end up as props
// on the MonsterList container
function mapDispatchToProps(dispatch) {
  // Whenever SelectMonster is called, the result should be passed to all
  // of our reducers
  return {
    addMonsterToCombatants: monster =>
      dispatch(actions.addMonsterToCombatants(monster)),
  };
}

// Promote MonsterList from a component to a container - it needs to know
// about this new dispatch method, SelectMonster. Make it available
// as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(MonsterList);
