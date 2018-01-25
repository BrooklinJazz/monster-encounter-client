import React, {Component} from "react";
import {connect} from "react-redux";
import Stat from '../components/Stat';
import RollableListing from '../components/RollableListing';
import Power from '../components/Power'
// import SaveList from '../components/SaveList'

class MonsterDetail extends Component {
  constructor(props) {
    super(props)
    // this.renderSaves = this.renderSaves.bind(this);
  }
  render() {
    const {monster = {}} = this.props

    if (!monster) {
      return <div>Select a monster to get started</div>;
    }
    // this must be below if statement or it will be defined when monster is empty
    // NOTE InitiativeModifier is always 0 in JSON?
    // TODO make a component for Senses and Speed. they currently render an array without spaces
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
      // Saves (only the ones with extra modifiers)
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
    
    return (
      <div className="monsterDetail">

        <Stat Name="Armor Class" Value={AC.Value, AC.Notes} />
        <Stat Name="Hit Points" Value={HP.Value, HP.Notes} />
        <div className="Speed"><strong>Speed:</strong> {Speed}</div>

        <div className="Saves">
          <RollableListing Title="Saves" ArrOfObj={Saves}/>
        </div>

        <div className="Skills">
          <RollableListing Title="Skills" ArrOfObj={Skills}/>
        </div>

        <div className="Senses"><strong>Senses:</strong> {Senses}</div>

        <div className="abilities">
          <Stat Name="STR" Value={Str} />
          <Stat Name="DEX" Value={Dex} />
          <Stat Name="CON" Value={Con} />
          <Stat Name="INT" Value={Int} />
          <Stat Name="WIS" Value={Wis} />
          <Stat Name="CHA" Value={Cha} />
        </div>


        <Stat Name="Damage Immunities" Value={DamageImmunities} />
        <Stat Name="Condition Immunities" Value={ConditionImmunities} />
        <Stat Name="Senses" Value={Senses} />
        <Stat Name="Languages" Value={Languages} />
        <Stat Name="Challenge" Value={Challenge} />

        <Power Title="Traits" ArrOfObj={Traits} />
        
        <Power Title="Actions" ArrOfObj={Actions} />

        <Power Title="Legendary Actions" ArrOfObj={LegendaryActions} />

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
