import React from 'react'
import axios from 'axios'

const CancelAppt = () =>{
    
   const handleCancellation=()=>{
    axios({
        method: 'put',
        url: 'http://localhost:5000/cancelappt/1',
        data:{
            status:'cancelled'
        }
    })
   }
    return(
        <button onClick={handleCancellation}>testing</button>
    )
}

export default CancelAppt