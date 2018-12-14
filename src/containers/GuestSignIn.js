import React, { Component } from 'react';
import {Token} from '../requests/tokens'

class GuestSignIn extends Component {
  constructor(props) {
    super(props);
  }

  signIn() {
    event.preventDefault();
    const email = 'guest@guest.com'
    const password = 'guest'
    const {onSignIn = () => {}} = this.props;
    Token
    .create({email, password})
    .then(data => {
      if (!data.error) {
        const {jwt} = data;
        localStorage.setItem('jwt', jwt);
        onSignIn();
        this.props.history.push("/");
      }
    });
  }

  render() {
    return (
      <div className="GuestSignIn" onClick={() => this.signIn()}>or sign in as guest</div>
    )
  }

}

export default GuestSignIn;
