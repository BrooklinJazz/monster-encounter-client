import React, { Component } from "react";
import { connect } from "react-redux";
// import { selectCombatant } from "../actions/index";
// import Monster from "../components/Monster"
import * as actions from "../actions/index";
import { bindActionCreators } from "redux";
import { ListGroup, ListGroupItem } from 'reactstrap';
import SearchBar from './SearchBar'



class MonsterList extends Component {
  renderList() {
    // TODO refactor this.props with ES6 syntax
    const {
      monsters = [],

    } = this.props
    return monsters
    .filter(monster =>
      monster.Name.toLowerCase().includes(this.props.searchTerm.toLowerCase())
    )
    // .sort(function (a, b) {
    //   if (true) {
    //
    //   } else {
    //     return parseInt(b.Challenge) - parseInt(a.Challenge)
    //   }
    // })
    .map(monster => {
      return (
        <ListGroupItem
          key={monster.Name}
          onClick={() => this.props.addMonsterToCombatants(monster)}
          className="monsterListGroupItem"
          >
            {monster.Name}
          </ListGroupItem>
        );
      });
    }

    render() {
      return (
        <div className="monsterList">
          <h2>Library</h2>
          <SearchBar/>
          <ListGroup className="monsterListGroup">{this.renderList()}</ListGroup>
        </div>
      )
    }
  }
  function mapStateToProps(state) {
    // Whatever is returned will show up as props inside of MonsterList
    // console.tron.log(state);
    const { monsters, searchTerm } = state.monsters;
    return {
      monsters,
      searchTerm
    };
  }

  // Anything returned from this function will end up as props
  // on the MonsterList container
  function mapDispatchToProps(dispatch) {
    // Whenever selectCombatant is called, the result should be passed to all
    // of our reducers
    return {
      addMonsterToCombatants: monster =>
      dispatch(actions.addMonsterToCombatants(monster)),
    };
  }

  // Promote MonsterList from a component to a container - it needs to know
  // about this new dispatch method, selectCombatant. Make it available
  // as a prop.
  export default connect(mapStateToProps, mapDispatchToProps)(MonsterList);
