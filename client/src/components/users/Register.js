import React, { useState } from 'react';
import axios from 'axios';
import './users.css';

const Registration = props => {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  const handleTextChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  const handleRegistration = () => {
    axios({
      method: 'post',
      url: 'https://hidden-peak-08843.herokuapp.com/register-trainer',
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password
      }
    }).then(() => props.history.push('/login'));
  };
  return (
    <div className="form">
      <h2>Registration</h2>
      <input
        type="text"
        name="firstname"
        placeholder="First Name"
        onChange={handleTextChange}
      />
      <input
        type="text"
        name="lastname"
        placeholder="Last Name"
        onChange={handleTextChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        onChange={handleTextChange}
      />
      <input
        type="text"
        name="email"
        placeholder="E-Mail"
        onChange={handleTextChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleTextChange}
      />
      <button onClick={handleRegistration}>Register</button>
    </div>
  );
};

export default Registration;
