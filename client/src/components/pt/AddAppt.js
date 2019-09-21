import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
let dates = []
export default function MaterialUIPickers() {
  const [selectedDate, setSelectedDate] = React.useState(new Date('2019-01-01T05:00:00'))
  const [selectedClient, setSelectedClient] = React.useState({name: ''})

  const handleDateChange=(date)=> {
    setSelectedDate(date)
  }
  const handleClientChange = (e)=>{
    setSelectedClient({[e.target.name]:e.target.value})
  }
 
  const handleSubmit = ()=>{
        dates.push({date: selectedDate, client: selectedClient})

        console.log(dates)
  }

console.log(selectedDate)
  

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date"
          name="Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        <input type="text" name="client"onChange={handleClientChange}/>


        <button onClick={handleSubmit}>submit</button>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}