import React,{useState} from 'react'
import axios from 'axios'

const Login = () =>{

    const [user, setUser] = useState({email: '', password: ''})

    const handleTextChange = (e) =>{
      setUser({
        ...user,
        [e.target.name]: e.target.value
      })
    }
    

const handleLogin=()=>{
    axios({
        method: 'post',
        url: 'http://localhost:5000/login',
        data:{
            email: user.email,
            password: user.password
        }
    })
    
}
  return(
    <div id="login">
      <input type="text" name="email" onChange={handleTextChange}/>
      <input type="password" name="password" onChange={handleTextChange}/>
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? Sign up here.</p>
    </div>
  )
}

export default Login