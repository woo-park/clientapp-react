import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';
import * as api from '../../api'

import { connect } from 'react-redux';


import {
  userLoggedIn,
} from '../../actions';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      message: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    /* // the same but moved to api
    axios.post('/api/auth/login', { username, password })
      .then((result) => {
        localStorage.setItem('jwtToken', result.data.token);
        this.setState({ message: '' });
        this.props.history.push('/')
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.setState({ message: 'Login failed. Username or password not match' });
        }
      });
    */

    api.login({username, password})
    .then((res) => {
      // console.log(res) // token
      // console.log(res.userName, res.userID,'check here')
      // console.log(localStorage.getItem('jwtToken'),'localstorage check')
      this.setState({ message: '' });
      this.props.history.push('/')
      this.props.dispatch(userLoggedIn(res.userName, res.userID))
    })
    .catch((error) => {
      if(error.response.status === 401) {
        this.setState({ message: 'Login failed. Username or password not match' });
      }
    })
  }

  render() {
    const { username, password, message } = this.state;
    return (
      <div className="">
        <form className="form-signin" onSubmit={this.onSubmit}>
          {message !== '' &&
            <div className="alert alert-warning alert-dismissible" role="alert">
              { message }
            </div>
          }
          <h2 className="form-signin-heading">Please sign in</h2>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" className="form-control" placeholder="Email address" name="username" value={username} onChange={this.onChange} required/>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
          <button className="customButton" type="submit">Login</button>
          <p>
            Not a member? <Link to="/register"><span className="" aria-hidden="true"></span> Register here</Link>
          </p>
        </form>
      </div>
    );
  }
}

// export default Login;



function mapStateToProps(state) {
  const { userName } = state.userNameData
  return {
    ...state,
    userName: userName
  };
}


export default connect(mapStateToProps)(Login);
