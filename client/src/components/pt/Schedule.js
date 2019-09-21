import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';
import '../../main.scss'




export class Schedule extends React.Component {


  render() {
    return (
        <React.Fragment>
      <FullCalendar defaultView="timeGridWeek" header = {{
        left:   'prev,next',
        center: 'title',
        right:  'timeGridWeek, timeGridDay'
      }} 
      plugins={[ timeGridPlugin ]}
      themeSystem='Lux'
      style={'height:80vh'}
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

export const Notes = () =>{
    return(
        <Paper className="schedule-options">
            <h3>Notes</h3>
            

        </Paper>
    )
}