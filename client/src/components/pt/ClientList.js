import React from 'react'

let clients =[{id:'person1'}, {id:'person2'}]
const ClientList = (props) =>{
    return (
        <div id="client-list">
            {/* <h3>Clients</h3> */}
            <input type="text" placeholder="filter by client"/>
            <button>Search</button>
            {clients.map((client)=><p key={client.id}>{client.id}</p>)}
        </div>
    )
}

export default ClientList