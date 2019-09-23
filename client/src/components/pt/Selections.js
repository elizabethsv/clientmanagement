import React from 'react'

const ClientSelection =(props)=>{
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
    <select>
        {createClientOptions()}
    </select>
    )
}

const TimeSelection = () =>{
    return(
    <select>
        <option value="30">
            30 min
        </option>
        <option value="45">
            45 min
        </option>
        <option value="60">
            60 min
        </option>
    </select>
    )
}
export default ClientSelection