import React from 'react';
import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index"


class SearchBar extends Component {
  constructor(props) {
    super(props);
    //
    // this.state = { term: '' };
  }
  render() {
     return (
       <div>
       <input
         value={this.props.searchTerm}
         onChange={event => this.props.updateSearchTerm(event.target.value)} />
       </div>
     )
   }
}

function mapStateToProps(state) {
  const { searchTerm } = state.monsters;
  return { searchTerm };
}

function mapDispatchToProps(dispatch) {
  // Whenever SelectMonster is called, the result should be passed to all
  // of our reducers
  return {
    updateSearchTerm: searchTerm => {
      return dispatch(actions.filterMonsterLibrary(searchTerm))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
