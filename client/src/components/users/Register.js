import React,{useState} from 'react'
import axios from 'axios'


const Registration = () =>{
    const [user, setUser] = useState({firstname: '', lastname: '', email: '', password: '', })

    const handleTextChange = (e) =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const handleRegistration=()=>{
        axios.post('http://localhost:5000/register',{
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password
        })
    }
    return(
        <div id="registration">
            <input type="text" name="firstname" onChange={handleTextChange}/>
            <input type="text" name="lastname" onChange={handleTextChange}/>
            <input type="text" name="email" onChange={handleTextChange}/>
            <input type="password" name="password" onChange={handleTextChange}/>
            <button onClick={handleRegistration}>Register</button>
        </div>
    )
}

export default Registration 