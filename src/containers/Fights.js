import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions/index"
import Moment from 'react-moment';
import { Table } from 'reactstrap';
import FontAwesome from 'react-fontawesome'

const BASE_URL = 'http://localhost:3000/api/v1'

class Fights extends Component {
  constructor(props) {
    super(props)

    this.getFights = this.getFights.bind(this);

    this.deleteFightSave = this.deleteFightSave.bind(this);
    this.loadSave = this.loadSave.bind(this);

  }

  componentWillMount() {
    this.getFights()
    console.log(this.props.fights);
  }
  componentDidMount() {
    console.log(this.props.fights);
  }

  // NOTE make this fetch request without a local function?
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

  loadSave(fightId) {
    this.getFightJSON(fightId)
    .then(() => this.props.history.push('/'))
  }

  getFightJSON(fightId) {
    const {user = []} = this.props
    return fetch(

      `${BASE_URL}/users/${user.id}/combats/${fightId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
    .then(res => res.json())
    .then(res => this.props.renderSavedCombat(res))
  }

  deleteFightSave(fightId) {
    const {user = []} = this.props
    fetch(
      `${BASE_URL}/users/${user.id}/combats/${fightId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
    // .then(res => console.log('hey'))
    .then(res => this.getFights())
    // .then(res => this.props.renderSavedCombat(res))
  }

  renderList() {
    return (
      this.props.fights
      // sort by created at from most recent to oldest
      .sort(function(a, b) {
        a = new Date(a.created_at);
        b = new Date(b.created_at);
        return a>b ? -1 : a<b ? 1 : 0;
      })
      // map over the fights array and create table body with their values
      .map((fight, index) => {
        return (
          <tr key={index}>
            <th className="col-xs-3" scope="row">
              {
                fight.name ? fight.name : 'Quick Save'
              }
            </th>
            <td className="col-xs-3">
              <Moment format="MMMM Do YYYY, h:mm:ss a">{fight.created_at}</Moment>
            </td>
            <td className="col-xs-3 textCenter">
              <FontAwesome
                onClick={() => this.loadSave(fight.id)}
                className="loadSave"
                name="play-circle"
                size="2x"
                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
              />
          </td>
          <td className="col-xs-3 textCenter">
            <FontAwesome
              onClick={() => this.deleteFightSave(fight.id)}
              className="deleteSave"
              name="trash"
              size="2x"
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
          </td>
        </tr>
      )
    })
  )
}

render() {

  if(this.props.fights.length === 0){
    return false //return false or a <Loader/> when you don't have anything in your message[]
  }

  return (
      <Table>
        <thead>
          <tr>
            <th className="col-xs-3">Name</th>
            <th className="col-xs-3">Date</th>
            <th className="col-xs-3 textCenter">Load</th>
            <th className="col-xs-3 textCenter">Delete</th>
          </tr>
        </thead>
        <tbody>
          {this.renderList()}
        </tbody>
      </Table>
  )
}
}
function mapStateToProps(state) {
  // Whatever is returned will show up as props inside of MonsterList
  // console.tron.log(state);
  const { CombatantList, fights} = state.monsters;
  return {
    CombatantList,
    fights
  };
}

// Anything returned from this function will end up as props
// on the MonsterList container
function mapDispatchToProps(dispatch) {
  return {
    renderSavedCombat: payload =>
    dispatch(actions.renderSavedCombat(payload)),
    updateFights: payload =>
    dispatch(actions.updateFights(payload)),
  };
}

// Promote MonsterList from a component to a container - it needs to know
// about this new dispatch method, selectCombatant. Make it available
// as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(Fights);
