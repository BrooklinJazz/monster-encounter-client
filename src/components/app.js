import React from "react";
import { Component } from "react";

import MonsterList from "../containers/MonsterList";
import SearchBar from "../containers/SearchBar";
import MonsterDetail from "../containers/MonsterDetail";
import CombatantList from "../containers/CombatantList";

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <MonsterList />
        <MonsterDetail />
        <CombatantList />
      </div>
    );
  }
}
