import React, { useState } from 'react';
import axios from 'axios';
import { setAuthenticationHeader } from '../../utlities/authenticate';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Login = props => {
  const [user, setUser] = useState({ email: '', password: '' });

  const handleTextChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = () => {
    axios
      .post('/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('jsonwebtoken', token);
        setAuthenticationHeader(token);
        props.onLogin(token);
        props.history.push('/');
      });
  };
  return (
    <div className="form">
      <h2>Login</h2>
      <input
        type="text"
        name="email"
        placeholder="email"
        onChange={handleTextChange}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handleTextChange}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? Sign up <Link to="/register">here</Link>.
      </p>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: token => dispatch({ type: 'ON_LOGIN', token: token })
  };
};
export default connect(null, mapDispatchToProps)(Login);
