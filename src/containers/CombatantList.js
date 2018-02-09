import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions/index"
// import DamageInput from "../components/damage-input";
import Combatant from "../containers/Combatant"
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Table } from 'reactstrap';

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
      <div>
        <Table>
          <thead>
            <tr>
              <th>Initiative</th>
              <th>Combatant</th>
              <th>Health</th>
              <th>AC</th>
              <th>Delete</th>
            </tr>
          </thead>
          {this.renderList()}
        </Table>

      </div>
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
