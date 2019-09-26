import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ClientInfo = ({ match }) =>{
    const [clientData, setClientData] = useState([])

    useEffect(()=>{
        let id = match.params.id
        console.log(match.params.id)

        const fetchClients = () =>{
            axios.get(`http://localhost:5000/clientinfo/${id}`)
                .then(client=>{
                    setClientData(client.data)
        })
        }
        fetchClients()
    },[])

    let clients = clientData.map((client)=>{
        return(
            <h3 id="client" key={client.id}>
            {client.firstname} {client.lastname}
            </h3>
            

        )}
    )
    return(
        <div>{clients}</div>
    )
}

export default ClientInfo