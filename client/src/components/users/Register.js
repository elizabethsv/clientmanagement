import React,{useState} from 'react'
import axios from 'axios'
import './users.css'


const Registration = () =>{
    const [user, setUser] = useState({firstname: '', lastname: '', email: '', password: '', })

    const handleTextChange = (e) =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const handleRegistration=()=>{
        axios({
            method: 'post',
            url: 'http://localhost:5000/register-trainer',
            data:{
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password
            }
        })
        
    }
    return(
        <div id="registration">
            <label>First Name</label>
            <input type="text" name="firstname" onChange={handleTextChange}/>
            <label>Last Name</label>
            <input type="text" name="lastname" onChange={handleTextChange}/>
            <label>E-mail</label>
            <input type="text" name="email" onChange={handleTextChange}/>
            <label>Password</label>
            <input type="password" name="password" onChange={handleTextChange}/>
            <button onClick={handleRegistration}>Register</button>
        </div>
    )
}

export default Registration 