import React, {Component} from 'react'
import {Combat} from '../requests/combats'
import { connect } from "react-redux";
import * as actions from "../actions/index"
const BASE_URL = 'http://localhost:3000/api/v1'
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button, Form, FormGroup, Label, FormText } from 'reactstrap';
class SaveFight extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getFights = this.getFights.bind(this);

  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  getFights() {
    const {user = []} = this.props
    fetch(
      `${BASE_URL}/users/${user.id}/combats`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
    .then(res => res.json())
    .then(res => this.props.updateFights(res))
  }



  handleSubmit(event) {
    event.preventDefault()
    if (this.props.CombatantList.length === 0) {
      alert('add some combatants before saving!')
    } else {
      const newCombat = {
        name: this.state.name, fight:this.props.CombatantList, user_id:this.props.user.id
      }

      Combat
      .create(newCombat)
      .then(dataDoesNotMatter => {
        this.getFights()
      })
    }

  }

  render() {
    return (
        <Form onSubmit={this.handleSubmit} inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input
              id="saveFight"
              placeholder="save fight"
              maxLength="20"
              type="text"
              name="name"
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

  export default connect(mapStateToProps, mapDispatchToProps)(SaveFight);
