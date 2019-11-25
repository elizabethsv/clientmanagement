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

//todo: associate user id w/ trainerID
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
  //   const handleSubmit = values => {
  //     console.log(values);
  //     axios({
  //       method: 'post',
  //       url: 'http://localhost:5000/clients/add',
  //       data: values
  //     }).then(() => props.history.push('/clients'));
  //   };

  return (
    <div className="dashboard-form">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: null,
          dob: null
        }}
        validationSchema={AddClientSchema}
        onSubmit={values => {
          console.log(values);
          setTimeout(() => {
            axios({
              method: 'post',
              url: 'http://localhost:5000/clients/add',
              data: values
            }).then(() => props.history.push('/clients'));
          }, 400);
        }}
      >
        {({ errors, touched, values, setFieldValue }) => (
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
            <Field name="dob">
              {({ field, form }) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    value={field.value}
                    onChange={dob => form.setFieldValue('dob', dob)}
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
              )}
            </Field>
            <label>Phone Number</label>
            <Field name="phoneNumber" />
            {errors.phoneNumber && touched.phoneNumber ? (
              <div className="error-message">{errors.phoneNumber}</div>
            ) : null}

            <button type="submit">Add Client</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddClient;
