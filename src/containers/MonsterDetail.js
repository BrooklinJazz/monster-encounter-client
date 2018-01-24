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
    // const SpeedPrettier = Speed.map( value =>
    //   return (
    //     value.concat(' ')
    //   )
    // )
    // console.log(InitiativeModifier);
    return (
      <div class="monsterDetail">
        {/* Top with AC, HP, Speed */}
        <div className="statRow">
          <strong className="statName">Armor Class</strong>
          <div className="statValue">{AC.Value} {AC.Notes}</div>
        </div>
        <div className="statRow">
          <strong className="statName">Hit Points</strong>
          <div className="statValue">{HP.Value} {HP.Notes}</div>
        </div>
        <div className="statRow">
          <strong className="statName">Speed</strong>
          <div className="statValue">{Speed}</div>
        </div>

        <div className="Saves"></div>

        <div className="Skills"></div>

        <div className="Senses"></div>

        <div class="abilities">
          <div className="abilityContainer">
            <strong className="abilityName">STR</strong>
            <div className="abilityValue">{Str}</div>
          </div>
          <div className="abilityContainer">
            <strong className="abilityName">DEX</strong>
            <div className="abilityValue">{Dex}</div>
          </div>
          <div className="abilityContainer">
            <strong className="abilityName">CON</strong>
            <div className="abilityValue">{Con}</div>
          </div>
          <div className="abilityContainer">
            <strong className="abilityName">INT</strong>
            <div className="abilityValue">{Int}</div>
          </div>
          <div className="abilityContainer">
            <strong className="abilityName">WIS</strong>
            <div className="abilityValue">{Wis}</div>
          </div>
          <div className="abilityContainer">
            <strong className="abilityName">CHA</strong>
            <div className="abilityValue">{Cha}</div>
          </div>
        </div>

        <div className="statRow">
          <strong className="statName">Damage Immunities</strong>
          <div className="statValue">{DamageImmunities}</div>
        </div>
        <div className="statRow">
          <strong className="statName">Condition Immunities</strong>
          <div className="statValue">{ConditionImmunities}</div>
        </div>
        <div className="statRow">
          <strong className="statName">Senses</strong>
          <div className="statValue">{Senses}</div>
        </div>
        <div className="statRow">
          <strong className="statName">Languages</strong>
          <div className="statValue">{Languages}</div>
        </div>
        <div className="statRow">
          <strong className="statName">Challenge</strong>
          <div className="statValue">{Challenge}</div>
        </div>
        <div className="statRow">
          <strong className="statName"></strong>
          <div className="statValue"></div>
        </div>

        <div className="traits"></div>

        <div className="actions"></div>

        <div className="legendaryActions"></div>



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
