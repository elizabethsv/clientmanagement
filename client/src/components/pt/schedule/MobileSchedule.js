import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
// import dayGridPlugin from '@fullcalendar/daygrid'; // for dayGridMonth view
import './main.scss';
const token = localStorage.getItem('jsonwebtoken');
console.log(token);

const MobileSchedule = props => {
  return (
    <FullCalendar
      defaultView="timeGridDay"
      header={{
        left: 'prev',
        center: 'title',
        right: 'next'
      }}
      height={550}
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

export default MobileSchedule;
