import React from "react";
import { Component } from "react";

import MonsterList from "../containers/MonsterList";
import SearchBar from "../containers/SearchBar";
import MonsterDetail from "../containers/MonsterDetail";
import MonsterCombatants from "../containers/MonsterCombatants";

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <MonsterList />
        <MonsterDetail />
        <MonsterCombatants />
      </div>
    );
  }
}
