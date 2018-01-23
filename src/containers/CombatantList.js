import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions/index"
// import DamageInput from "../components/damage-input";
import Combatant from "../containers/Combatant"

// import { selectCombatant } from '../actions/index';
// import { bindActionCreators} from 'redux';

// let CombatantListArr = []
class CombatantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false
    };
    this._onButtonClick = this._onButtonClick.bind(this);
    this.focusTextInput = this.focusTextInput.bind(this);
  }



  renderList() {
    return this.props.CombatantList.map((monster, index) => {
      // define a current hp value to be modified later as the user inputs
      // monster.CurrentHp = monster.HP.Value
      // console.log(monster.CurrentHp);
      // console.log(monster);
      // currentHP is defined in monsters_reducer.js
      console.log('monster combatants state:', this.state);
      return (
        <div>
          <Combatant />
          <li key={index} onClick={() => this.props.selectCombatant(monster)} className="list-group-item">
            {monster.Name}
            <div>
              {
                this.state.showComponent
                ? <form onClick={(e) => e.stopPropagation()} onSubmit={(e) => {
                  e.preventDefault()
                  this.props.changeCombatantHp({monster, hpChange: this.state.hpChange, index: index})
                  this.setState({showComponent: false});
                }
              }>
              <input type="text" autoFocus name="hpChange" onChange={(e) => this.handleChange(e)}/>
            </form>
            : <div onClick={(e) => {
              this._onButtonClick(e)
              this.focusTextInput(this.textInput)
            }}>
            CURRENT HP: {monster.currentHp}
          </div>
        }
      </div>

      <div>
        MAX HP: {monster.HP.Value}
      </div>
      <div>
        AC: {monster.AC.Value}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          this.props.removeCombatant({monster, index: index})
        }
      }>Delete</button>

    </li>
  </div>
  )

}

);
}
//NOTE render only Combatant


// TODO put logic for changeCombatantHp in monster_reducer here.
// function used for handling changeCombatantHp with form input
handleChange(event) {
  const newState = Object.assign({}, this.state, {
    [event.target.name]: event.target.value
  });
  this.setState(newState)
}

focusTextInput(a) {
  // Explicitly focus the text input using the raw DOM API
  console.log('this', this);
  console.log('this.textInput', this.textInput);
  this.textInput.focus();
}

_onButtonClick(e) {
  e.stopPropagation()
  this.setState({showComponent: true});
}

render() {
  if (!this.props.CombatantList) {
    return <div>Select a CombatantList to get started</div>;
  }
  // CombatantListArr.push(this.props.CombatantList);
  // console.log(CombatantListArr);
  return <ul className="list-group col-sm-4">{this.renderList()}</ul>;
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
    selectCombatant: monster => dispatch(actions.selectCombatant(monster)),
    changeCombatantHp: monster => dispatch(actions.changeCombatantHp(monster)),
    removeCombatant: monster => dispatch(actions.removeCombatant(monster))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CombatantList);
