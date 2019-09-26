import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import PaymentIcon from '@material-ui/icons/Payment';
import TimelineIcon from '@material-ui/icons/Timeline';
import DateRangeIcon from '@material-ui/icons/DateRange';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import './clients.css'

const ClientInfo = ({ match }) =>{
    const [clientData, setClientData] = useState([])

    useEffect(()=>{
        let id = match.params.id
        console.log(match.params.id)

        const fetchClients = () =>{
            axios.get(`http://localhost:5000/clients/info/${id}`)
                .then(client=>{
                    setClientData(client.data)
        })
        }
        fetchClients()
    },[])

    let clients = clientData.map((client)=>{
        return(
            <React.Fragment>
            <div id="client-name">
                <h3 key={client.id}>
                {client.firstname} {client.lastname}
                </h3>
                
                <div id="client-contact">
                    <span><EmailIcon/>{client.email}</span>
                    <span><PhoneIcon/>{client.phone}</span>
                </div>
            </div>
            <div className="grid-container">
                <div className="Client-Info">
                    <div id="client-avatar"></div>
                    <div id="details"></div>
                </div>
                <div className="child" id="progress">
                    <h4 className="grid-h4">Progress</h4>
                    <TimelineIcon fontSize="inherit"/>
                </div>
                <div className="child" id="program">
                    <h4 className="grid-h4">Program</h4>
                    <FitnessCenterIcon fontSize="inherit"/>
                </div>
                <div className="child" id="sessions">
                    <h4 className="grid-h4">Sessions</h4>
                    <DateRangeIcon fontSize="inherit"/>
                </div>
                <div className="child" id="payment">
                    <h4 className="grid-h4">Payment</h4>
                    <PaymentIcon fontSize="inherit"/>
                </div>
            </div>
            </React.Fragment>

        )}
    )
    return(
        <div>{clients}</div>
    )
}

export default ClientInfo