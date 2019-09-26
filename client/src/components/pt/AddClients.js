import React,{useState}from 'react'
import axios from 'axios'


const AddClient = (props) =>{
    
    const [clientData, getClientData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: ''
    })

    const handleChange= (e)=>{
        getClientData({
            ...clientData,
            [e.target.name]: e.target.value})
    }

    const handleSubmit = () =>{
        axios({
            method: 'post',
            url: 'http://localhost:5000/clients/add',
            data: {
                firstname: clientData.firstname,
                lastname: clientData.lastname,
                email: clientData.email,
                phone: clientData.phone
                }
            }).then(()=> props.history.push('/clients'))
           
        
        }
     
    return(
        <div className="dashboard-form">
            <label>First Name</label>
            <input type="text" name="firstname" onChange={handleChange}/>
            <label>Last Name</label>
            <input type="text" name="lastname" onChange={handleChange}/>
            <label>E-mail</label>
            <input type="text" name="email" onChange={handleChange}/>
            <label>Phone Number</label>
            <input type="text" name="phone" onChange={handleChange}/>

            <button onClick={handleSubmit}>Add Client</button>
        </div>
    )
}

export default AddClient