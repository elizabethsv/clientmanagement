import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import axios from 'axios';
import './main.scss';
const token = localStorage.getItem('jsonwebtoken');

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
                console.log(res);
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
          }
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
                      id: event.id,
                      title: event.title,
                      start: event.start,
                      end: event.end
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
