import axios from 'axios';

export function setAuthenticationHeader(token) {
  console.log(token);
  if (token) {
    axios.defaults.headers.common['auth-token'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['auth-token'];
  }
}
