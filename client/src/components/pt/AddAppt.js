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



export default function MaterialUIPickers() {
    const [selectedDate, setSelectedDate] = useState(new Date('2019-01-01T21:00:00'));
    const [clientData, setClientData] = useState([])
    const [setClient, setSelectedClient] = useState({id: '', firstName: ''})
    const [setEnd, setEndTime] = useState({end: null})
    const [apptInfo, setApptInfo] = useState({title: '', start: '', end: '', allDay: false})
    
    //Picks a date:
    const handleDateChange = date => {
      setSelectedDate(date);
    };

    const handleGetMin = (e) =>{
        let min = e.target.value
        let oldDate = selectedDate
        let endDate = new Date(oldDate.getTime()+min*60000)
        setEndTime({end: endDate})
        return endDate

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

    // const handleSubmit = () =>{
    //     axios({
    //         method: 'post',
    //         url: 'http://localhost:5000/addsession',
    //         data: {
    //             title: 
    //             start: this.state.start,
    //             end: this.state.end
    //             }
    //         })
    //     }
    

       
        return(
            <div id="add-appt-container">
               
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
                {/* <TimeSelection /> */}

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
               

               <button>
                   Add Appointment
               </button>

           
                </div>
                
               
            
        )
    }




