import React, {Component} from 'react'
import {Combat} from '../requests/combats'
import { connect } from "react-redux";

class SaveFight extends Component {
  constructor(props) {
    super(props)
    this.state = {
        name: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }


  handleSubmit(event) {
    event.preventDefault()

    const newCombat = {
      name: this.state.name, fight:this.props.CombatantList, user_id:this.props.user.id
    }

    Combat
      .create(newCombat)
      .then(data => {
        if (data.errors) {
          this.setState({
            validationErrors: data
              .errors
              .filter(e => e.type === 'ActiveRecord::RecordInvalid')
          });
        } else {
          // TODO show the user an error properly
          console.error('Something went wrong');
        }
      });
  }

  render() {
    return (
      <div>
        <h2>SaveFight</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit"/>
        </form>
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

export default connect(mapStateToProps)(SaveFight);
