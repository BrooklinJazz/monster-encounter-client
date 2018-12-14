import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index"
// import DamageInput from "../components/damage-input";
import Combatant from "../containers/Combatant"
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Table } from 'reactstrap';
import InitiativeRoll from './InitiativeRoll'
import ClearCombat from './ClearCombat'
import FontAwesome from 'react-fontawesome'
import Rolls from './Rolls';
import CombatantGroup from './CombatantGroup';

class CombatantList extends Component {

  // renders a list of Combatants or CombatantGroup
  renderList() {
    const { CombatantList = [], GroupMonsters } = this.props
      if (!GroupMonsters) {
        return (
            CombatantList.map((combatant, index) => {
                return (
                  <tbody><Combatant key={index} combatant={combatant} index={index} /></tbody>
                )
            })
        )
      } else {
        return (
            CombatantList.sort( (a, b) => {
              return b.InitiativeRoll - a.InitiativeRoll
            }).map( (combatant, index) => {
              if (combatant.Group !== true) {
                return <tbody><Combatant key={index} combatant={combatant} index={index} /></tbody>
              } else {
                // return CombatantGroup
                return <CombatantGroup key={index} parentObj={combatant} index={index} />
              }
            })
        )
      }
  }
  // if there are no combatants Do not render the list
  render() {
    const { GroupMonsters } = this.props
    if (!CombatantList) {
      return <div>Select a CombatantList to get started</div>;
    }
    // if there are combatants in Combatant list then render the list
    return (
      <div className="CombatantListContainer innerShadow">
        <Table hover striped className="CombatantList">
          <thead>
            <tr>
              <th className="col-xs-1" data-toggle="tooltip" title="Roll Initiative">
                <InitiativeRoll />
              </th>
              {
                GroupMonsters ?
                  <th
                    className="col-xs-4 ungroupMonsters"
                    data-toggle="tooltip"
                    title="Ungroup Monsters"
                    onClick={() => this.props.toggleGroupingMonsters(false)}
                  >
                    <FontAwesome
                      name="optin-monster"
                      size="2x"
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'}}
                    />
                  </th>
                  :
                  <th
                    className="col-xs-4 groupMonsters"
                    data-toggle="tooltip"
                    title="Group Monsters"
                    onClick={() => this.props.toggleGroupingMonsters(true)}>
                    <FontAwesome
                      name="optin-monster"
                      size="2x"
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}

                    />
                  </th>

              }
              <th className="col-xs-3 textCenter" data-toggle="tooltip" title="Hit Points">
                <FontAwesome
                  name="heart"
                  size="2x"
                  style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                />
              </th>
              <th className="col-xs-2" data-toggle="tooltip" title="Armor Class">
                <FontAwesome
                  className="text-center"
                  name="shield"
                  size="2x"
                  style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                />
              </th>
              {/* this table head allows space for delete button */}
              <th className="col-xs-2" data-toggle="tooltip" title="Clear Combat"><ClearCombat /></th>
            </tr>
          </thead>
            {this.renderList()}
        </Table>
        <Rolls />
      </div>
    )
    // return <ListGroup>{this.renderList()}</ListGroup>;
  }
}

// anything in mapStateToProps will be this.props in the container above.
// this.props.CombatantList is the array of monster combatants
function mapStateToProps(state) {
  const { CombatantList, GroupMonsters } = state.monsters;
  return { CombatantList, GroupMonsters };
}

function mapDispatchToProps(dispatch) {
  // Whenever selectCombatant is called, the result should be passed to all
  // of our reducers
  return {
    // selectCombatant: monster => dispatch(actions.selectCombatant(monster)),
    changeCombatantHp: monster => dispatch(actions.changeCombatantHp(monster)),
    removeCombatant: monster => dispatch(actions.removeCombatant(monster)),
    toggleGroupingMonsters: payload => dispatch(actions.toggleGroupingMonsters(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CombatantList);
