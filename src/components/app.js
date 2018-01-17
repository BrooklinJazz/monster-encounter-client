import React from "react";
import { Component } from "react";

import MonsterList from "../containers/monster-list";
import SearchBar from "../containers/search-bar";
import MonsterDetail from "../containers/monster-detail";
import MonsterCombatants from "../containers/monster-combatants";

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
