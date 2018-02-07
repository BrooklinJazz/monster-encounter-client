import React, {Component} from 'react'
import {Combat} from '../requests/combats'
import { connect } from "react-redux";
import * as actions from "../actions/index"
const BASE_URL = 'http://localhost:3000/api/v1'


class SaveFight extends Component {
  constructor(props) {
    super(props)
    this.state = {
        name: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getFights = this.getFights.bind(this);

  }

  handleChange(event) {
    this.setState({name: event.target.value});
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



  handleSubmit(event) {
    event.preventDefault()

    const newCombat = {
      name: this.state.name, fight:this.props.CombatantList, user_id:this.props.user.id
    }

    Combat
      .create(newCombat)
      .then(dataDoesNotMatter => {
        this.getFights()
      })
  }

  render() {
    return (
      <div>
        <h2>SaveFight</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit"/>
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(SaveFight);
