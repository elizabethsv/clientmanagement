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
    }).then(()=>props.refetchEvents())
    
   }
    return(
      <React.Fragment>
        <button id="cxl-btn" onClick={handleCancellation}>Cancel Appt</button>

      </React.Fragment>
        
        
    )
}

export default CancelAppt


