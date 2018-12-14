import React, {Component} from 'react';
import {Token} from '../requests/tokens';
import GuestSignIn from './GuestSignIn';
import { Button, Input, InputGroupAddon, InputGroup } from 'reactstrap';

class SignInPage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.createToken = this.createToken.bind(this);
  }

  handleChange (name) {
    return event => {
      const {currentTarget} = event;
      this.setState({[name]: currentTarget.value});
    };
  }

  createToken (event) {
    event.preventDefault();
    const {email, password} = this.state;
    const {onSignIn = () => {}} = this.props;
    Token
      .create({email, password})
      .then(data => {
        if (!data.error) {
          const {jwt} = data;
          localStorage.setItem('jwt', jwt);
          onSignIn();
          this.setState({email: "", password: ""});
          this.props.history.push("/");
        }
      });
  }

  render () {
    const {email, password} = this.state;
    const {user} = this.props;

    // TODO, change this to redirect
    if (user) {
      return (
        <div>
          You've already signed in, sign out to access this page.
        </div>
      );
    }

    return (
      <main
        className="SignInPage SignMain col-sm-offset-4 col-sm-4"

      >
        <form onSubmit={this.createToken} className="signInForm">
          <h2>Sign In</h2>
          <div>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
              <Input
                value={email}
                onChange={this.handleChange('email')}
                type='email'
                id='email'
                name='email'
              />
            </InputGroup>
          </div>

          <div>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Password</InputGroupAddon>
              <Input
                value={password}
                onChange={this.handleChange('password')}
                type='password'
                id='password'
                name='password'
              />
            </InputGroup>
          </div>

          <div>
            <Button className="submit" type='submit'>Sign In</Button>
          </div>
          <GuestSignIn onSignIn={this.props.onSignIn} history={this.props.history} />
        </form>
      </main>
    )
  }
}

export default SignInPage;
