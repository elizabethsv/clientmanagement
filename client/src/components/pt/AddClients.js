import React from 'react'


const AddClient = () =>{
     
    return(
        <div className="form">
            <label>First Name</label>
            <input type="text" name="firstname"/>
            <label>Last Name</label>
            <input type="text" name="lastname"/>
            <label>E-mail</label>
            <input type="text" name="email"/>
            <label>Phone Number</label>
            <input type="text" name="phone"/>

            <button>Add Client</button>
        </div>
    )
}

export default AddClient