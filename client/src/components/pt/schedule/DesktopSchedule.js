import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
// import dayGridPlugin from '@fullcalendar/daygrid'; // for dayGridMonth view
import './main.scss';
import axios from 'axios';
const token = localStorage.getItem('jsonwebtoken');
console.log(token);

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
            axios
              .get('http://localhost:5000/appts', {
                params: {
                  start: info.start.valueOf(),
                  end: info.end.valueOf()
                },
                headers: {
                  'auth-token': token
                }
              })
              .then(res => {
                successCallback(
                  res.data.map(event => {
                    return {
                      title: event.title,
                      start: event.start,
                      end: event.end,
                      id: event.id
                    };
                  })
                );
              });
          },
          backgroundColor: '#00adb5'
        },
        {
          events: function(info, successCallback, failureCallback) {
            axios
              .get('http://localhost:5000/appts/cancelled', {
                params: {
                  start: info.start.valueOf(),
                  end: info.end.valueOf()
                },
                headers: {
                  'auth-token': token
                }
              })
              .then(res => {
                successCallback(
                  res.data.map(event => {
                    return {
                      title: event.title,
                      start: event.start,
                      end: event.end,
                      id: event.id
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
