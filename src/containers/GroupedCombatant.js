import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index"
import FontAwesome from 'react-fontawesome'
import ClickOutHandler from 'react-onclickout'
class Combatant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDamageInput: false,
            showInitiativeInput: false
        };
        this._onDamageSelectClick = this._onDamageSelectClick.bind(this);
        this._onInitiativeSelectClick = this._onInitiativeSelectClick.bind(this);
        this.onClickOutDamageInput = this.onClickOutDamageInput.bind(this);
        this.onClickOutInitiativeInput = this.onClickOutInitiativeInput.bind(this);
        // expected that I would need to bind function, but do not seem to.
        // this._DamageFormSubmit = this._DamageFormSubmit.bind(this);
    }

    onClickOutDamageInput(e) {
        this.setState({ showDamageInput: false });
    }

    onClickOutInitiativeInput(e) {
        this.setState({ showInitiativeInput: false });
    }

    render() {

        const { combatant = {}, index } = this.props;

        return (
            <tr className="Combatant"
                onClick={() => this.props.selectCombatant(combatant)}>
                <th
                    className="col-xs-1"
                    scope="row">

                </th>
                <td className="col-xs-4">
                    {combatant.Name}
                </td>
                <td
                    className="col-xs-3 textCenter">
                    {
                        this.state.showDamageInput
                            ?
                            <form
                                onClick={(e) => e.stopPropagation()}
                                onSubmit={(e) => this._DamageFormSubmit(e)}>
                                <ClickOutHandler onClickOut={this.onClickOutDamageInput}>
                                    <input
                                        className="combatantDamageInput"
                                        type="number"
                                        autoFocus
                                        name="hpChange"
                                        onChange={(e) => this._handleChange(e)} />
                                </ClickOutHandler>
                            </form>
                            :
                            <div
                                className="combatantDamageSelect"
                                onClick={this._onDamageSelectClick}
                                data-toggle="tooltip"
                                title="Change Combatant HP">
                                {combatant.currentHp}/{combatant.HP.Value}
                            </div>
                    }
                </td>
                <td
                    className="col-xs-2">
                    {combatant.AC.Value}
                </td>
                <td className="col-xs-2">
                    <FontAwesome
                        // onClick={() => this.props.clearCombatants()}
                        className="clearCombatant"
                        name='minus-circle'
                        size='2x'
                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                        onClick={(e) => {
                            e.stopPropagation();
                            this.props.removeCombatant({ combatant, index: index, fromGrouped: true })
                        }
                        }
                    />
                </td>
            </tr>
        )
    }

    _onDamageSelectClick(e) {
        e.stopPropagation()
        this.setState({ showDamageInput: true });
    }
    _onInitiativeSelectClick(e) {
        e.stopPropagation()
        this.setState({ showInitiativeInput: true });
    }

    _handleChange(e) {
        // creates this.state.hpChange for use in _DamageFormSubmit
        const newState = Object.assign({}, this.state, {
            [e.target.name]: e.target.value
        });
        this.setState(newState)
    }

    _DamageFormSubmit(e) {
        e.preventDefault();
        const { combatant = {}, index } = this.props;
        const { hpChange } = this.state
        this.props.changeCombatantHp({ combatant, hpChange, index, fromGrouped: true })
        this.setState({ showDamageInput: false });
    }
    _InitiativeFormSubmit(e) {
        e.preventDefault();
        const { combatant = {}, index } = this.props;
        const { initiativeChange } = this.state
        this.props.changeCombatantInitiative({ combatant, initiativeChange, index })
        this.setState({ showInitiativeInput: false });
    }
}



function mapStateToProps(state) {
    const { selectedMonster } = state.monsters;
    return { selectedMonster };
}

function mapDispatchToProps(dispatch) {
    // Whenever selectCombatant is called, the result should be passed to all
    // of our reducers
    return {
        selectCombatant: combatant =>
            dispatch(actions.selectCombatant(combatant)),

        changeCombatantHp: combatant =>
            dispatch(actions.changeCombatantHp(combatant)),

        changeCombatantInitiative: combatant =>
            dispatch(actions.changeCombatantInitiative(combatant)),

        removeCombatant: combatant =>
            dispatch(actions.removeCombatant(combatant))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Combatant);
