import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions/index"
// import DamageInput from "../components/damage-input";
import Combatant from "../containers/Combatant"
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Table } from 'reactstrap';
import InitiativeRoll from './InitiativeRoll'
import ClearCombatant from './ClearCombatant'
import FontAwesome from 'react-fontawesome'


// import { selectCombatant } from '../actions/index';
// import { bindActionCreators} from 'redux';

// let CombatantListArr = []
class CombatantList extends Component {
  constructor(props) {
    super(props);
  }

// renders a list of Combatants
  renderList() {
    const {CombatantList = []} = this.props
    return CombatantList.map((combatant, index) => {
      return (
            <Combatant key={index} combatant={combatant} index={index}/>
      )
    });
  }
// if there are no combatants Do not render the list
  render() {
    if (!CombatantList) {
      return <div>Select a CombatantList to get started</div>;
    }
    // if there are combatants in Combatant list then render the list
    return (
        <Table hover striped className="CombatantList">
          <thead>
            <tr>
              <th className="col-xs-1"><InitiativeRoll /></th>
              <th className="col-xs-4">
                <FontAwesome
                  name="optin-monster"
                  size="2x"
                  style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                />
              </th>
              <th className="col-xs-3 textCenter">
                <FontAwesome
                  name="heart"
                  size="2x"
                  style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                />
              </th>
              <th className="col-xs-2">
                <FontAwesome
                  className="text-center"
                  name="shield"
                  size="2x"
                  style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                />
              </th>
              {/* this table head allows space for delete button */}
              <th className="col-xs-2"><ClearCombatant /></th>
            </tr>
          </thead>
          <tbody>
            {this.renderList()}
          </tbody>
        </Table>
    )
    // return <ListGroup>{this.renderList()}</ListGroup>;
  }
}

// anything in mapStateToProps will be this.props in the container above.
// this.props.CombatantList is the array of monster combatants
function mapStateToProps(state) {
  const {CombatantList} = state.monsters;
  return {CombatantList};
}

function mapDispatchToProps(dispatch) {
  // Whenever selectCombatant is called, the result should be passed to all
  // of our reducers
  return {
    // selectCombatant: monster => dispatch(actions.selectCombatant(monster)),
    changeCombatantHp: monster => dispatch(actions.changeCombatantHp(monster)),
    removeCombatant: monster => dispatch(actions.removeCombatant(monster))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CombatantList);
