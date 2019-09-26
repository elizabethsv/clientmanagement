import 'date-fns'
import React,{Component, useEffect, useState} from 'react'
// import { renderDateCell } from '@fullcalendar/core'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import axios from 'axios'
import {ClientSelection,TimeSelection} from './Selections'
import {Nav, LeftNav} from '../dashboard/Nav'




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
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />

                <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                        

            </MuiPickersUtilsProvider>

            <ClientSelection clients={clientData} getClient={handleClientSelection}/>

            <select onChange={handleGetMin} defaultValue="none">
                <option value="none" disabled hidden>
                    Select Length
                </option>
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
            
            <button onClick={handleSubmit}>
                Add Appointment
            </button>
    
            </div>
            </React.Fragment>
                
               
            
        )
    }




