import React from "react";
import { Component } from "react";

import MonsterList from "../containers/MonsterList";
import SearchBar from "../containers/SearchBar";
import MonsterDetail from "../containers/MonsterDetail";
import CombatantList from "../containers/CombatantList";
import Rolls from "../containers/Rolls";
import NotFoundPage from './NotFoundPage';
import ClearCombatant from '../containers/ClearCombatant'
import CombatantModeList from '../containers/CombatantModeList'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// const testUrl = 'http://www.dnd5eapi.co/api/monsters/1'
const serverUrl = 'http://localhost:3002'

export default class App extends Component {
  state = {monsterArray: []}

  componentDidMount() {
    // TODO set monsters redux state as response
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
    .then(res => this.setState({ monsterArray: res }))
  }

  render() {
    return (
      <Router >
        <Switch>
          <Route exact path="/">
          <div className="row">
            <div className="col-sm-4">
              <SearchBar />
              <MonsterList />
            </div>
            <div className="col-sm-4">
              <ClearCombatant />
              <CombatantList />
              <Rolls />
            </div>
            <div className="col-sm-4">
              <MonsterDetail />
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
    </Router>
  );
}
}
