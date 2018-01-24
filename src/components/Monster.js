import React, { Component } from "react";
import { connect } from "react-redux";
// import { selectCombatant } from "../actions/index";
import * as actions from "../actions/index";
import { bindActionCreators } from "redux";

function Monster(props) {
  const {monster = {}} = props
  return (
    <div>
      {monster.Name}
    </div>
  )
}

export default Monster
