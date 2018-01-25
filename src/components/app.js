import React from "react";
import { Component } from "react";

import MonsterList from "../containers/MonsterList";
import SearchBar from "../containers/SearchBar";
import MonsterDetail from "../containers/MonsterDetail";
import CombatantList from "../containers/CombatantList";
import Rolls from "../containers/Rolls";

export default class App extends Component {
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
