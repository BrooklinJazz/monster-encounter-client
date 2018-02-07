import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions/index"
import Moment from 'react-moment';

const BASE_URL = 'http://localhost:3000/api/v1'

class Fights extends Component {
  constructor(props) {
    super(props)

    this.getFights = this.getFights.bind(this);

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
    console.log('GET FIGHTS CALLED');
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

    if(this.props.fights.length === 0){
      return false //return false or a <Loader/> when you don't have anything in your message[]
    }

    return (
      <div>
        <h1>Fights</h1>
          {this.props.fights.map(fight => {
            return (
              <div>
                <button
                  onClick={() => this.getFightJSON(fight.id)}
                  >
                    {
                      fight.name ? fight.name :<div>Save File: <Moment format="MMMM Do YYYY, h:mm:ss a">{fight.created_at}</Moment></div>
                    }
                  </button>
                  <button
                    onClick={this.getFights}
                    >
                      GetFights
                    </button>
              </div>
            )
          })}
      </div>
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
