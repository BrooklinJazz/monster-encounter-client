import React, { Component } from "react";
import { connect } from "react-redux";

class MonsterDetail extends Component {
  render() {
    if (!this.props.monster) {
      return <div>Select a monster to get started</div>;
    }

    return (
      <div>
        <h3>Details for: </h3>
        <div>Name: {this.props.monster.Name}</div>
        <div>Hp: {this.props.monster.HP.Value}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { selectedMonster: monster } = state.activeMonster;
  return {
    monster,
  };
}

export default connect(mapStateToProps)(MonsterDetail);
