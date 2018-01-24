import React, {Component} from "react";
import {connect} from "react-redux";

class MonsterDetail extends Component {
  render() {
    const {monster = {}} = this.props

    if (!monster) {
      return <div>Select a monster to get started</div>;
    }
    // this must be below if statement or it will be defined when monster is empty
    // NOTE InitiativeModifier is always 0 in JSON?
    const {
      Name = '',
      Source = '',
      Type = '',
      Challenge = '',
      HP = [],
      AC = [],
      Speed = [],
      DamageVulnerabilities = [],
      DamageResistances = [],
      DamageImmunities = [],
      ConditionImmunities = [],
      Senses = [],
      Languages = [],



      // an arr of obj
      Saves = [],
      Skills = [],
      Traits = [],
      Actions = [],
      Reactions = [],
      LegendaryActions = [],

    } = monster
    // Abilites
    const {
      Str = 0,
      Dex = 0,
      Con = 0,
      Int = 0,
      Wis = 0,
      Cha = 0,
    } = monster.Abilities
    // Saves (only the ones with extra modifiers)

    // console.log(InitiativeModifier);
    return (
      <div>
        <h3>Details for:</h3>
        <div>Name: {Name}</div>
        <div>Source: {Source}</div>
        <div>Type: {Type}</div>
        <div onClick={() => console.log('MonsterDetail.js', monster.HP.Value)}>Hp: {monster.HP.Value}</div>
        <div>AC: {monster.AC.Value}</div>
        <div>
          Speed: {monster.speed}
        </div>
        <hr/>
      </div>
    );
  }
}

// get selectedMonster from state and name as monster
function mapStateToProps(state) {
  const {selectedMonster: monster} = state.monsters;
  return {monster};
}

export default connect(mapStateToProps)(MonsterDetail);
