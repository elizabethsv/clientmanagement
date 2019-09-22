import React, {Component} from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid';
import Paper from '@material-ui/core/Paper'
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
// import dayGridPlugin from '@fullcalendar/daygrid'; // for dayGridMonth view
import axios from 'axios'
import '../../main.scss'

const useStyles = {
    calendar:{
        height: "80vh"
    }
}
const classes = useStyles


// let appts = [{
//         id: 'a',
//             title: 'testing',
//             start: '2019-09-20T12:30:00',
//             end: '2019-09-20T01:00:00',
//             allDay: false
//       },
        
//         {
//             id: 'a',
//             title: 'test2',
//             start: '2019-09-21T12:30:00',
//             end: '2019-09-21T14:00:00',
//             allDay: false,
//         }]

//***CALENDAR*****/
export class Schedule extends Component{
    constructor(){
        super()
        this.state={appts: {}}
    }
    
    updateAppt = (info) =>{
        let apptid = info.event.id
        let start = info.event.start.toISOString()
        let end = info.event.end.toISOString()
        
        fetch(`http://localhost:5000/appts/${apptid}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                start: start,
                end: end,
            })
          })
    }
      
        render(){
    return (
        <React.Fragment>
      <FullCalendar defaultView="timeGridWeek" header = {{
        left:   'prev,next',
        center: 'title',
        right:  'timeGridWeek, timeGridDay'
      }} 
      plugins={[ timeGridPlugin, interactionPlugin ]}
      selectable={true}
      selectMirror={true}
      selectOverlap={false}
      style={classes.calendar}
      editable={true}
      eventDrop={(info)=>this.updateAppt(info)}
    //   select={(info)=>addDate(info)}
      events={{url: 'http://localhost:5000/appts'}}
       />
       
         </React.Fragment>
    )
    }

}
/**SIDE NOTES***/
export const Notes = () =>{
    return(
        <div className="schedule-options">
            <h3>Notes</h3>
            

        </div>
    )
}
