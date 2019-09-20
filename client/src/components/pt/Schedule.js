import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid';

import '../../main.scss' // webpack must be configured to do this

export default class Schedule extends React.Component {


  render() {
      let events =[
          {
            
        }
      ]
    
    return (
        <React.Fragment>
      <FullCalendar defaultView="timeGridWeek" header = {{
        left:   'prev,next',
        center: 'title',
        right:  'timeGridWeek, timeGridDay'
      }} 
      plugins={[ timeGridPlugin ]}
      events={[{
        id: 'a',
            title: 'testing',
            start: '2019-09-20T12:30:00',
            end: '2019-09-20T01:00:00',
            allDay: false
      },
        
        {
            id: 'a',
            title: 'test2',
            start: '2019-09-21T12:30:00',
            end: '2019-09-21T14:00:00',
            allDay: false,
        }]}
       />
       
         </React.Fragment>
    )
  }


}