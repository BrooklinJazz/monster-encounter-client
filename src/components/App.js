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
import Navigation from './Navigation'
import CombatantModeList from '../containers/CombatantModeList'
import ClearRolls from '../containers/ClearRolls'

import SignUpPage from '../containers/SignUpPage'
import SavePage from './pages/SavePage'
import CombatPage from './pages/CombatPage'
import {AuthRoute} from './AuthRoute';
import HomePage from './pages/HomePage';
import NewPlayer from './pages/NewPlayer'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import {Token} from '../requests/tokens';
import jwtDecode from 'jwt-decode';
import SignInPage from '../containers/SignInPage'
import Fights from '../containers/Fights'
import SaveFight from '../containers/SaveFight'

const serverUrl = 'http://localhost:3000/api/v1/monsters'
const BASE_URL = 'http://localhost:3000/api/v1'

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

  isAuth () {
    return !!this.state.user
  }

  componentDidMount() {
    // get monster data for MonsterList
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

    const {user = []} = this.state
    this.props.fetchPlayers()
    fetch(
      `${BASE_URL}/users/${user.id}/players`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
    .then(res => res.json())
    .then(res => this.props.fetchPlayers(res))
  }

  componentWillMount () {
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
          <Navigation
            user={user}
            onSignOutClick={this.signOut}
          />
          <Switch>
            <Route path="/sign_in" render={props => {
              return <SignInPage {...props} user={user} onSignIn={this.signIn} />
            }} />
            <Route path="/sign_up" render={props => {
              return <SignUpPage {...props} user={user} onSignIn={this.signIn}/>
            }} />
            <AuthRoute
              isAuthenticated={this.isAuth()}
              path="/"
              exact
              component={HomePage}
            />
            <Route path="/saves" render={props => {
              return (
                <AuthRoute
                  history={props.history}
                  isAuthenticated={this.isAuth()}
                  path="/saves"
                  user={user}
                  component={SavePage}/>
                )
              }} />
              <Route path="/new_player" render={props => {
                return (
                  <AuthRoute
                    history={props.history}
                    isAuthenticated={this.isAuth()}
                    path="/new_player"
                    user={user}
                    component={NewPlayer}/>
                  )
                }} />
                <AuthRoute
                  isAuthenticated={this.isAuth()}
                  path="/combat"
                  component={CombatPage}
                />
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
        fetchPlayers: payload =>
        dispatch(actions.fetchPlayers(payload))
      };
    }

    // Promote MonsterList from a component to a container - it needs to know
    // about this new dispatch method, selectCombatant. Make it available
    // as a prop.
    export default connect(mapStateToProps, mapDispatchToProps)(App);
