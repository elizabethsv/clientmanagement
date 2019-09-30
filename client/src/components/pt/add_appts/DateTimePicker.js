import React from 'react'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'


const DateTimePicker = (props) =>{
    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date"
                    value={props.date}
                    onChange={props.getDate}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />

                <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time"
                        value={props.date}
                        onChange={props.getDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                        

            </MuiPickersUtilsProvider>

    )
}

export default DateTimePicker