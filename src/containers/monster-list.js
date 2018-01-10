import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectMonster } from '../actions/index';
import { bindActionCreators} from 'redux';

class MonsterList extends Component {
  renderList() {
    return this.props.monsters.map((monster) => {
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
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    )
  }
}
function mapStateToProps(state) {
  // Whatever is returned will show up as props inside of MonsterList
  return {
    monsters: state.monsters
  }
}

// Anything returned from this function will end up as props
// on the MonsterList container
function mapDispatchToProps(dispatch) {
  // Whenever SelectMonster is called, the result should be passed to all
  // of our reducers
  return bindActionCreators({ selectMonster: selectMonster}, dispatch)
}

// Promote MonsterList from a component to a container - it needs to know
// about this new dispatch method, SelectMonster. Make it available
// as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(MonsterList)
