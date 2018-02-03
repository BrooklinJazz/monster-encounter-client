import React from "react";
import { Component } from "react";
import * as actions from "../actions/index";
import { connect } from "react-redux";

import MonsterList from "../containers/MonsterList";
import SearchBar from "../containers/SearchBar";
import MonsterDetail from "../containers/MonsterDetail";
import CombatantList from "../containers/CombatantList";
import Rolls from "../containers/Rolls";
import NotFoundPage from './NotFoundPage';
import ClearCombatant from '../containers/ClearCombatant'
import NavBar from './NavBar'
import CombatantModeList from '../containers/CombatantModeList'
import ClearRolls from '../containers/ClearRolls'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import {Token} from '../requests/tokens';
import jwtDecode from 'jwt-decode';
import SignInPage from '../containers/SignInPage'

// const testUrl = 'http://www.dnd5eapi.co/api/monsters/1'
const serverUrl = 'http://localhost:3000/api/v1/monsters'

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      user: null,
      loading: true
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  signOut () {
    localStorage.removeItem('jwt');
    this.setState({user: null});
  }

  signIn () {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const payload = jwtDecode(jwt);
      this.setState({user: payload, loading: false});
    } else {
      this.setState({loading: false});
    }
  }

  componentWillMount() {
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
    .then(res => this.props.fetchMonsters(res))
  }
  componentDidMount () {
    this.signIn();
  }

  render() {
    const {user, loading} = this.state;

    if (loading) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    return (
      <Router >
        <div className="App">
          <NavBar
            user={user}
            onSignOutClick={this.signOut}
          />
          <Switch>
            <Route path="/sign_in" render={props => {
              return <SignInPage {...props} onSignIn={this.signIn} />
            }} />
            <Route exact path="/">
            <div className="row">
              <div className="col-sm-4">
                <SearchBar/>
                <MonsterList/>
              </div>
              <div className="col-sm-4">
                <CombatantList/>
                <Rolls />
              </div>
              <div className="col-sm-4">
                <MonsterDetail
                />
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
    </div>
  </Router>
);
}
}
function mapStateToProps(state) {
  // Whatever is returned will show up as props inside of MonsterList
  // console.tron.log(state);
  const { monsters, searchTerm } = state.monsters;
  return {
    monsters
  };
}

// Anything returned from this function will end up as props
// on the MonsterList container
function mapDispatchToProps(dispatch) {
  return {
    fetchMonsters: monsters =>
    dispatch(actions.fetchMonsters(monsters)),
  };
}

// Promote MonsterList from a component to a container - it needs to know
// about this new dispatch method, selectCombatant. Make it available
// as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(App);
