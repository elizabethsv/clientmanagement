import React,{useState} from 'react'
import axios from 'axios'
import { setAuthenticationHeader } from '../../utlities/authenticate'
import { connect } from 'react-redux'




const Login = (props) =>{

    const [user, setUser] = useState({email: '', password: ''})

    const handleTextChange = (e) =>{
      setUser({
        ...user,
        [e.target.name]: e.target.value
      })
    }
    

const handleLogin=()=>{
    axios.post('http://localhost:5000/login',
    {
        email: user.email,
        password: user.password
    }).then(response=>{
      const token = response.data.token
      localStorage.setItem('jsonwebtoken', token)
      setAuthenticationHeader(token)
      props.onLogin(token)
      props.history.push('/')
    })
}
  return(
    <div className="form-container">
      <div className="form-background">
        <h1>title</h1>
      </div>
      <div className="form">
      <h2>Login</h2>
      <label>E-mail</label>
      <input type="text" name="email" onChange={handleTextChange}/>
      <label>Password</label>
      <input type="password" name="password" onChange={handleTextChange}/>
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? Sign up here.</p>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) =>{
  return {
      onLogin: (token) => dispatch({type:'ON_LOGIN', token: token})
  }
}
export default connect(null, mapDispatchToProps)(Login)