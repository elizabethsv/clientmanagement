import React from 'react'
import axios from 'axios'
import CancelIcon from '@material-ui/icons/Cancel'

const CancelAppt = (props) =>{
   const handleCancellation=()=>{
     let apptid= props.appt.id
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
      <React.Fragment>
        <button onClick={handleCancellation}>Cancel Appt</button>

      </React.Fragment>
        
        
    )
}

export default CancelAppt


