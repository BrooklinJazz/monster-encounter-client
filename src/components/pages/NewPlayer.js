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
      Str: 0,
      Dex: 0,
      Con: 0,
      Int: 0,
      Wis: 0,
      Cha: 0
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.getFights = this.getFights.bind(this);

  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  // getPlayers() {
  //   const {user = []} = this.props
  //   fetch(
  //     `${BASE_URL}/users/${user.id}/players`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //     }
  //   )
  //   .then(res => res.json())
  //   .then(res => this.props.updatePlayers(res))
  // }



  handleSubmit(event) {
    event.preventDefault()

    const newPlayer = {
      stats: {
        Name: this.state.Name,
        AC: {Value: this.state.AC},
        HP: {Value: this.state.HP},
        Abilities: {
          Str: this.state.Str,
          Dex: this.state.Dex,
          Con: this.state.Con,
          Int: this.state.Int,
          Wis: this.state.Wis,
          Cha: this.state.Cha
        }
      },
      user_id:this.props.user.id
    }

    Combat
    .create(newPlayer)
    // .then(dataDoesNotMatter => {
    //   this.getFights()
    // })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            placeholder="player name"
            maxLength="20"
            type="text"
            name="Name"
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            placeholder="HP"
            type="number"
            name="HP"
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            placeholder="AC"
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
    updateFights: payload =>
    dispatch(actions.updateFights(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPlayer);
