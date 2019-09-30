import 'date-fns'
import React,{useEffect, useState} from 'react'
// import { renderDateCell } from '@fullcalendar/core'

import axios from 'axios'
import {ClientSelection,TimeSelection} from '../Selections'
import TimeLength from './TimeLength'
import DateTimePicker from './DateTimePicker'


export default function MaterialUIPickers(props) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [clientData, setClientData] = useState([])
    const [setClient, setSelectedClient] = useState({id: '', firstName: ''})
    const [setEnd, setEndTime] = useState({end: null})
    const [apptInfo, setApptInfo] = useState({title: '', start: '', end: '', allDay: false})
    
    //Picks a date:
    const handleDateChange = date => {
      setSelectedDate(date);
    }
    const handleGetMin = (e) =>{
        let min = e.target.value
        let oldDate = selectedDate
        let endDate = new Date(oldDate.getTime()+min*60000)
        console.log(min)
        setEndTime(endDate)
    }

    //fetches client's data:
    useEffect(()=>{
        const fetchClients = () =>{
            axios.get('http://localhost:5000/clients')
                .then(client=>{
                    setClientData(client.data)
        })
        }
        fetchClients()
        
    },[])

    const handleClientSelection =(e)=>{
        let clientId = e.target.value
        setSelectedClient(clientId)
    }

    const handleSubmit = () =>{
        console.log(setEnd)
        axios({
            method: 'post',
            url: 'http://localhost:5000/appts/add',
            data: {
                start: selectedDate.toISOString(),
                end: setEnd.toISOString(),
                clientid: setClient
                }
            }).then(()=>props.history.push('/schedule'))
            
        }

    return(
        <React.Fragment>
            <div id="add-appt-container">
            <h2>Add New Appointment</h2>
            
            <DateTimePicker getDate={(date)=>handleDateChange(date)} date={selectedDate}/>

            <ClientSelection clients={clientData} getClient={handleClientSelection}/>

            <TimeLength getMin={(e)=>handleGetMin(e)}/>
            
            <button onClick={handleSubmit}>
                Add Appointment
            </button>
    
            </div>
            </React.Fragment>
                
               
            
        )
    }




