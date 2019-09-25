import React,{useState,useEffect} from 'react'
import axios from'axios'

const Clients = () =>{

    const [clientData, setClientData] = useState([])

    useEffect(()=>{
        const fetchClients = () =>{
            axios.get('http://localhost:5000/clients')
                .then(client=>{
                    setClientData(client.data)
        })
        }
        fetchClients()
    },[])



    let clients = clientData.map((client)=>{
        return(
            <li key={client.id}>{client.firstname}</li>
        )}
    )

    return(
        <div>
            <ul>{clients}</ul>

            <button>Add New Client</button>
        </div>
        
    )
}

export default Clients