import React from 'react'

let clients =[{id:'person1'}, {id:'person2'}]
const ClientList = (props) =>{
    return (
        <div>Client
            <input type="text" placeholder="search"/>
            <button>button</button>
        </div>
    )
}

export default ClientList