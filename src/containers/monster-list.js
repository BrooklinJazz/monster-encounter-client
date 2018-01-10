import React, { Component } from 'react';
import { connect } from 'react-redux';

class MonsterList extends Component {
  renderList() {
    return this.props.monsters.map((monster) => {
      return (
        <li key={monster.Name} className="list-group-item">
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

export default connect(mapStateToProps)(MonsterList)
