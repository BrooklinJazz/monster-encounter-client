import React from "react";
import { Component } from "react";
import * as actions from "../actions/index";
import { connect } from "react-redux";

import MonsterList from "../containers/MonsterList";
import SearchBar from "../containers/SearchBar";
import MonsterDetail from "../containers/MonsterDetail";
import CombatantList from "../containers/CombatantList";
import Rolls from "../containers/Rolls";
import NotFoundPage from './NotFoundPage';
import ClearCombatant from '../containers/ClearCombatant'
import NavBar from './NavBar'
import CombatantModeList from '../containers/CombatantModeList'
import ClearRolls from '../containers/ClearRolls'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// const testUrl = 'http://www.dnd5eapi.co/api/monsters/1'
const serverUrl = 'http://localhost:3002'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    fetch(
      serverUrl,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
    .then(res => res.json())
    .then(res => this.props.fetchMonsters(res))
  }

  render() {
    return (
      <Router >
        <div className="App">
          <NavBar/>
          <Switch>
            <Route exact path="/">
            <div className="row">
              <div className="col-sm-4">
                <SearchBar/>
                <MonsterList/>
              </div>
              <div className="col-sm-4">
                <CombatantList/>
                <Rolls />
              </div>
              <div className="col-sm-4">
                <MonsterDetail
                />
              </div>
            </div>
          </Route>
          <Route path="/combat">
          <div className="row">
            <div className="col-sm-8">
              <CombatantModeList />
            </div>
            <div className="col-sm-4">
              <MonsterDetail />
            </div>
          </div>
        </Route>
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  </Router>
);
}
}
function mapStateToProps(state) {
  // Whatever is returned will show up as props inside of MonsterList
  // console.tron.log(state);
  const { monsters, searchTerm } = state.monsters;
  return {
    monsters
  };
}

// Anything returned from this function will end up as props
// on the MonsterList container
function mapDispatchToProps(dispatch) {
  return {
    fetchMonsters: monsters =>
    dispatch(actions.fetchMonsters(monsters)),
  };
}

// Promote MonsterList from a component to a container - it needs to know
// about this new dispatch method, selectCombatant. Make it available
// as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(App);
