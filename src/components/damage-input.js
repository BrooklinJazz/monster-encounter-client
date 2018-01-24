import React, {Component} from "react";
import {connect} from "react-redux";

export default class DamageInput extends Component {
  render() {
    return (
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => this.handleSubmit(e)
        }
        >
          <input type="number" autoFocus name="hpChange"
            onChange={(e) => this._handleChange(e)}
          />
        </form>
    )
  }
}
