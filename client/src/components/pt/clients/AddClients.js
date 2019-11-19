import React, { useState } from 'react';
import axios from 'axios';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { Formik, Form, Field } from 'formik';
import { AddClientSchema } from '../../../schemas';

const useStyles = makeStyles({
  root: {
    lineHeight: '2.7em',
    borderRadius: '3px'
  },
  underline: {
    '&:before': {
      border: '1px solid #00adb5'
    },
    '&:after': {
      border: '1px solid #00adb5'
    },
    '&:hover:not(.Mui-disabled):before': {
      border: '1px solid #00adb5'
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
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: ''
        }}
        validationSchema={AddClientSchema}
        onSubmit={values => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label>First Name</label>
            <Field name="firstName" />
            {errors.firstName && touched.firstName ? (
              <div className="error-message">{errors.firstName}</div>
            ) : null}
            <label>Last Name</label>
            <Field name="lastName" />
            {errors.lastName && touched.lastName ? (
              <div className="error-message">{errors.lastName}</div>
            ) : null}
            <label>E-Mail</label>
            <Field name="email" type="email" />
            {errors.email && touched.email ? (
              <div className="error-message">{errors.email}</div>
            ) : null}
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
                    root: classes.root,
                    underline: classes.underline,
                    focused: classes.focused
                  }
                }}
              />
            </MuiPickersUtilsProvider>
            <button type="submit">Add Client</button>
          </Form>
        )}
      </Formik>
      {/* <label>First Name</label>
    <input type="text" name="firstname" onChange={handleChange} />
    <label>Last Name</label>
    <input type="text" name="lastname" onChange={handleChange} />
    <label>E-mail</label>
    <input type="text" name="email" onChange={handleChange} />
    <label>Phone Number</label>
    <input type="text" name="phone" onChange={handleChange} /> */}

      {/* <button onClick={handleSubmit}>Add Client</button> */}
    </div>
  );
};

export default AddClient;
