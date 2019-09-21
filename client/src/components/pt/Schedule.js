import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid';
import Paper from '@material-ui/core/Paper'
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
// import dayGridPlugin from '@fullcalendar/daygrid'; // for dayGridMonth view
import '../../main.scss'

const useStyles = {
    calendar:{
        height: "80vh"
    }
}
const classes = useStyles
let appts = [{
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
        }]

//***CALENDAR*****/
export const Schedule = () => {
    const [selectedDate, setSelectedDate] = React.useState(appts)

    const addDate = (info) =>{
        setSelectedDate(selectedDate.concat({id: 'c', title:'clientname',start: info.startStr, end: info.endStr}))
        console.log(selectedDate)
    }
    

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
      select={(info)=>addDate(info)}
      events={selectedDate}
       />
       
         </React.Fragment>
    )

}
/**SIDE NOTES***/
export const Notes = () =>{
    return(
        <div className="schedule-options">
            <h3>Notes</h3>
            

        </div>
    )
}
