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
    // console.log(this.state);
    // console.log('change started');
  }

  // componentDidRecieveProps(nextProps) {
  //   // this.setState({newCombat: {name: this.state.newCombat.name, fight:nextProps.CombatantList, user_id:nextProps.user.id}})
  //   console.log('cDRP', this.state);
  // }

  handleSubmit(event) {
    event.preventDefault()

    // alert('A name was submitted: ' + this.state.value);
    // console.log('save fight submitted', this.state.newCombat);
    // console.log(this.props.user.id);
    // console.log(this.props.CombatantList);
    // this.setState({...this.state.newCombat, user_id: this.props.user.id, fight:this.props.CombatantList});
    // this.setState({newCombat: {name: this.state.newCombat.name, fight:this.props.CombatantList, user_id:this.props.user.id}})
    const newCombat = {
      name: this.state.name, fight:this.props.CombatantList, user_id:this.props.user.id
    }
    // this.setState({fight: this.props.CombatantList});
    const {history} = this.props;
    // console.log(newCombat);
    // const {newCombat} = this.state;
    // console.log('passing to post:', newCombat);
    // TODO see why I'm getting an error on submit
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
          history.push(`/`)
        }
      });
    event.preventDefault();
  }

  // setLocalState() {
  //   this.setState({newCombat: {...this.state.newCombat, name: this.state.newCombat.name, fight:this.props.CombatantList, user_id: this.props.user.id}});
  // }

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
  // Whatever is returned will show up as props inside of MonsterList
  // console.tron.log(state);
  const { CombatantList } = state.monsters;
  return {
    CombatantList
  };
}

export default connect(mapStateToProps)(SaveFight);
