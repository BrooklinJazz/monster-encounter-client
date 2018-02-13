import React, { Component } from "react";
import { connect } from "react-redux";
// import { selectCombatant } from "../actions/index";
// import Monster from "../components/Monster"
import * as actions from "../actions/index";
import { bindActionCreators } from "redux";
import { ListGroup, ListGroupItem } from 'reactstrap';
import SearchBar from './SearchBar';
import DeletePlayer from './DeletePlayer'
import FontAwesome from 'react-fontawesome'


class MonsterList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showComponent: "monsters",
      filterByChallenge: false,
    }
    this.showMonsters = this.showMonsters.bind(this);
    this.showPlayers = this.showPlayers.bind(this);
    this.toggleFilterByChallenge = this.toggleFilterByChallenge.bind(this);
  }

  showPlayers() {
    const { showComponent } = this.state
    this.setState({showComponent: "players"})
  }

  toggleFilterByChallenge() {
    const { filterByChallenge } = this.state
    if (filterByChallenge) {
      this.setState({filterByChallenge: false})
    } else {
      this.setState({filterByChallenge: true})
    }
  }

  showMonsters() {
    const {showComponent} = this.state
    this.setState({showComponent: "monsters"})
  }

  renderList() {
    // TODO refactor this.props with ES6 syntax
    const { showComponent, filterByChallenge } = this.state
    const { user } = this.props
    const {
      monsters = [],
    } = this.props
    if (showComponent === "monsters") {
      if (filterByChallenge) {
        return monsters
        .filter(monster =>
          monster.Name.toLowerCase().includes(this.props.searchTerm.toLowerCase())
        )
        // sort the array of monsters
        .sort(function (a, b) {
          return parseInt(b.Challenge) - parseInt(a.Challenge)
        })
        .map(monster => {
          return (
            <ListGroupItem
              key={monster.Name}
              onClick={() => this.props.addMonsterToCombatants(monster)}
              className="monsterListGroupItem"
              >
                {monster.Name}
              </ListGroupItem>
            );
          })
      } else {
        return monsters
        .filter(monster =>
          monster.Name.toLowerCase().includes(this.props.searchTerm.toLowerCase())
        )
        // sort the array of monsters
        .map(monster => {
          return (
            <ListGroupItem
              key={monster.Name}
              onClick={() => this.props.addMonsterToCombatants(monster)}
              className="monsterListGroupItem"
              >
                {monster.Name}
              </ListGroupItem>
            );
          })
      }
    } else if ( showComponent === "players") {
      const {
        players = [],
      } = this.props
      return players
      .filter(player => player.stats.Name.toLowerCase().includes(this.props.searchTerm.toLowerCase()))
      // .sort(function (a, b) {
      //   if (true) {
      //
      //   } else {
      //     return parseInt(b.Challenge) - parseInt(a.Challenge)
      //   }
      // })
      .map(player => {
        const {stats} = player
        return (
            <ListGroupItem
              key={player.id}
              onClick={() => this.props.addMonsterToCombatants(stats)}
              className="monsterListGroupItem player"
              >
                {stats.Name}
                <DeletePlayer id={player.id} user={user} />
              </ListGroupItem>
          );
        })
    }
    }

    render() {
      return (
        <div className="monsterList innerShadow">
          <h2>Library</h2>
          <FontAwesome
            onClick={() => this.showMonsters()}
            name='optin-monster'
            className="libraryIcon"
            data-toggle="tooltip"
            title="Show Monsters"
            size='2x'
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
          />
          <FontAwesome
            onClick={() => this.showPlayers()}
            name='users'
            className="libraryIcon"
            data-toggle="tooltip"
            title="Show Players"
            size='2x'
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
          />
          {/* <button onClick={() => this.toggleFilterByChallenge()}>Challenge</button> */}
          <SearchBar/>
          <ListGroup className="monsterListGroup">{this.renderList()}</ListGroup>
        </div>
      )
    }
  }
  function mapStateToProps(state) {
    // Whatever is returned will show up as props inside of MonsterList
    // console.tron.log(state);
    const { monsters, searchTerm, players } = state.monsters;
    return {
      monsters,
      searchTerm,
      players
    };
  }

  // Anything returned from this function will end up as props
  // on the MonsterList container
  function mapDispatchToProps(dispatch) {
    // Whenever selectCombatant is called, the result should be passed to all
    // of our reducers
    return {
      addMonsterToCombatants: monster =>
      dispatch(actions.addMonsterToCombatants(monster)),
    };
  }

  // Promote MonsterList from a component to a container - it needs to know
  // about this new dispatch method, selectCombatant. Make it available
  // as a prop.
  export default connect(mapStateToProps, mapDispatchToProps)(MonsterList);
