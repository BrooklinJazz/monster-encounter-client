import React, {Component} from 'react';
import {Token} from '../requests/tokens';

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
        className="SignInPage col-sm-offset-5 col-sm-2"
        style={{
          padding: '0 20px'
        }}
      >
        <form onSubmit={this.createToken}>
          <h2>Sign In</h2>
          <div>
            <label htmlFor='email'>Email</label> <br />
            <input
              value={email}
              onChange={this.handleChange('email')}
              type='email'
              id='email'
              name='email'
            />
          </div>

          <div>
            <label htmlFor='password'>Password</label> <br />
            <input
              value={password}
              onChange={this.handleChange('password')}
              type='password'
              id='password'
              name='password'
            />
          </div>

          <div>
            <input type='submit' value='Sign In'/>
          </div>
        </form>
      </main>
    )
  }
}

export default SignInPage;
