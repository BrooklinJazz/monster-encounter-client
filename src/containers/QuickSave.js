import React, {Component} from 'react'
import {Combat} from '../requests/combats'
import { connect } from "react-redux";
import * as actions from "../actions/index"
const BASE_URL = 'http://localhost:3000/api/v1'

class QuickSave extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);
    this.getFights = this.getFights.bind(this);
  }

  getFights() {
    const {user = []} = this.props
    fetch(
      `${BASE_URL}/users/${user.id}/combats`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
    .then(res => res.json())
    .then(res => this.props.updateFights(res))
  }


  handleClick(event) {
    event.preventDefault()
    if (this.props.CombatantList.length === 0) {
      alert('add some combatants before saving!')
    } else {

      const newCombat = {
        name: '', fight:this.props.CombatantList, user_id:this.props.user.id
      }

      Combat
      .create(newCombat)
      .then(dataDoesNotMatter => {
        this.getFights()
      })
    }
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        Quick Save
      </div>
    )
  }
}

function mapStateToProps(state) {
  // file has access to this.props.CombatantList
  const { CombatantList } = state.monsters;
  return {
    CombatantList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateFights: payload =>
    dispatch(actions.updateFights(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickSave);
