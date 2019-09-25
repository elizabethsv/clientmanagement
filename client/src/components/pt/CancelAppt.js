import React from 'react'
import axios from 'axios'
import CancelIcon from '@material-ui/icons/Cancel'

const CancelAppt = (props) =>{
    
   const handleCancellation=()=>{
     let apptid= props.apptid

     console.log(apptid)
    axios({
        method: 'put',
        url: `http://localhost:5000/cancelappt/${apptid}`,
        data:{
            status:'cancelled'
        }
    })
   }
    return(
        <button onClick={handleCancellation}>Cancel Appt</button>
        
    )
}

export default CancelAppt


