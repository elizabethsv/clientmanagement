import React, { useState } from 'react';
import axios from 'axios';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import './clientform.css';

const useStyles = makeStyles({
  underline: {
    '&:before': {
      borderBottomColor: '#00adb5'
    },
    '&:after': {
      borderBottomColor: '#00adb5'
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: '1px solid #00adb5'
    }
  },
  focused: {
    borderBottomColor: '#00adb5'
  }
});

const AddClient = props => {
  const classes = useStyles();

  const [clientData, getClientData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: ''
  });

  const [selectedDate, getSelectedDate] = useState(new Date());

  const handleChange = e => {
    getClientData({
      ...clientData,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = date => {
    getSelectedDate(date);
  };

  const handleSubmit = () => {
    axios({
      method: 'post',
      url: 'http://localhost:5000/clients/add',
      data: {
        firstname: clientData.firstname,
        lastname: clientData.lastname,
        email: clientData.email,
        phone: clientData.phone,
        dob: selectedDate.toISOString()
      }
    }).then(() => props.history.push('/clients'));
  };

  return (
    <div className="dashboard-form">
      <label>First Name</label>
      <input type="text" name="firstname" onChange={handleChange} />
      <label>Last Name</label>
      <input type="text" name="lastname" onChange={handleChange} />
      <label>E-mail</label>
      <input type="text" name="email" onChange={handleChange} />
      <label>Phone Number</label>
      <input type="text" name="phone" onChange={handleChange} />
      <label>Date of Birth</label>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          value={selectedDate}
          onChange={date => handleDateChange(date)}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
          InputProps={{
            classes: {
              underline: classes.underline,
              focused: classes.focused
            }
          }}
        />
      </MuiPickersUtilsProvider>

      <button onClick={handleSubmit}>Add Client</button>
    </div>
  );
};

export default AddClient;
