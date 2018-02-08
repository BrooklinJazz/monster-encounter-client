import React, {Component} from "react";
import {connect} from "react-redux";
import Stat from '../components/Stat';
import RollableListing from '../components/RollableListing';
import Power from '../components/Power'
import PropertyLine from '../components/PropertyLine'
import SvgLine from '../components/SvgLine'
import PropertyListing from '../components/PropertyListing'
import OrangeBar from '../components/OrangeBar'

class MonsterDetail extends Component {
	constructor(props) {
		super(props)
		// this.renderSaves = this.renderSaves.bind(this)
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
		console.log('Traits', Traits, Traits.length);
		console.log('Actions', Actions, Actions.length);
		console.log('LegendaryActions', LegendaryActions, LegendaryActions.length);
		return (
			<div className="MonsterDetail">

				<OrangeBar />

				<div className="creature-heading">
					<h3><strong>{Name}</strong></h3>
					<div>{Type}</div>
				</div>



				<SvgLine />

				<PropertyLine Name="Armor Class" Value={HP.Value} Notes={HP.Notes} />
				<PropertyLine Name="Hit Points" Value={HP.Value} Notes={HP.Notes} />
				<PropertyLine Name="Speed" Value={Speed} />

				<SvgLine />

				<div className="abilities">
					<Stat Name="STR" Value={Str} />
					<Stat Name="DEX" Value={Dex} />
					<Stat Name="CON" Value={Con} />
					<Stat Name="INT" Value={Int} />
					<Stat Name="WIS" Value={Wis} />
					<Stat Name="CHA" Value={Cha} />
				</div>

				<SvgLine />

				{
					Saves.length > 0 ?
					<div className="Saves">
						<RollableListing Title="Saves" ArrOfObj={Saves}/>
					</div>
					:
					<div></div>
				}

				{
					Skills.length > 0 ?
					<div className="Skills">
						<RollableListing Title="Skills" ArrOfObj={Skills}/>
					</div>
					:
					<div></div>
				}

				{
					DamageImmunities.length > 0 ?
					<PropertyListing Name="Damage Immunities" Value={DamageImmunities} />
					:
					<div></div>
				}
				{
					ConditionImmunities.length > 0 ?
					<PropertyListing Name="Condition Immunities" Value={ConditionImmunities} />
					:
					<div></div>
				}
				{
					Senses.length > 0 ?
					<PropertyListing Name="Senses" Value={Senses} />
					:
					<div></div>
				}
				{
					Languages.length > 0 ?
					<PropertyListing Name="Languages" Value={Languages} />
					:
					<div></div>
				}
				{/* TODO show xp given for challenge */}
				<PropertyListing Name="Challenge" Value={Challenge} />

				<SvgLine />

				{/* Only render these when they have value */}
				{
					Traits.length > 0 ?
					<Power ArrOfObj={Traits} />
					:
					<div></div>
				}

				{
					Actions.length > 0 ?
					<Power Title="Actions" ArrOfObj={Actions} />
					:
					<div></div>
				}

				{
					LegendaryActions.length > 0 ?
					<Power Title="LegendaryActions" ArrOfObj={LegendaryActions} />
					:
					<div></div>
				}
				<OrangeBar />
			</div>
		);
	}

}

function mapStateToProps(state) {
	const {selectedMonster: monster} = state.monsters;
	return {monster};
}

export default connect(mapStateToProps)(MonsterDetail);
