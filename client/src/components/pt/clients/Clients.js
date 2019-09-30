import React,{useState,useEffect} from 'react'
import axios from'axios'

const Clients = (props) =>{

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

    const addClient = () =>{
        props.history.push('/addclient')
    }

    const clientInfo = (id) =>{
        props.history.push(`/clientinfo/${id}`)
    }


    let clients = clientData.map((client)=>{
        return(
            <div id="client" key={client.id} onClick={(id)=>clientInfo(client.id)}>
            <div className="avatar"></div>{client.firstname}</div>

        )}
    )

    return(
        <div id="client-list-container">
            <div id="client-management-list">
                <h3>Client List</h3>
                <div id="clients">
                    {clients}
                </div>
                
            </div>
            
            <div id="clients-options">
                <button onClick={addClient}>Add New Client</button>
                <button id="cxl-btn">Cancel Training</button>
            </div>
        </div>
        
    )
}

export default Clients