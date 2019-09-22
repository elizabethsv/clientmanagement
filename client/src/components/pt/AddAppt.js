import React,{Component} from 'react'
// import { renderDateCell } from '@fullcalendar/core'


let clients = [{id: 1,name: 'client1'}, {id: 2, name: 'client2'}]
class AddAppt extends Component{
    constructor(){
        super()
        this.state = [{start: '', end: '', clientid: '', trainderid: '',  }]
    }

    createClientOptions= ()=>{
        let optionsList = []
        for(let i = 0; i< clients.length; i++){
            optionsList.push(<option value={clients[i].id}>{clients[i].name}</option>)
        }
        return optionsList
    }

    // handleDateChange=()=>{

    // }

    // handleSubmit () =>{

    // }
    render(){
       
        return(
            <div>
               <select>
                   {this.createClientOptions()}
               </select>
            </div>
        )
    }



}

export default AddAppt