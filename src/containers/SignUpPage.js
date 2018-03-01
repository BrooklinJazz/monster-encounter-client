import React, {Component} from 'react';
import {Token} from '../requests/tokens';
import {BASE_URL} from '../requests/config';
import GuestSignIn from './GuestSignIn'
import { Button, Input, InputGroupAddon, InputGroup } from 'reactstrap';

class SignUpPage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    };

    // this.createToken = this.createToken.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  handleChange (name) {
    return event => {
      const {currentTarget} = event;
      this.setState({[name]: currentTarget.value});
    };
  }

  signUp(event) {
    // create the user
    event.preventDefault()
    const params = this.state
    const {onSignIn = () => {}} = this.props;

    const {email, password} = this.state;
    fetch(
      `${BASE_URL}/api/v1/users/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: params})
      }
    )
    .then((data)=>{
      Token
      .create({email, password})
      .then(data => {
        if (!data.error) {
          const {jwt} = data;
          localStorage.setItem('jwt', jwt);
          // this changes the url but the page doesn't load
        }
      })
      .then(data => onSignIn())
      .then(data => {
        this.props.history.push("/");
      })
    })
  }

  render () {
    const {first_name, last_name, email, password} = this.state;
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
      <div className="row">
        <main
          className="SignUpPage SignMain col-sm-offset-4 col-sm-4"
          style={{
            padding: '0 20px'
          }}
          >
            <form onSubmit={this.signUp} className="signUpForm">
              <h2>Sign Up</h2>
              <div>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">First Name</InputGroupAddon>
                  <Input
                    value={first_name}
                    onChange={this.handleChange('first_name')}
                    id='first_name'
                    name='first_name'
                  />
                </InputGroup>
              </div>

              <div>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Last Name</InputGroupAddon>
                  <Input
                    value={last_name}
                    onChange={this.handleChange('last_name')}
                    id='last_name'
                    name='last_name'
                  />
                </InputGroup>
              </div>

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
                <Button className="submit" type='submit'>Sign Up</Button>
              </div>
              <GuestSignIn onSignIn={this.props.onSignIn} history={this.props.history} />
            </form>
          </main>
      </div>
    )
  }
}

export default SignUpPage;
