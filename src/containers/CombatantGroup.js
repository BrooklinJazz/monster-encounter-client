import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index"
import FontAwesome from 'react-fontawesome'
import ClickOutHandler from 'react-onclickout'

import GroupedCombatant from './GroupedCombatant';

class CombatantGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInitiativeInput: false
        };
        this._onInitiativeSelectClick = this._onInitiativeSelectClick.bind(this);
        this.onClickOutInitiativeInput = this.onClickOutInitiativeInput.bind(this);
        // expected that I would need to bind function, but do not seem to.
        // this._DamageFormSubmit = this._DamageFormSubmit.bind(this);
    }

    onClickOutInitiativeInput(e) {
        this.setState({ showInitiativeInput: false });
    }

    render() {
        const { parentObj, index } = this.props
        const { Combatants, InitiativeRoll } = parentObj
        return (
            <tbody>
                <td className="groupMonsterBumper"></td>
                <tr>
                    <th
                        className="col-xs-1"
                        scope="row">
                        {
                            this.state.showInitiativeInput
                                ?
                                <form
                                    onClick={(e) => e.stopPropagation()}
                                    onSubmit={(e) => this._InitiativeFormSubmit(e)}>
                                    <ClickOutHandler onClickOut={this.onClickOutInitiativeInput}>
                                        <input
                                            className="combatantInitiativeInput"
                                            type="number"
                                            autoFocus
                                            name="initiativeChange"
                                            onChange={(e) => this._handleChange(e)} />
                                    </ClickOutHandler>
                                </form>
                                :
                                <div
                                    className="combatantInitiativeSelect"
                                    onClick={this._onInitiativeSelectClick}
                                    data-toggle="tooltip"
                                    title="Change Combatant Initiative">
                                    {
                                        InitiativeRoll
                                    }
                                </div>
                        }
                    </th>
                    <th
                        className="col-xs-9">
                        Monsters
                    </th>
                    <th className="col-xs-2">
                        <FontAwesome
                            // onClick={() => this.props.clearCombatants()}
                            className="clearCombatantGroup"
                            name='minus-circle'
                            size='2x'
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                            onClick={(e) => {
                                e.stopPropagation();
                                this.props.removeCombatant({ combatant: parentObj, index: index })
                                this.props.toggleGroupingMonsters(false)
                            }
                            }
                        />
                    </th>

                </tr>
                {Combatants.map((combatant, index) => (
                    <GroupedCombatant key={index} combatant={combatant} index={index} />
                ))}
                <td className="groupMonsterBumper"></td>
            </tbody>
        )
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

    _InitiativeFormSubmit(e) {
        e.preventDefault();
        const { index } = this.props
        const { initiativeChange } = this.state
        this.props.changeCombatantInitiative({ combatant: this.props.parentObj, initiativeChange, index })
        this.setState({ showInitiativeInput: false });
    }
}

function mapStateToProps(state) {
    // must watch CombatantList to know when to re-render itself if a monster is added to the group
    const { CombatantList } = state.monsters;
    return { CombatantList };
}

function mapDispatchToProps(dispatch) {
    // Whenever selectCombatant is called, the result should be passed to all
    // of our reducers
    return {
        changeCombatantInitiative: combatant =>
            dispatch(actions.changeCombatantInitiative(combatant)),
        removeCombatant: combatant =>
            dispatch(actions.removeCombatant(combatant)),
        toggleGroupingMonsters: payload => dispatch(actions.toggleGroupingMonsters(payload)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CombatantGroup);
