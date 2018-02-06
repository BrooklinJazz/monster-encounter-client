import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions/index"

const BASE_URL = 'http://localhost:3000/api/v1'

class Fights extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fights: []
    }
  }

  componentWillMount() {
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
    // .then(res => console.log(res))
    .then(res => this.setState({fights: res}))
  }

  getFightJSON(fightId) {
    const {user = []} = this.props
    fetch(
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

  render() {

    if(this.state.fights.length === 0){
      return false //return false or a <Loader/> when you don't have anything in your message[]
    }

    return (
      <div>
        <h1>Fights</h1>
          {this.state.fights.map(fight => {
            return (
              <button
                onClick={() => this.getFightJSON(fight.id)}
                >
                {fight.name}
              </button>
            )
          })}
      </div>
    )
  }
}
function mapStateToProps(state) {
  // Whatever is returned will show up as props inside of MonsterList
  // console.tron.log(state);
  const { CombatantList} = state.monsters;
  return {
    CombatantList
  };
}

// Anything returned from this function will end up as props
// on the MonsterList container
function mapDispatchToProps(dispatch) {
  return {
    renderSavedCombat: payload =>
    dispatch(actions.renderSavedCombat(payload)),
  };
}

// Promote MonsterList from a component to a container - it needs to know
// about this new dispatch method, selectCombatant. Make it available
// as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(Fights);
