import React from "react";
import { Component } from "react";

import MonsterList from "../containers/MonsterList";
import SearchBar from "../containers/SearchBar";
import MonsterDetail from "../containers/MonsterDetail";
import CombatantList from "../containers/CombatantList";
import Rolls from "../containers/Rolls";

const testUrl = 'http://www.dnd5eapi.co/api/monsters/1'
const serverUrl = 'http://localhost:3002'

export default class App extends Component {
  state = {monsterArray: []}

  componentDidMount() {
    // TODO set monsters redux state as response
    // console.log('App Component Did Mount');
    // console.log('http://dnd5eapi.co/api/monsters/');
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
    // .then(res => console.log(res)) // this will bug
    .then(res => this.setState({ monsterArray: res }))
  }

  render() {
    return (
        <div className="row">
          <div className="col-sm-4">
            <SearchBar />
            <MonsterList />
          </div>
          <div className="col-sm-4">
            <CombatantList />
            <Rolls />
          </div>
          <div className="col-sm-4">
            <MonsterDetail />
          </div>
        </div>
    );
  }
}
