import React, {Component} from 'react'
import {Combat} from '../../requests/combats'
import { connect } from "react-redux";
import * as actions from "../../actions/index"
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button, Form, FormGroup, Label, FormText } from 'reactstrap';

const BASE_URL = 'http://localhost:3000/api/v1'

class NewPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Name: '',
      AC: 0,
      HP: 0,
      Str: 10,
      Dex: 10,
      Con: 10,
      Int: 10,
      Wis: 10,
      Cha: 10
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.getFights = this.getFights.bind(this);

  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }


  getPlayers() {
    const {user} = this.props

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


  handleSubmit(event) {

    const { Name, AC, HP, Str, Dex, Con, Int, Wis, Cha} = this.state
    if (Name.length === 0 || AC.length === 0 || HP.length === 0) {
      alert('You must fill in Name, Hit Points, and Armor Class')
    } else {
      function getJwt () {
        return `JWT ${localStorage.getItem('jwt')}`;
      }
      event.preventDefault()

      const newPlayer = {
        player: {
          stats: {
            Name: Name,
            AC: {Value: AC},
            HP: {Value: HP},
            Abilities: {
              Str: Str,
              Dex: Dex,
              Con: Con,
              Int: Int,
              Wis: Wis,
              Cha: Cha
            }
          },
          user_id:this.props.user.id
        }
      }

      fetch(
        `${BASE_URL}/users/${newPlayer.user_id}/players`,
        {
          method: 'POST',
          headers: {
            'Authorization': getJwt(),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newPlayer)
        }
      )
      .then(res => this.getPlayers())
      .then(res => this.props.history.push('/'))
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-10 col-sm-offset-1">
          <Form onSubmit={this.handleSubmit} className="NewPlayer">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input
                placeholder="Name"
                maxLength="20"
                type="text"
                name="Name"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input
                placeholder="Hit Points"
                type="number"
                name="HP"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input
                placeholder="Armor Class"
                type="number"
                name="AC"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input
                placeholder="Str"
                maxLength="20"
                type="number"
                name="Str"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input
                placeholder="Dex"
                type="number"
                name="Dex"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input
                placeholder="Con"
                type="number"
                name="Con"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input
                placeholder="Int"
                type="number"
                name="Int"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input
                placeholder="Wis"
                type="number"
                name="Wis"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input
                placeholder="Cha"
                type="number"
                name="Cha"
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button >Submit</Button>
          </Form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  // file has access to this.props.CombatantList
  const { CombatantList } = state.monsters;
  return {
    CombatantList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPlayers: payload =>
    dispatch(actions.fetchPlayers(payload))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPlayer);
