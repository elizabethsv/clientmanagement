import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
// import dayGridPlugin from '@fullcalendar/daygrid'; // for dayGridMonth view
import './main.scss';
import axios from 'axios';
import request from 'superagent';
const token = localStorage.getItem('jsonwebtoken');
console.log(token);

// axios({
//   method: 'get',
//   url: 'http://localhost:5000/appts',
//   responseType: 'stream',
//   headers: { 'auth-token': token }
// }).then(res => console.log(res.data));

const DesktopSchedule = props => {
  return (
    <FullCalendar
      defaultView="timeGridWeek"
      header={{
        left: 'prev,next',
        center: 'title',
        right: 'timeGridWeek, timeGridDay'
      }}
      height={600}
      ref={props.reference}
      plugins={[timeGridPlugin, interactionPlugin]}
      selectMirror={true}
      selectOverlap={false}
      nowIndicator={true}
      editable={true}
      eventClick={info => props.handleClick(info)}
      eventDrop={info => props.update(info)}
      eventSources={[
        {
          events: function(info, successCallback, failureCallback) {
            request
              .get('http://localhost:5000/appts')
              .set('auth-token', token)
              .query({
                start: info.start.valueOf(),
                end: info.end.valueOf()
              })
              .then(res => {
                successCallback(
                  res.body.map(event => {
                    return {
                      title: event.title,
                      start: event.start
                    };
                  })
                );
              });
          }
        },
        {
          events: function(info, successCallback, failureCallback) {
            request
              .get('http://localhost:5000/appts/cancelled')
              .set('auth-token', token)
              .query({
                start: info.start.valueOf(),
                end: info.end.valueOf()
              })
              .then(res => {
                successCallback(
                  res.body.map(event => {
                    return {
                      title: event.title,
                      start: event.start
                    };
                  })
                );
              });
          },
          backgroundColor: '#f73859'
        }
      ]}
    />
  );
};
export default DesktopSchedule;
