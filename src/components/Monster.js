import React from "react";
// import { connect } from "react-redux";
// import { selectCombatant } from "../actions/index";
// import * as actions from "../actions/index";
// import { bindActionCreators } from "redux";
import {ListGroup, ListGroupItem} from 'reactstrap'

function Monster(props) {
  const {monster = {}} = props
  return (
    <ListGroupItem>
      {monster.Name}
    </ListGroupItem>
  )
}

export default Monster
