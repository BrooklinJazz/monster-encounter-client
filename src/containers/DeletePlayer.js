import React, {Component} from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/index";
import FontAwesome from 'react-fontawesome'
const BASE_URL = 'http://localhost:3000/api/v1'

class DeletePlayer extends Component {
  constructor(props) {
    super(props)
    // this.getPlayers = this.getPlayers.bind(this);
  }
  deletePlayer(e) {
    e.stopPropagation()
    const {id, user} = this.props
    fetch(
      `${BASE_URL}/users/${user.id}/players/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
    .then(res => this.getPlayers())
  }

  getPlayers() {
    const {user} = this.props

    fetch(
      `${BASE_URL}/users/${user.id}/players`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
    .then(res => res.json())
    .then(res => this.props.fetchPlayers(res))
  }

  render() {
    return (
      <FontAwesome
        onClick={(e) => this.deletePlayer(e)}
        className="deletePlayer"
        name='trash'
        size='2x'
        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
      />
    )
  }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props inside of MonsterList
  // console.tron.log(state);
  return {
  };
}

// Anything returned from this function will end up as props
// on the MonsterList container
function mapDispatchToProps(dispatch) {
  return {
    fetchPlayers: payload =>
    dispatch(actions.fetchPlayers(payload))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeletePlayer);
