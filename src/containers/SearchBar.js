import React from 'react';
import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index"
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    //
    // this.state = { term: '' };
  }
  render() {
     return (
       <InputGroup
         className="searchBar"
         >
       <Input
         className="searchBarInput"
         value={this.props.searchTerm}
         placeholder="Filter..."
         onChange={event => this.props.updateSearchTerm(event.target.value)} />
       </InputGroup>
     )
   }
}

function mapStateToProps(state) {
  const { searchTerm } = state.monsters;
  return { searchTerm };
}

function mapDispatchToProps(dispatch) {
  // Whenever selectCombatant is called, the result should be passed to all
  // of our reducers
  return {
    updateSearchTerm: searchTerm => {
      return dispatch(actions.filterLibrary(searchTerm))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
