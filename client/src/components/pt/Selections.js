import React from 'react'


export const ClientSelection =(props)=>{
    
    const createClientOptions= ()=>{
        let optionsList = []
        for(let i = 0; i< props.clients.length; i++){
            optionsList.push(
            <option key={props.clients[i].id} value={props.clients[i].id}>
            {props.clients[i].firstname}
            </option>)
        }
        return optionsList
    }
    return(
    <select onChange={props.getClient} defaultValue="none">
        <option value="none" disabled hidden>
            Select client
        </option>
        {createClientOptions()}
    </select>
    )
}

