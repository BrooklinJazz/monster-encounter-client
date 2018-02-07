import React, {Component} from 'react';
import {Token} from '../requests/tokens';
import {BASE_URL} from '../requests/config';

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
    console.log(params);
    // TODO sign up is not saving user password has encrypted
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
      <main
        className="SignUpPage"
        style={{
          padding: '0 20px'
        }}
      >
        <h2>Sign Up</h2>

        <form onSubmit={this.signUp}>
        <div>
          <label htmlFor='first_name'>First Name</label> <br />
          <input
            value={first_name}
            onChange={this.handleChange('first_name')}
            id='first_name'
            name='first_name'
          />
        </div>

        <div>
          <label htmlFor='last_name'>Last Name</label> <br />
          <input
            value={last_name}
            onChange={this.handleChange('last_name')}
            id='last_name'
            name='last_name'
          />
        </div>

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
            <input type='submit' value='Sign Up'/>
          </div>
        </form>
      </main>
    )
  }
}

export default SignUpPage;
