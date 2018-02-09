import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions/index"
import FontAwesome from 'react-fontawesome'
import ClickOutHandler from 'react-onclickout'
class Combatant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false
    };
    this._onButtonClick = this._onButtonClick.bind(this);
    this.onClickOut = this.onClickOut.bind(this);
    // expected that I would need to bind function, but do not seem to.
    // this._handleSubmit = this._handleSubmit.bind(this);
  }

  onClickOut(e) {
    this.setState({showComponent: false});
  }

  render() {

    const {combatant = {}, index} = this.props;

    return (
      <tr
        onClick={() => this.props.selectCombatant(combatant)}>
        <th
          className="col-xs-1"
          scope="row">{combatant.InitiativeRoll || '#'}</th>
          <td className="col-xs-4">
            {combatant.Name}
          </td>
          <td
            className="col-xs-3 textCenter">
            {
              this.state.showComponent
              ?
              <form
                onClick={(e) => e.stopPropagation()}
                onSubmit={(e) => this._handleSubmit(e)}>
                <ClickOutHandler onClickOut={this.onClickOut}>
                  <input
                    type="number"
                    autoFocus
                    name="hpChange"
                    onChange={(e) => this._handleChange(e)}/>
                  </ClickOutHandler>
                </form>
                :
                <div onClick={this._onButtonClick}> {combatant.currentHp}/{combatant.HP.Value}
              </div>
            }
          </td>
          <td
            className="col-xs-2">
            {combatant.AC.Value}
          </td>
          <td className="col-xs-2">
            <FontAwesome
              onClick={() => this.props.clearCombatants()}
              className="clearCombatant"
              name='minus-circle'
              size='2x'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
              onClick={ (e) => {
                e.stopPropagation();
                this.props.removeCombatant({combatant, index: index})
              }
            }
          />
        </td>
      </tr>
    )
  }

  _onButtonClick(e) {
    e.stopPropagation()
    this.setState({showComponent: true});
  }

  _handleChange(e) {
    // creates this.state.hpChange for use in _handleSubmit
    const newState = Object.assign({}, this.state, {
      [e.target.name]: e.target.value
    });
    this.setState(newState)
  }

  _handleSubmit(e) {
    e.preventDefault();
    const {combatant = {}, index} = this.props;
    const {hpChange} = this.state
    this.props.changeCombatantHp({combatant, hpChange, index})
    this.setState({showComponent: false});
  }
}



function mapStateToProps(state) {
  const {selectedMonster} = state.monsters;
  return {selectedMonster};
}

function mapDispatchToProps(dispatch) {
  // Whenever selectCombatant is called, the result should be passed to all
  // of our reducers
  return {
    selectCombatant: combatant => dispatch(actions.selectCombatant(combatant)),
    changeCombatantHp: combatant => dispatch(actions.changeCombatantHp(combatant)),
    removeCombatant: combatant => dispatch(actions.removeCombatant(combatant))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Combatant);
