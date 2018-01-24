import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions/index"

class Combatant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false
    };
    this._onButtonClick = this._onButtonClick.bind(this);
    // this.focusTextInput = this.focusTextInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {

    const {combatant = {}, index} = this.props;
    console.log("combatant >>>> ", combatant);

    return (
      <div
        onClick={() => this.props.selectCombatant(combatant)}
        >
          <p>{combatant.Name}</p>
          {
            this.state.showComponent ?
            <form
              onClick={(e) => e.stopPropagation()}
              onSubmit={(e) => this.handleSubmit(e)
              }
              >
                <input type="number" autoFocus name="hpChange"
                  onChange={(e) => this.handleChange(e)}
                />
              </form>
              :
              <p onClick={this._onButtonClick}>Current: {combatant.currentHp}</p>
            }
            <p>Max: {combatant.HP.Value}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                this.props.removeCombatant({combatant, index: index})
              }
            }>Delete</button>
          </div>
        )
      }

      _onButtonClick(e) {
        e.stopPropagation()
        this.setState({showComponent: true});
      }

      handleChange(e) {
        // creates this.state.hpChange for use in handleSubmit
        const newState = Object.assign({}, this.state, {
          [e.target.name]: e.target.value
        });
        this.setState(newState)
      }

      handleSubmit(e) {
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
